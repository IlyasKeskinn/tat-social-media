import { Flex, Heading, Stack } from "@chakra-ui/react"
import FriendRequest from "../components/notifications/FriendRequest"
import Notification from "../components/notifications/NotificationItem"

const notificationLikeExample = {
    type: "like", // or "like"
    relatedUser: {
        fullName: "Fukoas Tan",
        userName: "Tan",
        profilePic: "https://example.com/john.jpg",
    },
    relatedPost: {
        _id: "post123",
        image: "https://img.freepik.com/free-photo/view-spectacular-nature-landscape_23-2150763698.jpg",
    },
    comment: "Great post! Keep it up!",
    createdAt: Date.now(),
};
const notificationCommentExample = {
    type: "comment", // or "like"
    relatedUser: {
        fullName: "Almina Total",
        userName: "Alma",
        profilePic: "https://example.com/john.jpg",
    },
    relatedPost: {
        _id: "post123",
        image: "https://img.freepik.com/free-photo/view-spectacular-nature-landscape_23-2150763698.jpg",
    },
    comment: "Great post! Keep it up!",
    createdAt: Date.now(),
};
const notificationRequestAcceptedExample = {
    type: "requestAccepted", // or "like"
    relatedUser: {
        fullName: "John Doe",
        userName: "johndoe",
        profilePic: "https://example.com/john.jpg",
    },
    createdAt: Date.now(),
};
const Notifications = () => {
    return (
        <Stack spacing={4} w={"full"}>
            <Heading
                textAlign={"start"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                mb={12}
            >
                Notifications
            </Heading>
            <Flex alignItems={"center"} justifyContent={"start"} w={"full"} flexDirection={"column"} gap={8}>
                <FriendRequest />
                <Notification notification={notificationCommentExample} />
                <Notification notification={notificationRequestAcceptedExample} />
                <Notification notification={notificationLikeExample} />
            </Flex>
        </Stack>
    )
}

export default Notifications