import { useState, type ChangeEvent, type FC } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/FormField';
import type { LoginData } from '@/types/LoginData';
import { signIn } from '@/api/api';
import { AxiosError } from 'axios';
import { useAppContext } from '@/hooks/useAppContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm: FC = () => {
  const navigate = useNavigate();

  const { setUser } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });

  const handleChange = ({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { username, password } = loginData;

    if (!username || !password) {
      return setError('Username and password are required!');
    };

    try {
      setLoading(true);

      const { data: { user } } = await signIn({ username, password });

      if (user) {
        setUser(user);
        navigate('/pick-favourties');
      }

    } catch (error) {
      console.log('Error: ', error);

      if (error instanceof AxiosError) {
        switch (error.status) {
          case 404:
            setError('User doesn\'t exist');
            break;

          case 401:
            setError('Invalid credentials');
            break;

          case 400:
            setError('Invalid request');
            break;
        
          default:
            setError('Unknown requesting error')
            break;
        }
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
      setLoginData({ username: '', password: '' });
    }
  };

  return (
    <div className='w-86'>
      <Card>
        <CardHeader>
          <CardTitle>
            Sign In
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className='flex flex-col gap-4'>
            <FormField
              name='username'
              label='Username'
              type='text'
              placeholder='Username'
              value={loginData.username}
              onChange={handleChange}
            />
            <FormField
              name='password'
              label='Password'
              type='password'
              placeholder='Password'
              value={loginData.password}
              onChange={handleChange}
            />
          </form>

          {error && (
            <p className='text-md text-center text-red-600 pt-4'>{error}</p>
          )}
        </CardContent>

        <CardFooter>
          <Button variant='primary' onClick={handleSubmit}>
            {loading ? 'Loading..' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};