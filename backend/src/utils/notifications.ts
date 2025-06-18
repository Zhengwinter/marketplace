// src/utils/notifications.ts

export type NotificationType = 'success' | 'error' | 'info' | 'warning'| 'NEW_JOB';

export interface NotificationOptions {
  title?: string;
  message?: string;
  type?: NotificationType;
  jobId?: string;
  duration?: number; // in milliseconds
}

export function notify({
  title,
  message,
  type = 'info',
  duration = 3000,
}: NotificationOptions) {
  // This is a stub — replace with toast, alert, or custom UI as needed
  console.log(`[${type.toUpperCase()}] ${title}: ${message}`);

  // If using a browser-based notification system, you could integrate here
  if (typeof window !== 'undefined' && 'Notification' in window) {
    const safeTitle = title ?? "Notification";
    const safeMessage = message ?? "";
    if (Notification.permission === 'granted') {
      new Notification(safeTitle, { body: safeMessage });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(safeTitle, { body: safeMessage });
          }
      });
    }
  }

  // You can also hook into toast libraries here (e.g., react-hot-toast, notistack, etc.)
}

export async function sendNotificationToProvider(
  providerId: string,
  notification: NotificationOptions
): Promise<void> {
  // Example: Logging for now
  console.log(`Sending notification to provider ${providerId}:`, notification);

  // 🔧 TODO: replace this with actual implementation:
  // - WebSocket.emit
  // - Database insert
  // - Firebase push
  // - REST call to notification service
}
