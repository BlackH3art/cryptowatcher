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

  const { refetchTokens } = useTokensContext();

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

  const handleSubmit = async () => {
    const { amount, description } = tokenData;
    // TODO: handle unit

    try {
      await updateTokenData({
        id,
        amount: Number(amount),
        description,
      });
      await  refetchTokens();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTokenData({
        amount: 0,
        unit: name,
        description: '',
      });
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

        <CardContent>
          <CardDescription className='text-center'>
            <p>
              {`Current price: $${price?.toFixed(2)}`}
            </p>
            <p>
              {`Value in USD: $${(amount * price).toFixed(2)}`}
            </p>
          </CardDescription>

          <form className='flex flex-col gap-4'>
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
          </form>
        </CardContent>

        <CardFooter>
          <Button variant='primary' onClick={handleSubmit}>
            {loading ? 'Loading..' : 'Submit'}
          </Button>
          <FaHeart color='red' size={32} />
        </CardFooter>
      </Card>
    </div>
  );
};
