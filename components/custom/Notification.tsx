import { useEffect } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{zIndex:1000}} className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow">
      {message}
    </div>
  );
};

export default Notification;