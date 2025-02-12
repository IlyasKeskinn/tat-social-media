import { Flex, PopoverTrigger, Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, Portal, Button, Box, Text, ButtonGroup, useDisclosure, } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { API_AUTH_ROUTES } from "../../constants/API_ROUTES";
import useShowToast from "../../hooks/showToast";
import userAtom from "../../atoms/userAtom";


const LogoutButton = () => {
  const { t } = useTranslation();
  const LOGOUT_URL = API_AUTH_ROUTES.LOGOUT;

  const userState = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isLoaading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(LOGOUT_URL, {
        method: "GET",
        "Content-type": "application/json",
      });

      const data = await response.json();

      userState(null);
      localStorage.removeItem("tatuser");

      showToast("Success", data.message, "success");
      setError("");
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error]);

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box
          cursor={"pointer"}
          backgroundColor={"transparent"}
          _hover={{
            backgroundColor: "whiteAlpha.300",
            borderColor: "gray.400",
            shadow: "lg",
          }}
          transition={"all 500ms"}
          border={"1px solid"}
          borderColor={"transparent"}
          px={2}
          py={3}
          rounded={8}
          w={"full"}
          onClick={onOpen}
        >
          <Flex gap={4} alignItems={"center"} justifyContent={"start"} px={2}>
            <AiOutlineLogout fontSize={"24px"} />
            <Text fontSize={"md"} textTransform={"uppercase"}>
              {t("auth.logout")}
            </Text>
          </Flex>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>{t("auth.logout")}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Text>{t("auth.logoutConfirmationDesc")}</Text>
          </PopoverBody>
          <PopoverFooter>
            <ButtonGroup size="sm">
              <Button variant="outline" isDisabled={isLoaading} onClick={onClose}>
                {t("common.cancel")}
              </Button>
              <Button
                colorScheme="red"
                isLoading={isLoaading}
                onClick={() => {
                  handleClick();
                }}
              >
                {t("common.apply")}
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default LogoutButton;
