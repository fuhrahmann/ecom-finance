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
  cookieStore.set('products', JSON.stringify(products), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProductsFromSession();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await getProductsFromSession();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedProduct: Product = {
      id,
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      image: body.image || products[index].image,
      stock: parseInt(body.stock),
      rating: body.rating ? parseFloat(body.rating) : products[index].rating,
    };

    products[index] = updatedProduct;
    await saveProductsToSession(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProductsFromSession();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = products[index];
    products.splice(index, 1);
    await saveProductsToSession(products);

    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
