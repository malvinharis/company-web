import type { alertType } from '@enums/notification.enum';
import { create } from 'zustand';

type Alert = {
  id: number;
  message: string;
  type: alertType;
};

type NotificationState = {
  alerts: Alert[];
  addAlert: (data: Pick<Alert, 'message' | 'type'>) => void;
  removeAlert: (id: number) => void;
  clearAlerts: () => void;
};

let alertIdCounter = 0;

const useNotificationStore = create<NotificationState>((set) => ({
  alerts: [],
  addAlert: (data: Pick<Alert, 'message' | 'type'>) => {
    set((state) => ({
      alerts: [
        ...state.alerts,
        {
          id: ++alertIdCounter,
          message: data.message,
          type: data.type,
        },
      ],
    }));
  },
  removeAlert: (id: number) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
  clearAlerts: () => {
    set(() => ({
      alerts: [],
    }));
  },
}));

export default useNotificationStore;
