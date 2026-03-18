const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
  id: number;
  telegramId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdAt: string;
}

export interface Order {
  id: number;
  items: Array<{
    name: string;
    volume: string;
    type: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  deliveryPrice: number;
  address: string | null;
  status: 'new' | 'processing' | 'delivered';
  createdAt: string;
}

export interface Address {
  id: string;
  address: string;
  isDefault?: boolean;
}

class ApiService {
  private baseUrl = API_URL;

  async getUser(telegramId: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/user?telegramId=${telegramId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }

  async getUserOrders(telegramId: number): Promise<Order[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/orders?telegramId=${telegramId}`);
      if (!response.ok) return [];
      const data = await response.json();
      // Handle both { data: [...] } and direct array responses
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  }

  async addAddress(telegramId: number, address: string): Promise<Address | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId, address }),
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to add address:', error);
      return null;
    }
  }

  async deleteAddress(telegramId: number, addressId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/address/${addressId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId }),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to delete address:', error);
      return false;
    }
  }

  async createOrder(orderData: {
    telegramId: number;
    items: Array<{
      name: string;
      volume: string;
      type: string;
      price: number;
      quantity: number;
    }>;
    address?: string;
    deliveryType: 'free' | 'paid';
  }): Promise<{ id: number; success: boolean } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to create order' }));
        throw new Error(error.message || 'Failed to create order');
      }

      const order = await response.json();
      return {
        id: order.id,
        success: true,
      };
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
