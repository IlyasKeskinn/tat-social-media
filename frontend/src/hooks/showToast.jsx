import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
const showToast = () => {
  const toast = useToast();
  const toastCall = useCallback(
    ( title, desc, status, duration = 2000) => {
      toast({
        title: title,
        description: desc,
        status: status,
        duration: duration,
        isClosable: true,
      });
    },
    [toast]
  );

  return toastCall;
};

export default showToast;
