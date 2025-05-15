import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { SideNav } from '@/components/sideNav/SideNav';
import { useAppContext } from '@/hooks/useAppContext';

export const AppLayout: FC = () => {
  const { user } = useAppContext();

  return (
    <main className='flex w-full h-full'>
      {user && <SideNav />}

      <section className='flex flex-col w-full gap-5'>
        <Outlet />
      </section>
    </main>
  );
};