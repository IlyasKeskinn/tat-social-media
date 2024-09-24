import { useCallback } from "react";
import useShowToast from "./showToast";

const useCopyProfile = () => {
    const showToast = useShowToast();

    const copyProfile = useCallback(() => {
        const profileURL = window.location.href;
        navigator.clipboard.writeText(profileURL).then(() => {
            showToast(
                "Copied to clipboard",
                "Profile URL has been copied successfully.",
                "success"
            );
        });
    }, [showToast]);

    return copyProfile;
};

export default useCopyProfile;
