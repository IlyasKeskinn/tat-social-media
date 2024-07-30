import { Box, useColorMode } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef } from "react";

const EmojiPickerBox = ({showEmojiPicker, setShowEmojiPicker ,onEmojiSelect }) => {
  const { colorMode } = useColorMode();

  const emojiPickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (e) => {
    onEmojiSelect(e.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <Box ref={emojiPickerRef} position={"absolute"} bottom={"0"} left={"30px"}>
      {showEmojiPicker && (
        <EmojiPicker
          theme={colorMode === "dark" ? "dark" : "light"}
          onEmojiClick={onEmojiClick}
        />
      )}
    </Box>
  );
};

export default EmojiPickerBox;
