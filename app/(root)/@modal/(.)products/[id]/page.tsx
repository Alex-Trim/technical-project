import { Modal } from "@/shared/components/modals";
import { ProductPage } from "@/shared/components/product-page";
interface ProductsPageProps {
  params: {
    id: string;
  };
}

export default function Products({ params }: ProductsPageProps) {
  const { id } = params;

  return (
    <Modal>
      <ProductPage productId={id} />
    </Modal>
  );
}
