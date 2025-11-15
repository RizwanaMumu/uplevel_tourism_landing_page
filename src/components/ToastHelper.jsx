import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

export const toast = ({ title, description }) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const ToastWrapper = () => {
    const [open, setOpen] = useState(true);

    return (
      <Toast
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            root.unmount();
            container.remove();
          }
        }}
      >
        <ToastTitle>{title}</ToastTitle>
        {description && <ToastDescription>{description}</ToastDescription>}
        <ToastClose />
      </Toast>
    );
  };

  const root = createRoot(container);
  root.render(<ToastWrapper />);
};
