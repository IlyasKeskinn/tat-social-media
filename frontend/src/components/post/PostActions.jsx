import { MenuItem } from "@chakra-ui/react";

import { BsBookmarkStar } from "react-icons/bs";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdBlock } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import { MdOutlineReportOff } from "react-icons/md";

import useCopyPost from "../../hooks/useCopyPost";
import PropTypes from "prop-types";

const PostActions = ({ postId, postedBy }) => {
  const copyPost = useCopyPost();

  return (
    <>
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
        Copy post url.
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

PostActions.propTypes = {
  postId: PropTypes.string.isRequired,
  postedBy: PropTypes.object.isRequired,
};

export default PostActions;
