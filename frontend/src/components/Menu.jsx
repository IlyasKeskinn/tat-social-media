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
import { ExploreSVG, HomeSVG, MessageSVG, SearchSVG } from "./IconSvg";
import SearchDrawer from "./SearchDrawer";

import PropTypes from "prop-types";

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
        h="100vh"
      >
        <VStack
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          spacing={2}
          w="full"
          py={4}
          my={4}
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
          <MenuItem title="Message" to={"/message"} icon={AiOutlineMessage} />
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
        <MobileMenuItem to="/">
          <HomeSVG isActive={getActiveStatus("/")} />
        </MobileMenuItem>
        <MobileMenuItem to="/explore">
          <ExploreSVG
            width="30px"
            height="30px"
            isActive={getActiveStatus("/explore")}
          />
        </MobileMenuItem>
        <MobileMenuItem to={`/profile/${user.userName}`}>
          <ProfileAvatar
            user={user}
            isActive={getActiveStatus(`/profile/${user.userName}`)}
          />
        </MobileMenuItem>
        <MobileMenuItem to="/message">
          <MessageSVG isActive={getActiveStatus("/message")} />
        </MobileMenuItem>
        <MobileMenuItem callbackFunction={handleSearch}>
          <SearchSVG isActive={getActiveStatus("/search")} />
        </MobileMenuItem>
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

ProfileAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};
