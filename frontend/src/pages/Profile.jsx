import { Grid, VStack } from "@chakra-ui/react";

import UserHeader from "../components/UserHeader";
import ProfilePagePost from "../components/ProfilePagePost";

const Profile = () => {
  //TODO
  const posts = [
    { image: "./public/post_1.jpg" },
    { image: "./public/post_2.jpg" },
    { image: "./public/post_3.jpg" },
    { image: "./public/post_4.jpg" },
    { image: "./public/post_5.jpg" },
    { image: "./public/post_6.jpg" },
    { image: "./public/post_7.jpg" },
    { image: "./public/post_8.jpg" },
    { image: "./public/post_9.jpg" },
  ];
  return (
    <VStack>
      <UserHeader />
      <Grid w={"full"} templateColumns={"repeat(3, 1fr)"} gap={1}>
        {posts.map((post, index) => {
          return <ProfilePagePost key={index} post={post} />;
        })}
      </Grid>
    </VStack>
  );
};

export default Profile;
