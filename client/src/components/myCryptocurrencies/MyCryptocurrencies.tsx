import { useState, type FC } from 'react';
import { RouteTitle } from '../RouteTitle';
import { useTokensContext } from '@/hooks/useTokensContext';
import { FavouriteNavButton } from '../pickFavourties/FavouriteNavButton';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { MyCryptocurrencyCard } from './MyCryptocurrencyCard';

export const MyCryptocurrencies: FC = () => {
  const { tokens } = useTokensContext();
  const myCryptocurrencies = tokens.filter(t => t.favourite);
  console.log('myCryptocurrencies ----> ', myCryptocurrencies.map(t => t.name));
  
  const [active, setActive] = useState<number>(0);

  const handleGoBack = () => {
    setActive(prev => prev - 1);
  };

  const handleGoForward = () => {
    setActive(prev => prev + 1);
  };

  return (
    <>
      <RouteTitle title='My cryptocurrencies' />

      {myCryptocurrencies.length && (
        <div className='relative flex justify-center items-center w-full overflow-hidden'>
          {myCryptocurrencies[active - 1] && (
            <div className='absolute z-2 -translate-x-1/2 scale-80 left-0'>
              <div className='absolute w-full h-full z-3 bg-white/20 rounded-lg'/>
              <MyCryptocurrencyCard 
                token={myCryptocurrencies[active - 1]}
              />
            </div>
          )}

          {myCryptocurrencies[active] && (
            <div className='z-4'>
              <MyCryptocurrencyCard 
                token={myCryptocurrencies[active]}
              />
            </div>
          )}

          {myCryptocurrencies[active + 1] && (
            <div className='absolute z-2 translate-x-1/2 scale-80 right-0'>
              <div className='absolute w-full h-full z-3 bg-white/20 rounded-lg'/>
              <MyCryptocurrencyCard 
                token={myCryptocurrencies[active + 1]}
              />
            </div>
          )}
        </div>
      )}

      <div className='text-white flex justify-center'>
        <FavouriteNavButton
          icon={<MdArrowBack size={64} />}
          onClick={handleGoBack}
          disabled={!myCryptocurrencies[active - 1]}
        />
        <FavouriteNavButton
          icon={<MdArrowForward size={64} />}
          onClick={handleGoForward}
          disabled={!myCryptocurrencies[active + 1]}
        />
      </div>
    </>
  );
};
