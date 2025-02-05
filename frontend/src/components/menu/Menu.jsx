import { Flex, VStack, Heading, Divider, useColorMode, Button, Spacer, Avatar, useDisclosure, } from "@chakra-ui/react";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser, FaRegMoon } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { TbMapSearch } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { GoSun } from "react-icons/go";
import PropTypes from "prop-types";

import { ExploreSVG, HomeSVG, MessageSVG, SearchSVG } from "../shared/IconSvg";
import notificationAtom from "../../atoms/notificationAtom";
import SearchDrawer from "../shared/SearchDrawer";
import LogoutButton from "../auth/LogoutButton";
import MobileMenuItem from "./MobileMenuItem";
import userAtom from "../../atoms/userAtom";
import MenuItem from "./MenuItem";


const Menu = () => {
  const { t } = useTranslation();
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  const unreadNotifications = useRecoilValue(notificationAtom);

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
          alignItems="start"
          justifyContent="center"
          spacing={2}
          w="full"
          py={2}
          my={2}
        >
          <Flex w="full" alignItems="center" justifyContent="start">
            <Heading
              textAlign="start"
              fontSize="5xl"
              fontWeight="semibold"
              mb={12}
              cursor={"pointer"}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              T.A.T
            </Heading>
          </Flex>
          <MenuItem title={t("menu.feed")} to="/" icon={IoHomeOutline} />
          <MenuItem
            title={t("menu.profile")}
            to={`/profile/${user.userName}`}
            icon={FaRegUser}
          />
          <MenuItem title={t("menu.message")} to={"/message"} icon={AiOutlineMessage} notificationCount={2} />
          <MenuItem title={t("menu.explore")} icon={TbMapSearch} />
          <MenuItem
            callbackFunction={handleSearch}
            title={t("menu.search")}
            icon={BsSearch}
          />
          <MenuItem
            title={t("menu.notifications")}
            icon={IoMdNotificationsOutline}
            to={"/notifications"}
            notificationCount={unreadNotifications}
          />
          <MenuItem 
            title={t("menu.settings")} 
            icon={IoSettingsOutline}
            to="/settings" 
          />
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
        borderColor={colorMode === "dark" ? "gray.700" : "gray.300"}
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
        <MobileMenuItem to="/message" notificationCount={2}>
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
