import {
  Flex,
  VStack,
  Heading,
  Divider,
  useColorMode,
  Button,
  Spacer,
} from "@chakra-ui/react";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegMoon } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";

import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const user = useRecoilValue(userAtom);

  return (
    <>
      <Flex
        position={"sticky"}
        top={0}
        style={{ position: "sticky", top: "0" }}
        display={{ base: "none", md: "flex" }}
        flex={1}
        py={4}
        my={4}
        h={"100vh"}
      >
        <VStack
          flexDirection={"column"}
          alignItems={"start"}
          justifyContent={"center"}
          spacing={"2"}
          w={"full"}
        >
          <Flex w={"full"} alignItems={"center"} justifyContent={"start"}>
            <Heading
              textAlign={"start"}
              fontSize={"5xl"}
              fontWeight={"semibold"}
              mb={12}
            >
              T.A.T
            </Heading>
          </Flex>
          <MenuItem title={"feed"} to={"/"} icon={IoHomeOutline} />
          <MenuItem title={"Profile"} to={`/profile/${user.userName}`} icon={FaRegUser} />
          <MenuItem title={"Explore"} icon={MdOutlineExplore} />
          <MenuItem title={"Search"} icon={BsSearch} />
          <MenuItem title={"Message"} icon={AiOutlineMessage} />
          <LogoutButton />
          <Spacer />
          <Button background={"transparent"} my={2} onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <FaRegMoon fontSize={"24px"} />
            ) : (
              <GoSun fontSize={"24px"} />
            )}
          </Button>
        </VStack>
      </Flex>
      <Divider
        position={"sticky"}
        top={0}
        h={"100vh"}
        style={{ position: "sticky", top: "0" }}
        display={{ base: "none", md: "flex" }}
        orientation="vertical"
      />
    </>
  );
};

export default Sidebar;
