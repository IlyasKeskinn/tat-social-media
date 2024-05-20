import React from "react";
import Post from "../components/Post";
import { Flex } from "@chakra-ui/react";

const Feed = () => {
  const posts = [
    {
      avatar: "https://bit.ly/dan-abramov",
      postedBy: "Ilyas Keskin",
      userName: "Fidelio",
      image: `./public/post_1.jpg`,
      emoji: "🥹",
      text: "  Lorem ipsum dolor sit amet.",
    },
    {
      avatar: "https://bit.ly/kent-c-dodds",
      postedBy: "John Doe",
      userName: "johndoe",
      image: `./public/post_2.png`,
      emoji: "🥴",
      text: "  Lorem ipsum dolor.",
    },
  ];
  return (
    <Flex w={"full"} alignItems={"center"} flexDirection={"column"} my={4}>
      {posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </Flex>
  );
};

export default Feed;
