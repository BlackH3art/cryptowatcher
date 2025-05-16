import { useState, type FC } from 'react';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

import { RouteTitle } from '@/components/RouteTitle';
import { TokenCard } from '@/components/TokenCard';
import { FavouriteNavButton } from '@/components/pickFavourties/FavouriteNavButton';
import { useTokensContext } from '@/hooks/useTokensContext';

export const PickFavourties: FC = () => {
  const { tokens } = useTokensContext();

  const [active, setActive] = useState<number>(0);

  const handleGoBack = () => {
    setActive(prev => prev - 1);
  };

  const handleGoForward = () => {
    setActive(prev => prev + 1);
  };

  return (
    <>
      <RouteTitle title='Pick favourties' />

      {tokens.length && (
        <div className='relative flex justify-center items-center w-full overflow-hidden'>
          {tokens[active - 1] && (
            <div className='absolute z-2 -translate-x-1/2 scale-80 left-0'>
              <div className='absolute w-full h-full z-3 bg-white/20 rounded-lg'/>
              <TokenCard token={tokens[active - 1]}/>
            </div>
          )}

          {tokens[active] && (
            <div className='z-4'>
              <TokenCard token={tokens[active]} />
            </div>
          )}

          {tokens[active + 1] && (
            <div className='absolute z-2 translate-x-1/2 scale-80 right-0'>
              <div className='absolute w-full h-full z-3 bg-white/20 rounded-lg'/>
              <TokenCard token={tokens[active + 1]} />
            </div>
          )}
        </div>
      )}

      <div className='text-white flex justify-center'>
        <FavouriteNavButton
          icon={<MdArrowBack size={64} />}
          onClick={handleGoBack}
          disabled={!tokens[active - 1]}
        />
        <FavouriteNavButton
          icon={<MdArrowForward size={64} />}
          onClick={handleGoForward}
          disabled={!tokens[active + 1]}
        />
      </div>
    </>
  );
};
 