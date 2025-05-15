import type { FC } from 'react'
import { Header } from './components/header/Header';
import { Login } from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { PickFavourties } from './components/pickFavourties/PickFavourties';
import { MyCryptocurrencies } from './components/myCryptocurrencies/MyCryptocurrencies';
import { AppLayout } from './layouts/AppLayout';

export const App: FC = () => {
  return (
    <div role='app' className='flex flex-col w-full bg-cwgray-2'>
      <Header />

      <Routes>
        <Route element={<AppLayout />}> 
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/pick-favourties" element={<PickFavourties />} />
            <Route path="/my-cryptocurrencies" element={<MyCryptocurrencies />} />
          </Route>

          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
}
