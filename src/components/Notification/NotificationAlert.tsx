import { useEffect } from 'react';
import Image from 'next/image';
import { alertType } from '@enums/notification.enum';
import closeIconDanger from '@assets/icons/ic-16-nav-close-danger.svg';
import closeIconSuccess from '@assets/icons/ic-16-nav-close-success.svg';

type TNotificationAlert = {
  type: alertType;
  message: string;
  timeout?: number; // milliseconds
  onClose(): void;
  onTimeOut(): void;
};

const NotificationAlert = (props: TNotificationAlert) => {
  const generateClasses = (): string => {
    const classList = ['notification-alert'];

    const colorClass: { [key in alertType]: string } = {
      [alertType.ERROR]: 'notification-alert--error',
      [alertType.SUCCESS]: 'notification-alert--success',
    };

    if (colorClass[props.type]) classList.push(colorClass[props.type]);

    return classList.join(' ');
  };

  const generateCloseIcon = () => {
    const alertIcon = {
      [alertType.ERROR]: closeIconDanger,
      [alertType.SUCCESS]: closeIconSuccess,
    };

    return alertIcon[props.type] ?? closeIconDanger;
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(
      () => props.onTimeOut(),
      props.timeout || 2000, // 2000 milliseconds or 2 seconds
    );

    return () => clearTimeout(notificationTimeout);
  }, []);

  return (
    <div className={generateClasses()}>
      <div className="tw-flex-1">
        <p>{props.message}</p>
      </div>
      <div>
        <Image
          src={generateCloseIcon()}
          className="tw-cursor-pointer tw-h-4"
          onClick={props.onClose}
          alt={`alert-${props.type}`}
          height={16}
          width={16}
        />
      </div>
    </div>
  );
};

export default NotificationAlert;
