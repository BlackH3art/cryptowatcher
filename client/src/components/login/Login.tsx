import type { FC } from 'react';
import { LoginForm } from './LoginForm';
import { useAppContext } from '@/hooks/useAppContext';

export const Login: FC = () => {
  const { user } = useAppContext();

  return (
    <section className='flex w-full items-center justify-center py-20'>
      {user ? `Logged in as ${user.username}` : <LoginForm />}
    </section>
  );
};
