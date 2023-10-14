import { FC } from 'react';
import Button, { ButtonProps } from './Button';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  link: string;
} & Omit<ButtonProps, 'onClick'>;

const LinkButton: FC<LinkButtonProps> = ({ link, ...props }) => {
  return (
    <Link to={link}>
      <Button
        {...props}
        onClick={() => false}
      />
    </Link>
  );
};

export default LinkButton;
