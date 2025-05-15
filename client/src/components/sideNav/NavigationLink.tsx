import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';


interface NavigationLinkProps {
  to: string;
  icon: ReactNode;
  title: string;
} 

export const NavigationLink: FC<NavigationLinkProps> = ({ icon, title, to }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) =>
        `flex items-center p-4 font-bold ${
          isActive 
            ? 'bg-gradient-to-r from-cwlightgray-1 to-cwlightgray-2' 
            : 'hover:bg-cwgray-3 text-white'}`
      }
    >
      {icon}
      <p className='ml-4'>{title}</p>
    </NavLink>
  );
};