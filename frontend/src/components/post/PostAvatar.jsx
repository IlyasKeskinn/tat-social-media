import {
  Flex,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

import ProfilePreviewPopover from "../users/ProfilePreviewPopover";
import { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const PostAvatar = ({ postedBy }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const navigateProfile = () => {
    navigate(`/profile/${postedBy.userName}`);
  };
  return (
    <Popover
      trigger="hover"
      onOpen={handlePopoverOpen}
      onClose={handlePopoverClose}
    >
      <PopoverTrigger>
        <Flex
          cursor={"pointer"}
          onClick={navigateProfile}
          gap={2}
          alignItems={"center"}
        >
          <Avatar
            size={"md"}
            name={postedBy?.fullName}
            src={postedBy?.profilePic}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {isPopoverOpen && <ProfilePreviewPopover userId={postedBy._id} />}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

PostAvatar.propTypes = {
  postedBy: PropTypes.object.isRequired,
};

export default PostAvatar;
