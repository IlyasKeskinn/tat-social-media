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
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const reducedQualityImg = canvas.toDataURL("image/jpeg", 0.6);

          setImgUrl(reducedQualityImg);
        };

        // setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid Format", "Please chose an image!", "error");
    }
  };
  return { imgUrl, handleImageChange };
};

export default usePrevImg;
