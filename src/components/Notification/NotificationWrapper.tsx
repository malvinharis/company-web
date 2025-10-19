import React from 'react';

import { alertType } from '@enums/notification.enum';

import useNotificationStore from '@store/useNotificationStore';

import NotificationAlert from './NotificationAlert';

const NotificationWrapper = () => {
  const alerts = useNotificationStore((state) => state.alerts);
  const removeAlert = useNotificationStore((state) => state.removeAlert);
  const handleRemoveAlertByIndex = (index: number) => () => removeAlert(index);

  return (
    <>
      {alerts.length > 0 && (
        <div className="notification-alert-container">
          {alerts.map((alert) => (
            <NotificationAlert
              key={`notification-alert-${alert.id}`}
              message={alert.message}
              type={alert.type || alertType.ERROR}
              onClose={handleRemoveAlertByIndex(alert.id)}
              onTimeOut={handleRemoveAlertByIndex(alert.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationWrapper;
