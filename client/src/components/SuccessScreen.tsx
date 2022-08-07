import React from 'react';
import { Center, Heading, VStack, Image } from '@chakra-ui/react';

import successIcon from '../images/Approve_icon.png';

const SuccessScreen = () => {
  return (
    <Center width="100%" height="100vh">
      <VStack>
        <Image src={successIcon} width="12rem" />
        <Heading color="green.500" size="xl">
          You've made it!
        </Heading>
      </VStack>
    </Center>
  );
};

export default SuccessScreen;
