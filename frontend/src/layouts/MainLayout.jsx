import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Menu from "../components/Menu";
const MainLayout = () => {
  return (
    <Box position={"relative"} w={"full"}>
      <Container
        maxW={{ base: "540px", md: "860px", lg: "1140px", xl: "1340px" }}
      >
        <Stack spacing={{base : "0" , sm :8}} direction={"row"}>
          <Menu />
          <Flex flex={5} gap={5} my={5} py={5}>
            <Outlet />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default MainLayout;
