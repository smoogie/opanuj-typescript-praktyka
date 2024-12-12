interface Message {
  type: MessageType;
}

type MessageType = 'orderCreated' | 'orderCancelled';

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage{
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}


export class MessageBus {
  private subscribers: { type: string; subscriber: (message: any) => void }[] = [];

  subscribe<T extends Message>(type: string, subscriber: (message: T) => void): void {
    this.subscribers.push({ type, subscriber });
  }

  publish<T extends Message>(message: T): void {
    for (const subscriber of this.subscribers) {
      if (subscriber.type === message.type) {
        subscriber.subscriber(message);
      }
    }
  }
}

export class InventoryStockTracker<T> {
  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
    private orders: Record<string, Order> = { },
  ) {
    console.log('Stock:', stock);
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', this.handleOrderCreated.bind(this));
    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', this.handleOrderCancelled.bind(this));
  }

  handleOrderCreated(message: OrderCreatedMessage): void {
    this.addOrder(message.payload);
    for (const item of message.payload.items) {
      if (this.stock[item.productId] !== undefined) {
        this.stock[item.productId] -= item.quantity;
      }
    }
    console.log(this.stock);
  }

  handleOrderCancelled(message: OrderCancelledMessage): void {
    const order = this.findOrder(message.payload.orderId);
    if (!order) {
      return;
    }
    for (const item of order.items) {
      if (this.stock[item.productId] !== undefined) {
        this.stock[item.productId] += item.quantity;
      }
    }
    console.log(this.stock);
    this.removeOrder(message.payload.orderId);
  }

  addOrder(order: Order): void {
    this.orders[order.orderId] = order;
  }

  removeOrder(orderId: string): void {
    const order = this.orders[orderId];
    if (!order) {
      return;
    }
    delete this.orders[orderId];
  }

  findOrder(orderId: string): Order | undefined {
    return this.orders[orderId];
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
