import type { ReactNode } from 'react';
import classNames from 'classnames';

type SectionProps = {
  children: ReactNode;
  variant?: 'primary' | 'gray';
  className?: string;
  id?: string;
};

const Section = ({
  children,
  variant = 'primary',
  className,
  id,
}: SectionProps) => {
  const sectionClasses = classNames(
    'main__section',
    {
      'main__section--primary': variant === 'primary',
      'main__section--gray': variant === 'gray',
    },
    className,
  );

  return (
    <section id={id} className={sectionClasses}>
      <div className="main__container">{children}</div>
    </section>
  );
};

export default Section;
