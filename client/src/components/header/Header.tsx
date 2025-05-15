import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className='flex items-center justify-between w-full h-[135px] bg-cwgray-1 p-12 text-white'>
      <h1 className='font-jersey text-7xl'>
        CryptoWatcher
      </h1>

      <div className=''>
        My wallet USD value: $93,200.00
      </div>
    </header>
  );
};
