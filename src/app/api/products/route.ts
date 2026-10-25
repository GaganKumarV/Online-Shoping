import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';
import { ProductFilterParams } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = (searchParams.get('sort') as ProductFilterParams['sort']) || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    const products = await getProducts({
      category,
      search,
      sort,
      minPrice,
      maxPrice,
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('API Error in /api/products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
