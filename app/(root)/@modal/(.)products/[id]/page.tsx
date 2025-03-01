import { Modal } from "@/shared/components/modals";
import { ProductPage } from "@/shared/components/product-page";

export default async function Products({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <Modal>
      <ProductPage productId={id} />
    </Modal>
  );
}
