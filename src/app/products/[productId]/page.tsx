import { Metadata } from 'next';
import { getAllProducts } from '@/lib/getAllProducts';
import { slugify } from '@/lib/slugify';
import SingleProductPageClient from "@/components/layout/SingleProductPageClient";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    productId: slugify(product.title),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const products = getAllProducts();
  const product = products.find((p) => slugify(p.title) === resolvedParams.productId);

  if (!product) {
    return {
      title: "Product Not Found | AZARO",
    };
  }

  // Find the showcase image, handling potential variants
  const p = product as any;
  const imageUrl = p.imagePath || (p.colors && p.colors[0]?.imagePath) || "";
  const slug = slugify(product.title);

  return {
    title: `${product.title} | AZARO`,
    description: p.description || `Discover the ${product.title} by AZARO. Premium luxury seating with ergonomic design.`,
    openGraph: {
      title: `${product.title} | AZARO`,
      description: p.description || `Discover the ${product.title} by AZARO. Premium luxury seating with ergonomic design.`,
      url: `https://azaro-azure.vercel.app/products/${slug}`,
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
      canonical: `https://azaro-azure.vercel.app/products/${slug}`,
    },
  };
}

export default async function ProductDeepLinkPage({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = await params;
  const products = getAllProducts();
  const product = products.find((p) => slugify(p.title) === resolvedParams.productId);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return <SingleProductPageClient product={product} />;
}
