import {
  Flex,
  VStack,
  Heading,
  Divider,
  useColorMode,
  Button,
  Spacer,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser, FaRegMoon } from "react-icons/fa";
import { TbMapSearch } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { GoSun } from "react-icons/go";

import MenuItem from "./MenuItem";
import MobileMenuItem from "./MobileMenuItem";
import LogoutButton from "./LogoutButton";

import userAtom from "../atoms/userAtom";

import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { ExploreSVG, HomeSVG, SearchSVG, MessageSVG } from "./IconSvg";
import { useRef } from "react";
import SearchDrawer from "./SearchDrawer";

const Menu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const user = useRecoilValue(userAtom);

  const getActiveStatus = (path) => location.pathname === path;
  const handleSearch = () => {
    onOpen();
  };

  return (
    <>
      <Flex
        position="sticky"
        top={0}
        display={{ base: "none", md: "flex" }}
        flex={1}
        py={4}
        my={4}
        h="100vh"
      >
        <VStack
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          spacing={2}
          w="full"
        >
          <Flex w="full" alignItems="center" justifyContent="start">
            <Heading
              textAlign="start"
              fontSize="5xl"
              fontWeight="semibold"
              mb={12}
            >
              T.A.T
            </Heading>
          </Flex>
          <MenuItem title="Feed" to="/" icon={IoHomeOutline} />
          <MenuItem
            title="Profile"
            to={`/profile/${user.userName}`}
            icon={FaRegUser}
          />
          <MenuItem title="Explore" icon={TbMapSearch} />
          <MenuItem
            callbackFunction={handleSearch}
            title="Search"
            icon={BsSearch}
          />
          <MenuItem title="Message" icon={AiOutlineMessage} />
          <LogoutButton />
          <Spacer />
          <Button background="transparent" my={2} onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <FaRegMoon fontSize="24px" />
            ) : (
              <GoSun fontSize="24px" />
            )}
          </Button>
        </VStack>
      </Flex>

      <Divider
        position="sticky"
        top={0}
        h="100vh"
        display={{ base: "none", md: "flex" }}
        orientation="vertical"
      />

      <Flex
        position="fixed"
        bottom={0}
        left={0}
        w="full"
        zIndex={100}
        justifyContent="center"
        alignItems="center"
        display={{ base: "flex", md: "none" }}
        borderTop="1px solid"
        borderColor={colorMode === "dark" ? "gray.700" : "gray.300"}
        p={3}
        gap={8}
        bg={colorMode === "light" ? "#e6edf2" : "#1A2334"}
      >
        <MobileMenuItem
          children={<HomeSVG isActive={getActiveStatus("/")} />}
          to="/"
        />
        <MobileMenuItem
          children={
            <ExploreSVG
              width="30px"
              height="30px"
              isActive={getActiveStatus("/explore")}
            />
          }
          to="/explore"
        />
        <MobileMenuItem
          children={
            <ProfileAvatar
              user={user}
              isActive={getActiveStatus(`/profile/${user.userName}`)}
            />
          }
          to={`/profile/${user.userName}`}
        />
        <MobileMenuItem
          children={<SearchSVG isActive={getActiveStatus("/search")} />}
          callbackFunction={handleSearch}
        />
        <MobileMenuItem
          children={<MessageSVG isActive={getActiveStatus("/message")} />}
          to="/message"
        />
      </Flex>
      <SearchDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default Menu;

export const ProfileAvatar = ({ user, isActive }) => (
  <Flex alignItems="center" justifyContent="center" w="48px" h="48px">
    <Avatar
      border={isActive ? "1px solid teal" : "none"}
      size="sm"
      src={user.profilePic}
    />
  </Flex>
);
