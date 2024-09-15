import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import useShowToast from "../hooks/showToast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const getSearchUsers = async ({ queryKey, pageParam = 1 }) => {
  const [, query] = queryKey;

  try {
    const response = await fetch(
      `${API_URL}/user/searchuser?query=${query}&page=${pageParam}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const SearchDrawer = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { ref, inView } = useInView();
  const showToast = useShowToast();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["fetchUsers", query],
    queryFn: getSearchUsers,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: query.length >= 3,
    onError: (err) => {
      showToast("Error", err.message, "error");
    },
  });

  const handleSearchInput = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length >= 3) {
      refetch();
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data?.pages.flat());
    }
  }, [data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    if (query.length < 3) {
      setUsers([]);
    }
  }, [query]);
  return (
    <Drawer
      size={{ base: "sm", md: "md" }}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader my={6}>
          <Input
            placeholder="Search..."
            value={query}
            onChange={handleSearchInput}
          />
        </DrawerHeader>

        <DrawerBody m={2} overflowY={"auto"}>
          {users.map((user) => {
            return <UserCard key={user._id} user={user} onClose={onClose} />;
          })}
          {hasNextPage && <Box ref={ref}></Box>}
          {status === "loading" && <Loading />}
          {status === "error" && <p>Error: {error.message}</p>}
          {isFetchingNextPage && !hasNextPage && <Loading />}
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

SearchDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchDrawer;
