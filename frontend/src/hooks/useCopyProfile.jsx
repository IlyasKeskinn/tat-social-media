import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import useShowToast from "./showToast";


const useCopyProfile = () => {
    const { t } = useTranslation();
    const showToast = useShowToast();

    const copyProfile = useCallback(() => {
        const profileURL = window.location.href;
        navigator.clipboard.writeText(profileURL).then(() => {
            showToast(
                t("common.copiedToClipboard"),
                t("common.URLHasBeenCopiedSuccessfully"),
                "success"
            );
        });
    }, [showToast]);

    return copyProfile;
};

export default useCopyProfile;
