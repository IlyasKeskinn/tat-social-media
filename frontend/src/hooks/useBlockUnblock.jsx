import { useTranslation } from "react-i18next";
import ProptTypes from "prop-types";
import { useEffect } from "react";

import { API_USER_ROUTES } from "../constants/API_ROUTES";
import useShowToast from "./showToast";
import useFetch from "./useFetch";


const useBlockUnblock = (user) => {
    const { t } = useTranslation();
    const showToast = useShowToast()

    const URL = API_USER_ROUTES.BLOCK_UNBLOCK(user._id);
    const { statusCode, isLoading, error, putData } = useFetch(
        URL,
        "PUT"
    );

    const handleBlockUnblock = () => {
        putData();
    };

    useEffect(() => {
        if (error) {
            showToast(t("common.error"), error.message, "error");
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