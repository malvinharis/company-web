type LoadingSpinnerProps = {
  message?: string;
};

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-py-12">
      <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-primary"></div>
      <p className="tw-text-secondary tw-mt-4">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
