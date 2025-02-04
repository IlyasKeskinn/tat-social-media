import { Avatar, Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import { API_FOLLOW_REQUEST_ROUTES } from "../../constants/API_ROUTES";
import useShowToast from "../../hooks/showToast";
import useFetch from "../../hooks/useFetch";


const NotificationItem = ({ notification, onRequestProcessed }) => {
    const navigate = useNavigate();
    const showToast = useShowToast();
    const [action, setAction] = useState(null);
    console.log(notification);
    

    const { putData: acceptRequest, isLoading: isAccepting } = useFetch(
        notification.followRequestId 
            ? API_FOLLOW_REQUEST_ROUTES.ACCEPT_REQUEST(notification.followRequestId)
            : null,
        "PUT"
    );

    const { deleteData: rejectRequest, isLoading: isRejecting, statusCode: rejectStatusCode } = useFetch(
        notification.followRequestId 
            ? API_FOLLOW_REQUEST_ROUTES.REJECT_REQUEST(notification.followRequestId)
            : null,
        "DELETE"
    );

    useEffect(() => {
        if (rejectStatusCode === 200 && action === 'reject') {
            setTimeout(() => {
                onRequestProcessed(notification._id);
                showToast(
                    "Follow request rejected",
                    "",
                    "success"
                );
            }, 300);
            setAction(null);
        }
    }, [rejectStatusCode]);

    const navigateProfile = (userName) => {
        navigate(`/profile/${userName}`);
    };

    const navigateToPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    const renderNotificationContent = () => {
        switch (notification.type) {
            case "like":
                return (
                    <Flex maxW={"300px"}>
                        <Text>
                            <b>{notification.sender.fullName}</b> liked your post.
                        </Text>
                    </Flex>
                );
            case "comment":
                return (
                    <Flex maxW={"300px"}>
                        <Text>
                            <b>{notification.sender.fullName}</b> commented on your post.
                        </Text>
                    </Flex>
                );
            case "requestAccepted":
                return (
                    <Flex maxW={"300px"}>
                        <Text>
                            <b>{notification.sender.fullName}</b> accepted your follow request.
                        </Text>
                    </Flex>
                );
            case "followRequest":
                return (
                    <Flex maxW={"300px"}>
                        <Text>
                            <b>{notification.sender.fullName}</b> wants to be your friend.
                        </Text>
                    </Flex>
                )
            default:
                return null;
        }
    };

    const renderNotificationIcon = () => {
        switch (notification.type) {
            case "like":
                return <Icon as={FaHeart} color={"red.500"} boxSize={5} />;
            case "comment":
                return <Icon as={FaRegCommentAlt} boxSize={5} />;
            case "requestAccepted":
                return null;
            default:
                return null;
        }
    };

    const renderRelatedPost = (relatedPost) => {
        if (!relatedPost) return null;

        return (
            <Flex alignItems="center" gap={2}>
                {notification.relatedPost && (
                    <Image
                        src={notification.relatedPost.images[0]}
                        alt="Post Thumbnail"
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                        onClick={() => navigateToPost(notification.relatedPost.id)}
                        cursor="pointer"
                    />
                )}
            </Flex>)
    };

    const handleFollowRequest = (actionType) => {
        setAction(actionType);
        try {
            if (actionType === 'accept') {
                acceptRequest();
            } else {
                rejectRequest();
            }

            if (actionType === 'accept' && onRequestProcessed) {
                setTimeout(() => {
                    onRequestProcessed(notification._id);
                    showToast(
                        "Follow request accepted",
                        "",
                        "success"
                    );
                }, 300);
            }

        } catch (error) {
            showToast(
                "Error",
                "Failed to process follow request",
                "error"
            );
            setAction(null);
        }
    };

    const renderFollowRequest = () => {
        if (notification.type !== "followRequest") return null;

        const isProcessing = isAccepting || isRejecting;

        return (
            <Flex gap={2} alignItems={"center"}>
                <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "blue.500",
                    }}
                    size={"sm"}
                    onClick={() => handleFollowRequest('accept')}
                    isLoading={action === 'accept' && isProcessing}
                    isDisabled={isProcessing}
                >
                    Accept
                </Button>
                <Button
                    bg={"gray.600"}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "gray.700",
                    }}
                    size={"sm"}
                    onClick={() => handleFollowRequest('reject')}
                    isLoading={action === 'reject' && isProcessing}
                    isDisabled={isProcessing}
                >
                    Reject
                </Button>
            </Flex>
        )
    }

    return (
        <Box
            w="full"
            p={4}
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex alignItems="center" gap={4}>
                <Avatar
                    cursor="pointer"
                    size="md"
                    name={notification.sender.fullName}
                    src={notification.sender.profilePic}
                    onClick={() => navigateProfile(notification.relatedUser.userName)}
                    rounded="full"
                />
                <Flex flexDirection="column">
                    {renderNotificationContent()}
                    <Text fontSize="sm" color="gray.500">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                    </Text>
                    {renderNotificationIcon()}
                </Flex>
            </Flex>
            {renderRelatedPost(notification.relatedPost)}
            {renderFollowRequest()}
        </Box>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
    onRequestProcessed: PropTypes.func,
}

export default NotificationItem;
