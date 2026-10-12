import React from 'react';
import { MessageSquare, Mail, PhoneCall, AlertTriangle } from 'lucide-react';

interface NotificationProps {
  type: 'whatsapp' | 'email' | 'phone';
  sender: string;
  time: string;
  title: string;
  body: string;
  badge?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  sender,
  time,
  title,
  body,
  badge,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'whatsapp':
        return (
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <MessageSquare size={14} />
          </div>
        );
      case 'email':
        return (
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: '#EA4335',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Mail size={14} />
          </div>
        );
      case 'phone':
        return (
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <PhoneCall size={14} />
          </div>
        );
      default:
        return <AlertTriangle size={16} color="#EF4444" />;
    }
  };

  const getAppName = () => {
    switch (type) {
      case 'whatsapp':
        return 'WhatsApp Business';
      case 'email':
        return 'Corporate Mail';
      case 'phone':
        return 'Phone / Priority Line';
      default:
        return 'System Alert';
    }
  };

  return (
    <div className="notification-card">
      <div className="notification-header">
        <div className="notification-app-info">
          {getIcon()}
          <span>{getAppName()}</span>
          {badge && <span className="notification-badge-tag">{badge}</span>}
        </div>
        <span className="notification-time">{time}</span>
      </div>
      <div className="notification-title">{sender}: {title}</div>
      <div className="notification-body">{body}</div>
    </div>
  );
};
