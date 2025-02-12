import { Stack, Text, Heading, Flex, Spinner, Box } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import NotificationItem from "../components/notifications/NotificationItem";
import { API_NOTIFICATION_ROUTES } from "../constants/API_ROUTES";
import Loading from "../components/shared/Loading";
import useShowToast from "../hooks/showToast";


const fetchNotifications = async ({ pageParam = 1 }) => {
    try {
        const response = await fetch(
            API_NOTIFICATION_ROUTES.GET_NOTIFICATIONS(pageParam),
            { credentials: "include" }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error ${response.status}: ${error}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Fetching notifications failed: ${error.message}`);
    }
};

const Notifications = () => {
    const { t } = useTranslation();
    const showToast = useShowToast();
    const { ref, inView } = useInView();
    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
        onError: (err) => {
            showToast("Error", err.message, "error");
        },
    });

    const notifications = data?.pages.flat() || [];

    const handleRequestProcessed = (notificationId) => {
        const updatedPages = data.pages.map(page => 
            page.filter(notification => notification._id !== notificationId)
        ).filter(page => page.length > 0);
        
        queryClient.setQueryData(['notifications'], old => ({
            ...old,
            pages: updatedPages
        }), { silent: true });
    };

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    if (status === "loading") return <Loading />
    if (status === "error") return <Text>{t("common.errorOccurred")}: {error.message}</Text>;

    return (
        <Stack spacing={4} w={"full"}>
            <Heading
                textAlign={"start"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                mb={12}
            >
                {t("notifications.notifications")}
            </Heading>
            <Flex
                alignItems={"center"}
                justifyContent={"start"}
                w={"full"}
                flexDirection={"column"}
                gap={8}
            >
                {notifications.length === 0 ? (
                    <Flex
                        
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                        minHeight="50vh">
                        <Text fontSize="3xl" fontWeight="medium" color="gray.500" textAlign="center">
                            🥺
                        </Text>
                        <Text fontSize="3xl" fontWeight="medium" color="gray.500" textAlign="center">
                        {t("notifications.noNotifications")}
                        </Text>
                    </Flex>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem 
                            key={notification.id} 
                            notification={notification}
                            onRequestProcessed={handleRequestProcessed}
                        />
                    ))
                )}
                {isFetchingNextPage && <Spinner />}
                {!isFetchingNextPage && hasNextPage && <Box ref={ref} />}
            </Flex>
        </Stack>
    );
};

export default Notifications;
