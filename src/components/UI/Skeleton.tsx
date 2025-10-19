type SkeletonProps = {
  className?: string;
  height?: string;
  width?: string;
};

const Skeleton = (props: SkeletonProps) => {
  const generateClassNames = () => {
    const classes = ['core-skeleton'];

    if (props.className) classes.push(props.className);

    return classes.join(' ');
  };

  return (
    <div
      style={{
        height: props.height || '10px',
        width: props.width || '100%',
      }}
      className={generateClassNames()}
    />
  );
};

export default Skeleton;
