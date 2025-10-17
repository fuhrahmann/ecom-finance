import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Product } from '@/types';
import { sampleProducts } from '@/data/sampleData';

// Helper function to get products from session
async function getProductsFromSession(): Promise<Product[]> {
  const cookieStore = await cookies();
  const productsData = cookieStore.get('products');

  if (productsData) {
    try {
      return JSON.parse(productsData.value);
    } catch {
      return [...sampleProducts];
    }
  }

  return [...sampleProducts];
}

// Helper function to save products to session
async function saveProductsToSession(products: Product[]) {
  const cookieStore = await cookies();
  // Cookies have size limitations, so we'll use a simple approach
  // For production, consider using a proper database
  cookieStore.set('products', JSON.stringify(products), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// GET all products
export async function GET() {
  try {
    const products = await getProductsFromSession();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await getProductsFromSession();

    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      image: body.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      stock: parseInt(body.stock),
      rating: body.rating ? parseFloat(body.rating) : undefined,
    };

    products.push(newProduct);
    await saveProductsToSession(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
