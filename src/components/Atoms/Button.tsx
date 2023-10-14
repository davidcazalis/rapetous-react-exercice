import { MdiReactIconComponentType } from 'mdi-react';
import React, { FC } from 'react';

export type ButtonProps = {
  icon?: MdiReactIconComponentType;
  label: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ icon, onClick, label }) => {
  return (
    <div>
      <button
        className="text-[16px] border-[1px] border-gray-400 hover:border-gray-600 rounded px-2 transform active:scale-75 transition-transform flex flex-row"
        onClick={onClick}>
        {label}
        {icon && React.createElement(icon, { size: 18, className: 'm-auto ml-2' })}
      </button>
    </div>
  );
};

export default Button;
