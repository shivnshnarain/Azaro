import { Metadata } from 'next';
import { getAllProducts } from '@/lib/getAllProducts';
import ProductsPageClient from "@/components/layout/ProductsPageClient";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const products = getAllProducts();
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    return {
      title: "Product Not Found | AZARO",
    };
  }

  // Find the showcase image, handling potential variants
  const p = product as any;
  const imageUrl = p.imagePath || (p.colors && p.colors[0]?.imagePath) || "";

  return {
    title: `${product.title} | AZARO`,
    description: p.description || `Discover the ${product.title} by AZARO. Premium luxury seating with ergonomic design.`,
    openGraph: {
      title: `${product.title} | AZARO`,
      description: p.description || `Discover the ${product.title} by AZARO. Premium luxury seating with ergonomic design.`,
      url: `https://azaro-azure.vercel.app/products/${product.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.title} by AZARO`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | AZARO`,
      description: p.description || `Discover the ${product.title} by AZARO. Premium luxury seating with ergonomic design.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://azaro-azure.vercel.app/products/${product.id}`,
    },
  };
}

import SingleProductPageClient from "@/components/layout/SingleProductPageClient";

export default function ProductDeepLinkPage({ params }: { params: { productId: string } }) {
  const products = getAllProducts();
  const product = products.find((p) => p.id === params.productId);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return <SingleProductPageClient product={product} />;
}
