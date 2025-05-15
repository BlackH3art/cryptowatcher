import type { FC } from 'react';

interface RouteTitleProps {
  title: string;
};

export const RouteTitle: FC<RouteTitleProps> = ({ title }) => {
  return (
    <h2 className='w-full text-7xl font-bold text-white text-center p-5'>
      {title}
    </h2>
  );
};
