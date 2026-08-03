import { Metadata } from 'next';
import ProductsPageClient from "@/components/layout/ProductsPageClient";

export const metadata: Metadata = {
  title: "Products | AZARO",
  description: "Explore the premium AZARO seating catalogue.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
