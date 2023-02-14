import React, { MouseEventHandler } from 'react';
import '@/components/common/button/button.css';

type Props = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
};

export default function Button({ className, onClick, children }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
