import { MdOutlineReport, MdDelete, MdEdit } from "react-icons/md";
import { MenuItem } from "@chakra-ui/react";
import PropTypes from "prop-types";


const CommentActions = ({ userId, commentById, postById, onDelete, onEdit, onReport }) => {
    const isCommentOwner = userId === commentById;
    const isPostOwner = userId === postById;
    const isOtherUser = !isCommentOwner && !isPostOwner; 

    
    

    const menuItems = [];

    if (isOtherUser) {
        menuItems.push({
            label: "Report Comment",
            icon: <MdOutlineReport style={{ marginRight: "8px" }} />,
            action: onReport,
        });
    }

    if (isPostOwner && !isCommentOwner )  {
        menuItems.push(
            {
                label: "Delete Comment",
                icon: <MdDelete style={{ marginRight: "8px" }} />,
                action: onDelete,
            },
            {
                label: "Report Comment",
                icon: <MdOutlineReport style={{ marginRight: "8px" }} />,
                action: onReport,
            }
        );
    }

    if (isCommentOwner) {
        menuItems.push(
            {
                label: "Edit Comment",
                icon: <MdEdit style={{ marginRight: "8px" }} />,
                action: onEdit,
            },
            {
                label: "Delete Comment",
                icon: <MdDelete style={{ marginRight: "8px" }} />,
                action: onDelete,
            }
        );
    }

    return (
        <>
            {menuItems.map((item, index) => (
                <MenuItem key={index} fontSize={"md"} onClick={item.action}>
                    {item.icon}
                    {item.label}
                </MenuItem>
            ))}
        </>
    );
};

CommentActions.propTypes = {
    userId: PropTypes.string.isRequired, 
    commentById: PropTypes.string.isRequired, 
    postById: PropTypes.string.isRequired, 
    onDelete: PropTypes.func, 
    onEdit: PropTypes.func, 
    onReport: PropTypes.func, 
};

export default CommentActions;
