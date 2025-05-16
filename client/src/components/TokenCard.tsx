import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/FormField';
import { FormSelect } from '@/components/FormSelect';

import type { Token } from '@/types/Token';
import type { TokenData } from '@/types/TokenData';
import type { SelectOptions } from '@/types/SelectOptions';
import { updateTokenData, updateTokenFavourite } from '@/api/api';
import { useTokensContext } from '@/hooks/useTokensContext';

interface TokenCardProps {
  token: Token;
  portfolioMode?: boolean;
};

export const TokenCard: FC<TokenCardProps> = ({ token, portfolioMode }) => {
  const { id, name, ticker, price, logo, amount, favourite, description, priceUpdatedAt } = token;

  const [loading, setLoading] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    amount: 0,
    unit: name,
    description: '',
  });
    
  const { refetchTokens, refetchTotal } = useTokensContext();

  const options: SelectOptions = {
    BTC: [
      { unit: 'Bitcoin', value: 1 },
      { unit: 'Satoshi', value: 1e8 },
    ],
    DOT: [
      { unit: 'Polkadot', value: 1 },
      { unit: 'Planck', value: 1e10 },
    ],
    ETH: [
      { unit: 'Ethereum', value: 1 },
      { unit: 'Wei', value: 1e18 },
    ],
    SOL: [
      { unit: 'Solana', value: 1 },
      { unit: 'Lamport', value: 1e9 },
    ],
    POL: [
      { unit: 'Polygon', value: 1 },
      { unit: 'Wei', value: 1e18 },
    ],
  };

  const handleSetFavourite = async () => {
    try {
      await updateTokenFavourite(id);
      await refetchTokens();
      await refetchTotal();
    } catch (error) {
      console.log(error);
    }
  };

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

    const { amount, description, unit } = tokenData;

    try {
      await updateTokenData({
        id,
        amount: Number(amount) / Number(unit),
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

        <CardContent className='flex flex-col items-center gap-4'>
          <CardDescription className='text-center'>
            <p>{`Current price: $${price?.toFixed(2)}`}</p>
            {portfolioMode ? (
              <p>{`Value in USD: $${(amount * price).toFixed(2)}`}</p>
            ) : (
              <p>{`Last check: ${new Date(priceUpdatedAt).toLocaleString()}`}</p>
            )}
          </CardDescription>

          {portfolioMode && (
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
                options={options[ticker]}
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
          )}
        </CardContent>

        <CardFooter>
          <button
            className='p-2 cursor-pointer hover:bg-cwgray-2/90 rounded-md'
            onClick={handleSetFavourite}
          >
            {favourite ? ( <FaHeart color='red' size={32} />):( <FaRegHeart color='red' size={32} />)}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};
