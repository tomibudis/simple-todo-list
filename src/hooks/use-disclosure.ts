import { useState } from "react";

function useDisclosure(defaultIsOpen?: boolean) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((val) => !val);

  return { isOpen, onOpen, onClose, onToggle };
}

export default useDisclosure;
