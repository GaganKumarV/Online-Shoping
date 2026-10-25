import { NextRequest, NextResponse } from 'next/server';
import { generateOrderNumber, calculateShipping, calculateTax } from '@/lib/format';
import { getProductBySlug } from '@/lib/db';
import { CartItem, ShippingAddress, PaymentMethodType, Order } from '@/types';

interface CheckoutBody {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PHONE_PATTERN = /^\+?[0-9\s-]{10,15}$/;
const PIN_PATTERN = /^[1-9][0-9]{5}$/;
const PAYMENT_METHODS: PaymentMethodType[] = ['card', 'upi', 'netbanking', 'cod'];

function badRequest(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const { shippingAddress, paymentMethod } = body ?? {};

    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return badRequest('Your cart is empty. Please add items before checkout.');
    }

    // Required shipping fields
    if (
      !shippingAddress ||
      !shippingAddress.fullName?.trim() ||
      !shippingAddress.email?.trim() ||
      !shippingAddress.phone?.trim() ||
      !shippingAddress.streetAddress?.trim() ||
      !shippingAddress.city?.trim() ||
      !shippingAddress.state?.trim() ||
      !shippingAddress.postalCode?.trim()
    ) {
      return badRequest('Please provide all required shipping and contact details.');
    }

    if (!EMAIL_PATTERN.test(shippingAddress.email.trim())) {
      return badRequest('Please provide a valid email address.');
    }
    if (!PHONE_PATTERN.test(shippingAddress.phone.trim())) {
      return badRequest('Please provide a valid mobile number.');
    }
    if (!PIN_PATTERN.test(shippingAddress.postalCode.trim())) {
      return badRequest('Please provide a valid 6-digit PIN code.');
    }
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return badRequest('Please choose a valid payment method.');
    }

    // Re-price and re-check stock against the live catalog instead of trusting the client.
    const resolvedItems: CartItem[] = [];

    for (const item of body.items) {
      const slug = item?.product?.slug;
      const quantity = Number(item?.quantity);

      if (!slug || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return badRequest('One of the items in your cart has an invalid quantity.');
      }

      const freshProduct = await getProductBySlug(slug);

      if (!freshProduct) {
        return badRequest(
          `"${item.product.name}" is no longer available. Please remove it from your cart.`,
          409
        );
      }

      if (freshProduct.stock < quantity) {
        return NextResponse.json(
          {
            success: false,
            message:
              freshProduct.stock === 0
                ? `"${freshProduct.name}" is now out of stock. Please remove it from your cart.`
                : `Only ${freshProduct.stock} of "${freshProduct.name}" remain. Please update your quantity.`,
          },
          { status: 409 }
        );
      }

      resolvedItems.push({ product: freshProduct, quantity });
    }

    const subtotal = resolvedItems.reduce(
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
      items: resolvedItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Mock payment authorization. For real Stripe payments, create a PaymentIntent here:
    // const paymentIntent = await stripe.paymentIntents.create({ amount: total * 100, currency: 'inr' });
    // and only confirm the order after the webhook reports success.

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error('API Error in /api/checkout:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process checkout. Please try again.' },
      { status: 500 }
    );
  }
}
