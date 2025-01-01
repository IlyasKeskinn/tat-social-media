import { Flex, Input, InputGroup, InputRightElement, Button, Box, Icon, FormControl, useColorMode, } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmojiEmotions } from "react-icons/md";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import * as z from "zod";

import EmojiPickerBox from "../shared/EmojiPickerBox.jsx";
import useShowToast from "../../hooks/showToast.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import userAtom from "../../atoms/userAtom.js";


const schema = z.object({
    text: z.string().min(1, "cannot be sent empty"),
});

const CommentInputForm = ({
    currentPost,
    isEditing = false,
    initialText = "",
    onUpdate,
    comment,
    setComments,
}) => {
    const { colorMode } = useColorMode();
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);

    const COMMENT_URL = isEditing
        ? `post/updatecomment/${currentPost._id}/${comment._id}`
        : `post/makecomment/${currentPost._id}`;

    const { responseData, isLoading, statusCode, error, putData } = useFetch(
        COMMENT_URL,
        "PUT"
    );

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ resolver: zodResolver(schema) });

    const [text, setText] = useState(initialText);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiClick = (emoji) => {
        setText(text + emoji);
        setShowEmojiPicker(false);
    };

    const onSubmit = () => {
        putData({ text });
    };

    useEffect(() => {
        if (error) {
            showToast("Error", error.message, "error");
        }
        if (statusCode === 201 || statusCode === 200) {
            showToast(
                "Success",
                isEditing ? "Comment updated successfully!" : "Comment added successfully!",
                "success"
            );

            if (onUpdate) onUpdate(responseData);

            // Handling state update after comment submission
            if (!isEditing) {
                const newComment = {
                    _id: responseData._id,
                    comment: text,
                    commentBy: {
                        _id: currentUser._id,
                        userName: currentUser.userName,
                        fullName: currentUser.fullName,
                        profilePic: currentUser.profilePic,
                    },
                    replies: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                setComments((prevComments) => [...prevComments, newComment]); // Update comments state in parent

            } else {
                // If editing, update the specific comment
                setComments((prevComments) =>
                    prevComments.map((c) =>
                        c._id === comment._id ? { ...c, comment: text } : c
                    )
                );
            }

            setText("");
            reset();
        }
    }, [responseData, error]);

    return (
        <Flex flex="1" justifyContent={"center"} alignItems={"center"} gap={4}>
            {!isEditing && <Box
                h={"32px"}
                w={"32px"}
                as="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
                <Icon
                    as={MdEmojiEmotions}
                    color={colorMode === "dark" ? "blue.100" : "blue.300"}
                    boxSize={8}
                />
            </Box>}
            <Box w={"full"}>
                <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <InputGroup>
                            <Input
                                placeholder="Write a comment..."
                                size="lg"
                                {...register("text")}
                                onChange={(e) => setText(e.target.value)}
                                isInvalid={errors.text}
                                value={text}
                            />
                            <InputRightElement height="full" pe={2}>
                                <Button
                                    borderRadius={"full"}
                                    colorScheme="blue"
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    type="submit"
                                    isDisabled={text.length <= 0}
                                    isLoading={isLoading}
                                >
                                    <IoSend />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </form>
                <EmojiPickerBox
                    showEmojiPicker={showEmojiPicker}
                    setShowEmojiPicker={setShowEmojiPicker}
                    onEmojiSelect={onEmojiClick}
                />
            </Box>
        </Flex>
    );
};

CommentInputForm.propTypes = {
    comment: PropTypes.object,
    currentPost: PropTypes.object.isRequired,
    isEditing: PropTypes.bool,
    initialText: PropTypes.string,
    onCancel: PropTypes.func,
    onUpdate: PropTypes.func,
    setComments: PropTypes.func,
};

export default CommentInputForm;
