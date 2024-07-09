import { useState } from "react";

import useShowToast from "./showToast";

const usePrevImg = () => {
  const showToast = useShowToast();

  const [imgUrl, setImgUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid Format", "Please chose an image!", "error");
    }
  };
  return { imgUrl, handleImageChange };
};

export default usePrevImg;
