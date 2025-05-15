import { useAppContext } from '@/hooks/useAppContext';
import { useTokensContext } from '@/hooks/useTokensContext';
import type { FC } from 'react';

export const Header: FC = () => {
  const { user } = useAppContext();
  const { total } = useTokensContext();

  return (
    <header className='flex items-center justify-between w-full h-[135px] bg-cwgray-1 p-12 text-white'>
      <h1 className='font-jersey text-7xl'>
        CryptoWatcher
      </h1>

      {user && (
        <div>
          My wallet USD value: ${total?.toFixed(2)}
        </div>
      )}
    </header>
  );
};
