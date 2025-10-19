import { useEffect } from 'react';

import { alertType } from '@enums/notification.enum';

import IconCloseDanger from '@/assets/icons/ic-16-close-danger.svg';
import IconCloseSuccess from '@/assets/icons/ic-16-close-success.svg';

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

  const generateCloseIcon = (): string => {
    const alertIcon: { [key in alertType]: any } = {
      [alertType.ERROR]: IconCloseDanger,
      [alertType.SUCCESS]: IconCloseSuccess,
    };

    return alertIcon[props.type] ?? '';
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(
      () => props.onTimeOut(),
      props.timeout || 2000, // 2000 miliseconds or 2 seconds
    );

    return () => clearTimeout(notificationTimeout);
  }, []);

  return (
    <div className={generateClasses()}>
      <div className="flex-1">
        <p>{props.message}</p>
      </div>
      <div>
        <img
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
