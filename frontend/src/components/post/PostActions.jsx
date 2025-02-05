import { MdOutlineReportOff } from "react-icons/md";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { BsBookmarkStar } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { MenuItem } from "@chakra-ui/react";
import { MdBlock } from "react-icons/md";
import PropTypes from "prop-types";

import useCopyPost from "../../hooks/useCopyPost";


const PostActions = ({ postId, postedBy }) => {
  const { t } = useTranslation();
  const copyPost = useCopyPost();

  return (
    <>
      <MenuItem fontSize={"lg"}>
        <BsBookmarkStar style={{ marginRight: "8px" }} />
        {t("postActions.saveBookmarks")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          copyPost(postId);
        }}
        fontSize={"lg"}
      >
        <CiMedicalClipboard style={{ marginRight: "8px" }} />
        {t("postActions.copyPostUrl")}
      </MenuItem>

      <MenuItem fontSize={"lg"}>
        <MdBlock style={{ marginRight: "8px" }} />
        {t("postActions.blockUser", { userName: postedBy.userName })}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <MdOutlineReport style={{ marginRight: "8px" }} />
        {t("postActions.reportUser", { userName: postedBy.userName })}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <MdOutlineReportOff style={{ marginRight: "8px" }} />
        {t("postActions.reportPost")}
      </MenuItem>
    </>
  );
};

PostActions.propTypes = {
  postId: PropTypes.string.isRequired,
  postedBy: PropTypes.object.isRequired,
};

export default PostActions;
