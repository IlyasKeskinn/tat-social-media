import ProptTypes from "prop-types"
import useFetch from "./useFetch";
import useShowToast from "./showToast";
import { useEffect } from "react";
import { API_USER_ROUTES } from "../constants/API_ROUTES";

const useBlockUnblock = (user) => {
    const showToast = useShowToast()

    const URL = `${API_USER_ROUTES.BLOCK_UNBLOCK}/${user._id}`;
    const { statusCode, isLoading, error, putData } = useFetch(
        URL,
        "PUT"
    );

    const handleBlockUnblock = () => {
        putData();
    };

    useEffect(() => {
        if (error) {
            showToast("Error", error.message, "error");
        }
        if (statusCode === 200) {
            window.location.reload();
        }
    }, [error, showToast, statusCode]);

    return { handleBlockUnblock, isLoading };
}

useBlockUnblock.proptTypes = {
    user: ProptTypes.object
}

export default useBlockUnblock