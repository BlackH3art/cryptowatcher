import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import type { Token } from '@/types/Token';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { FaHeart } from "react-icons/fa";
import { useTokensContext } from '@/hooks/useTokensContext';
import { FormField } from '../FormField';
import type { TokenData } from '@/types/TokenData';
import { Button } from '../ui/button';
import { FormSelect } from '../FormSelect';
import { updateTokenData } from '@/api/api';

interface MyCryptocurrencyCardProps {
  token: Token;
};

export const MyCryptocurrencyCard: FC<MyCryptocurrencyCardProps> = ({ token }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { id, name, ticker, price, logo, amount, description } = token;

  const [tokenData, setTokenData] = useState<TokenData>({
    amount: 0,
    unit: name,
    description: '',
  });

  const { refetchTokens, refetchTotal } = useTokensContext();

  const handleChange = ({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
    setTokenData({
      ...tokenData,
      [name]: value,
    });
  };

  const handleUnitSelect = (val: string) => {
    setTokenData({
      ...tokenData,
      unit: val,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, description } = tokenData;
    // TODO: handle unit

    try {
      await updateTokenData({
        id,
        amount: Number(amount),
        description,
      });
      await refetchTokens();
      await refetchTotal();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTokenData({
      amount: amount,
      unit: name,
      description: description,
    });
  }, [token]);

  return (
    <div className='w-lg'>
      <Card>
        <CardHeader className='flex flex-col items-center'>
          <Avatar className='size-[150px]'>
            <AvatarImage src={logo} />
            <AvatarFallback>{ticker}</AvatarFallback>
          </Avatar>
          <CardTitle className='font-bold'>
            {`${name} (${ticker})`}
          </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col items-center'>
          <CardDescription className='text-center'>
            <p>
              {`Current price: $${price?.toFixed(2)}`}
            </p>
            <p>
              {`Value in USD: $${(amount * price).toFixed(2)}`}
            </p>
          </CardDescription>

          <form className='flex flex-col gap-4 w-4/5' onSubmit={handleSubmit}>
            <FormField
              name='amount'
              label='Amount'
              type='number'
              placeholder='Amount'
              value={tokenData.amount}
              onChange={handleChange}
            />
            <FormSelect 
              label='Unit'
              onChange={handleUnitSelect}
              options={[name]}
            />
            <FormField
              name='description'
              label='Comment'
              type='text'
              placeholder='Comment'
              value={tokenData.description}
              onChange={handleChange}
            />

            <Button type='submit' className='self-end w-22' variant='primary'>
              {loading ? 'Loading..' : 'Submit'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='flex flex-col items-end gap-4'>
          <FaHeart color='red' size={32} />
        </CardFooter>
      </Card>
    </div>
  );
};
