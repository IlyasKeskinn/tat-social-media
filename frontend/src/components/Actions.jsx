import { Flex, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Actions = () => {
  const [liked, setLiked] = useState(false);
  const handleLiked = () => {
    setLiked(!liked);
  };
  return (
    <Flex direction={"column"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2}>
          <Box
            my={2}
            cursor={"pointer"}
            onClick={() => {
              handleLiked();
            }}
          >
            <svg
              aria-label="Like & Unlike"
              width="24px"
              height="24px"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill={liked ? "rgb(237, 73, 86)" : "transparent"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Like</title>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                {liked !== true && (
                  <path
                    opacity="0.5"
                    d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                )}
              </g>
            </svg>
          </Box>
          <Box my={2} cursor={"pointer"}>
            <svg
              aria-label="comment"
              width="24px"
              height="24px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              fill="currentColor"
            >
              <title>Comment</title>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>Comment</title>
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fill-rule="evenodd"
                  sketch:type="MSPage"
                >
                  {" "}
                  <g
                    id="Icon-Set"
                    sketch:type="MSLayerGroup"
                    transform="translate(-360.000000, -255.000000)"
                    fill="currentColor"
                  >
                    {" "}
                    <path
                      d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
                      id="comment-5"
                      sketch:type="MSShapeGroup"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </Box>
        </Flex>
        <ShareSvg />
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text className="nonSelectableText" fontSize={"sm"} cursor={"pointer"}>
          132 Likes
        </Text>
        <Box w={1} h={1} bg={"gray"} rounded={"full"}></Box>
        <Text className="nonSelectableText" fontSize={"sm"} cursor={"pointer"}>
          25 Comments
        </Text>
      </Flex>
    </Flex>
  );
};

export default Actions;

export const ShareSvg = () => {
  return (
    <Box my={2} cursor={"pointer"}>
      <svg
        aria-label="send"
        fill="currentColor"
        width="24px"
        height="24px"
        viewBox="0 0 24.00 24.00"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        strokeWidth="0.00024000000000000003"
        transform="matrix(1, 0, 0, 1, 0, 0)"
      >
        <title>Send</title>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.72"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M22.7,3.55a1,1,0,0,1,0,1.422L18.77,8.862a9.542,9.542,0,0,1-.682,12.849,1,1,0,0,1-1.406,0L11.5,16.59,9.046,21.451a1,1,0,0,1-.732.536.959.959,0,0,1-.16.013,1,1,0,0,1-.7-.289L1.3,15.624a1,1,0,0,1,.26-1.607l4.9-2.422L1.3,6.493a1,1,0,0,1,0-1.422,9.733,9.733,0,0,1,10.642-2.05,1,1,0,1,1-.773,1.843,7.748,7.748,0,0,0-7.7.964l5.388,5.33a1,1,0,0,1-.26,1.608L3.7,15.188l4.181,4.135,2.457-4.861a1,1,0,0,1,1.6-.26l5.406,5.347a7.541,7.541,0,0,0-.658-10.012,1,1,0,0,1,0-1.422l3.785-3.744a3.392,3.392,0,0,0-3.918.6L12.7,8.776a1,1,0,0,1-1.7-.607,1.051,1.051,0,0,1,.446-.967L15.143,3.55A5.4,5.4,0,0,1,22.7,3.55Z"></path>
        </g>
      </svg>
    </Box>
  );
};
