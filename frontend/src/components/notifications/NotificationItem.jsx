import { Avatar, Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
const NotificationItem = ({ notification }) => {
    const navigate = useNavigate();

    const navigateProfile = (userName) => {
        navigate(`/profile/${userName}`);
    };

    console.log(notification);

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
    const renderFollowRequest = () => {
        if (notification.type !== "followRequest") return null;

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
                >
                    Accept
                </Button>{" "}
                <Button
                    bg={"gray.600"}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "gray.700",
                    }}
                    size={"sm"}
                >
                    Reject
                </Button>{" "}
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
}
export default NotificationItem;
