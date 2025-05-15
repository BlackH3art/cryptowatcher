import { type FC } from 'react';

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

import type { Token } from '@/types/Token';
import { updateTokenFavourite } from '@/api/api';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useTokensContext } from '@/hooks/useTokensContext';

interface FavouriteCardProps {
  token: Token;
};

export const FavouriteCard: FC<FavouriteCardProps> = ({ token }) => {
  const { id, name, ticker, price, logo, priceUpdatedAt, favourite } = token;

  const { refetchTokens, refetchTotal } = useTokensContext();

  const handleSetFavourite = async () => {
    try {
      await updateTokenFavourite(id);
      await refetchTokens();
      await refetchTotal();
    } catch (error) {
      console.log(error);
    }
  };

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
              {`Last check: ${new Date(priceUpdatedAt).toLocaleString()}`}
            </p>
          </CardDescription>
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
