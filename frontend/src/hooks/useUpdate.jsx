import { useTranslation } from "react-i18next";
import { useState } from "react";

import useShowToast from "./showToast";


const useUpdate = (req_body, URL, msg) => {
    const { t } = useTranslation(); 

    const showToast = useShowToast();

    const [isLoading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await fetch(URL, {
                method: "PUT",
                body: JSON.stringify(req_body),
                credentials: "include",
            });

            const data = await response.json();

            if (response.status === 200) {
                setUpdated(true);
                showToast(t("common.success"), msg, "success");
            } else {
                showToast(t("common.error"), data.error || t("common.failedToUpdate"), "error");
            }
        } catch (error) {
            showToast(t("common.error"), error.message, "error");
            setUpdated(false);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, isLoading, updated };
};

export default useUpdate;
