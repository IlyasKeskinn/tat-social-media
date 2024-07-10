import React from "react";
import Post from "../components/Post";
import { Flex, Text } from "@chakra-ui/react";
import CreatePost from "../components/CreatePost";

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
    <>
      <Flex flex={2} alignItems={"center"} flexDirection={"column"}>
        <CreatePost />
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </Flex>
      <Flex flex={2} display={{ base: "none", lg: "flex" }}>
        {/* <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
          provident beatae fugiat?
        </Text> */}
      </Flex>
    </>
  );
};

export default Feed;
