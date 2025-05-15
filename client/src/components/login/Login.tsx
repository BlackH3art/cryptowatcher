import type { FC } from 'react';
import { LoginForm } from './LoginForm';
import { useAppContext } from '@/hooks/useAppContext';

export const Login: FC = () => {
  const { user } = useAppContext();

  return (
    <section className='flex flex-1 w-full items-center justify-center'>
      {user ? `Logged in as ${user.username}` : <LoginForm />}
    </section>
  );
};
