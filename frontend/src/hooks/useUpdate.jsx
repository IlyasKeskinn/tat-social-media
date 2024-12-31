import { useState } from "react";
import useShowToast from "./showToast";

const useUpdate = (req_body, URL, msg) => {

    const API_URL = import.meta.env.VITE_BASE_API_URL;
    const fetchURL = `${API_URL}/${URL}`;
    const showToast = useShowToast();

    const [isLoading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await fetch(fetchURL, {
                method: "PUT",
                body: JSON.stringify(req_body),
                credentials: "include",
            });

            const data = await response.json();

            if (response.status === 200) {
                setUpdated(true);
                showToast("Success", msg, "success");
            } else {
                showToast("Error", data.error || "Failed to update!", "error");
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            setUpdated(false);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, isLoading, updated };
};

export default useUpdate;
