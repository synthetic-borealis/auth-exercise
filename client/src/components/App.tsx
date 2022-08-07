import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import LoginScreen from './LoginScreen';
import SuccessScreen from './SuccessScreen';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <ChakraProvider>
      {isLoggedIn ? (
        <SuccessScreen />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </ChakraProvider>
  );
};
