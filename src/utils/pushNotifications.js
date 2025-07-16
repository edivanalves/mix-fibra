// Push Notifications Manager
class PushNotificationManager {
  constructor() {
    this.registration = null;
    this.permission = typeof Notification !== 'undefined' ? Notification.permission : 'denied';
  }

  async init() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/mix-fibra/sw.js');
      console.log('Service Worker registered for push notifications');
      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  async requestPermission() {
    if (this.permission === 'granted') {
      return true;
    }

    if (this.permission === 'denied') {
      return false;
    }

    const permission = typeof Notification !== 'undefined' ? await Notification.requestPermission() : 'denied';
    this.permission = permission;
    return permission === 'granted';
  }

  async subscribe() {
    if (!this.registration) {
      await this.init();
    }

    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with actual key
      });

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  async sendSubscriptionToServer(subscription) {
    // Send to your backend
    try {
      await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          userId: localStorage.getItem('mixfibra-user-id'),
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Show local notification
  showNotification(title, options = {}) {
    if (!('Notification' in window) || this.permission !== 'granted') {
      return;
    }

    const defaultOptions = {
      icon: '/mix-fibra/imagens/logo-mix-fibra.png',
      badge: '/mix-fibra/imagens/logo-mix-fibra.png',
      vibrate: [200, 100, 200],
      tag: 'mix-fibra-notification',
      requireInteraction: false,
      ...options
    };

    if (this.registration) {
      this.registration.showNotification(title, defaultOptions);
    } else if (typeof Notification !== 'undefined') {
      new Notification(title, defaultOptions);
    }
  }

  // Predefined notifications
  showPromoNotification(promo) {
    this.showNotification('🎉 Nova Promoção Mix Fibra!', {
      body: `${promo.title} - ${promo.discount}% de desconto!`,
      data: { type: 'promo', promo },
      actions: [
        { action: 'view', title: 'Ver Oferta' },
        { action: 'dismiss', title: 'Dispensar' }
      ]
    });
  }

  showMaintenanceNotification(maintenance) {
    this.showNotification('🔧 Manutenção Programada', {
      body: `Manutenção em ${maintenance.city} das ${maintenance.startTime} às ${maintenance.endTime}`,
      data: { type: 'maintenance', maintenance },
      requireInteraction: true
    });
  }

  showPaymentReminder(dueDate) {
    this.showNotification('💳 Lembrete de Pagamento', {
      body: `Sua fatura vence em ${dueDate}. Pague agora e evite interrupções.`,
      data: { type: 'payment', dueDate },
      actions: [
        { action: 'pay', title: 'Pagar Agora' },
        { action: 'remind_later', title: 'Lembrar Depois' }
      ]
    });
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const pushNotifications = new PushNotificationManager();