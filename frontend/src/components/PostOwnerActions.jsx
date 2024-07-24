import { MenuItem } from "@chakra-ui/react";
import React from "react";

import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { CiMedicalClipboard } from "react-icons/ci";

import useCopyPost from "../hooks/useCopyPost";

const PostOwnerActions = ({postId}) => {
  const copyPost = useCopyPost();

  return (
    <>
      <MenuItem color={"red.500"} fontSize={"lg"}>
        <MdDeleteOutline style={{ marginRight: "8px" }} />
        Delete
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <GoPencil style={{ marginRight: "8px" }} />
        Edit
      </MenuItem>
      <MenuItem
        fontSize={"lg"}
        onClick={() => {
          copyPost(postId);
        }}
      >
        <CiMedicalClipboard style={{ marginRight: "8px" }} />
        Send the post.
      </MenuItem>
    </>
  );
};

export default PostOwnerActions;
