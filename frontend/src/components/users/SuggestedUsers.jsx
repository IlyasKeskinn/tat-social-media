import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useShowToast from "../../hooks/showToast";
import useFetch from "../../hooks/useFetch";
import UserTile from "./UserTile";


const SuggestedUsers = () => {
    const showToast = useShowToast();

    const suggestUsersURL = `user/suggestUsers`
    const [suggestedUsers, setSuggestedUsers] = useState([]);


    const { responseData, error: suggestedUserFetchingError } = useFetch(suggestUsersURL);

    useEffect(() => {
        if (suggestedUserFetchingError) {
            showToast("Error", suggestedUserFetchingError.message, "error");
            setSuggestedUsers([]);
        }

        setSuggestedUsers(responseData);

    }, [responseData, suggestedUserFetchingError, showToast]);
    return (
        <>
            {suggestedUsers && suggestedUsers.length > 0 && (<Box
                position="sticky"
                top={2}
                p={4}
                borderRadius="lg"
                boxShadow={"sm"}
                w="sm"
            >
                <Text
                    fontSize="2xl"
                    fontWeight="semi-bold"
                    mb={4}
                    textAlign="center"
                >
                    Suggested
                </Text>
                <Flex direction={"column"} gap={2}>
                    {suggestedUsers.map((suggestedUser) => (<UserTile key={suggestedUser._id} user={suggestedUser} />))}
                </Flex>
            </Box>)}
        </>
    )
}

export default SuggestedUsers