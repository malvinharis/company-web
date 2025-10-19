import type { ReactNode } from 'react';
import classNames from 'classnames';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={classNames('main__container', className)}>{children}</div>
  );
};

export default Container;
