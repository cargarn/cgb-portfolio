import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useGeneralContext } from "../../context/generalContext";

const currYear: number = new Date().getFullYear();

const Footer = () => {
  const { authorName } = useGeneralContext();

  return (
    <Box backgroundColor="#18181b">
      <footer>
        <Flex
          margin="0 auto"
          px={12}
          color="white"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          height={16}
          gap={1}
        >
          <div>{ authorName }</div><div>• © { currYear }</div>
        </Flex>
      </footer>
    </Box>
  );
};
export default Footer;
