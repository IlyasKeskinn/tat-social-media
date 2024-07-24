import { MenuItem } from "@chakra-ui/react";

import { FiUserPlus } from "react-icons/fi";
import { BsBookmarkStar } from "react-icons/bs";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdBlock } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import { MdOutlineReportOff } from "react-icons/md";

import useCopyPost from "../hooks/useCopyPost";

const PostActions = ({ postId, postedBy }) => {
  const copyPost = useCopyPost();

  return (
    <>
      <MenuItem fontSize={"lg"}>
        <FiUserPlus style={{ marginRight: "8px" }} />
        Follow {postedBy.userName}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <BsBookmarkStar style={{ marginRight: "8px" }} />
        Save Bookmarks
      </MenuItem>
      <MenuItem
        onClick={() => {
          copyPost(postId);
        }}
        fontSize={"lg"}
      >
        <CiMedicalClipboard style={{ marginRight: "8px" }} />
        Send the post.
      </MenuItem>

      <MenuItem fontSize={"lg"}>
        <MdBlock style={{ marginRight: "8px" }} />
        Block {postedBy.userName}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <MdOutlineReport style={{ marginRight: "8px" }} />
        Report {postedBy.userName}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <MdOutlineReportOff style={{ marginRight: "8px" }} />
        Report this post!
      </MenuItem>
    </>
  );
};

export default PostActions;
