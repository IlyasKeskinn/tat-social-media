import { Avatar, Box, Flex, Text, Image, Icon } from "@chakra-ui/react";
import { FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
const NotificationItem = ({ notification }) => {
    const navigate = useNavigate();

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
                    <Text>
                        <b>{notification.relatedUser.fullName}</b> liked your post.
                    </Text>
                );
            case "comment":
                return (
                    <Text>
                        <b>{notification.relatedUser.fullName}</b> commented on your post.
                    </Text>
                );
            case "requestAccepted":
                return (
                    <Text>
                        <b>{notification.relatedUser.fullName}</b> accepted your follow request.
                    </Text>
                );
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
                        src={notification.relatedPost.image}
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
                    name={notification.relatedUser.fullName}
                    src={notification.relatedUser.profilePic}
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
        </Box>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
}
export default NotificationItem;
