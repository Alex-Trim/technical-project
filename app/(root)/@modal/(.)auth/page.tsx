"use client";
import { AuthForm } from "@/shared/components/auth-form";
import { Modal } from "@/shared/components/modals";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  const onCloses = () => {
    router.back();
  };
  return (
    <Modal>
      <AuthForm onCloses={onCloses} />
    </Modal>
  );
}
