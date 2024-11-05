import { getNotifications, readAllNotifications } from '@/services/api';
import { RootState } from '@/store';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Socket, io } from 'socket.io-client';

interface Notification {
  id: number;
  is_active: boolean;
  created_on: string;
  [key: string]: any; // For other properties that might be present
}

interface SocketContextProps {
  markAllRead: () => void;
  notifications: Notification[];
  getUnreadLength: () => number;
  groupByDay: () => Record<string, Notification[]>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.Auth);
  const [, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markAllRead = async () => {
    if (notifications.length === 0) return;
    await readAllNotifications().then(() => {
      setNotifications((st) =>
        st.map((notification) => ({ ...notification, is_active: false }))
      );
    });
  };

  const getUnreadLength = () => {
    return notifications.filter((notification) => !notification.is_active)
      .length;
  };

  const groupByDay = () => {
    const groupedByDay: Record<string, Notification[]> = {};
    notifications.forEach((obj) => {
      const createdAtDate = new Date(obj.created_on).toLocaleDateString();
      if (!groupedByDay[createdAtDate]) groupedByDay[createdAtDate] = [];
      groupedByDay[createdAtDate].push(obj);
    });
    return groupedByDay;
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      getNotifications().then((res) => {
        setNotifications(res);
      });
    })();
    const socket = io(process.env.SOCKET_URL as string);
    socket.on('disconnect', () => {});
    socket.once('connect', () => {
      socket.emit('notifications', {
        userId: +user.id,
      });
      socket.on('notifications', (data) => {
        setNotifications((st) => {
          const found = st.some((notification) => notification.id === data.id);
          if (found) return st;
          return [{ ...data, createdAt: new Date() }, ...st];
        });
      });
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ markAllRead, notifications, getUnreadLength, groupByDay }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
