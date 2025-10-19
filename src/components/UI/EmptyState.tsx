type EmptyStateProps = {
  message?: string;
};

const EmptyState = ({ message = 'No data available' }: EmptyStateProps) => {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-py-12">
      <div className="tw-text-center">
        <p className="tw-text-secondary tw-text-lg">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
