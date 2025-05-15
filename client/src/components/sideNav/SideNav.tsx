import type { FC } from 'react';
import { NavigationLink } from './NavigationLink';

import { FaHeart, FaDollarSign } from 'react-icons/fa';

export const SideNav: FC = () => {
  return (
    <aside className='flex flex-col w-70 h-screen bg-gradient-to-r from-cwgray-1 to-cwgray-3 border border-cwgray-1'>
      <NavigationLink
        to='/pick-favourties'
        icon={<FaDollarSign size={16} />}
        title='Pick favourties'
      />
      <NavigationLink
        to='/my-cryptocurrencies'
        icon={<FaHeart size={16} />}
        title='My cryptocurrencies'
      />
    </aside>
  );
};