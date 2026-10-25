import { NextRequest, NextResponse } from 'next/server';
import { generateOrderNumber, calculateShipping, calculateTax } from '@/lib/format';
import { CartItem, ShippingAddress, PaymentMethodType, Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      shippingAddress,
      paymentMethod,
    }: {
      items: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: PaymentMethodType;
    } = body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Your cart is empty. Please add items before checkout.' },
        { status: 400 }
      );
    }

    // Validate shipping fields
    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.email ||
      !shippingAddress.phone ||
      !shippingAddress.streetAddress ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required shipping and contact details.' },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping;

    const orderNumber = generateOrderNumber();
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const order: Order = {
      id: orderId,
      orderNumber,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Note: For real Stripe payments, you would create a Stripe PaymentIntent here
    // const paymentIntent = await stripe.paymentIntents.create({ amount: total * 100, currency: 'inr' });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error('API Error in /api/checkout:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
