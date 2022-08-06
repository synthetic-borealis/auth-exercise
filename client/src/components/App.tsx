import * as React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
} from "@chakra-ui/react";

import SuccessScreen from "./SuccessScreen";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <ChakraProvider>
      {isLoggedIn ? (
        <SuccessScreen />
      ) : (
        <Box>
          <Heading>Please log in.</Heading>
        </Box>
        )}
    </ChakraProvider>
  );
};
