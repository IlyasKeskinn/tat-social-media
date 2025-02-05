import { useQuery } from "@tanstack/react-query";

import { API_NOTIFICATION_ROUTES } from "../constants/API_ROUTES";


const fetchNotifications = async () => {
    const response = await fetch(
        API_NOTIFICATION_ROUTES.GET_NOTIFICATIONS,
        {credentials: "include"}
    );

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();


    return data.map((notification) => ({
        id: notification._id,
        type: notification.type,
        relatedUser: {
            fullName: notification.sender.fullName,
            userName: notification.sender.userName,
            profilePic: notification.sender.profilePic,
        },
        relatedPost: notification.relatedPost
            ? {
                id: notification.relatedPost._id,
                image: notification.relatedPost.image,
            }
            : null,
        relatedEvent: notification.relatedEvent
            ? {
                id: notification.relatedEvent._id,
                name: notification.relatedEvent.name,
            }
            : null,
        isRead: notification.isRead,
        createdAt: new Date(notification.createdAt).toLocaleString(),
    }));
};

const useNotifications = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["notifications", page, limit],
        queryFn: () => fetchNotifications(page, limit),
        keepPreviousData: true,
    });
};

export default useNotifications;
