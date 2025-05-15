import type { FC, ReactNode } from 'react';

interface FavouriteNavButtonProps {
  icon: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

export const FavouriteNavButton: FC<FavouriteNavButtonProps> = ({ disabled, icon, onClick }) => {
  return (
    <button 
      disabled={disabled}
      className='p-2 cursor-pointer hover:bg-cwgray-3 rounded-md disabled:text-white/30 disabled:cursor-default'
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
