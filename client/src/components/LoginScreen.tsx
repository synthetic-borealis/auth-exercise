import { Center, VStack, Avatar, Heading, Box } from "@chakra-ui/react";
import React from "react";

interface ILoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<ILoginScreenProps> = ({
  onLoginSuccess
}) => {
  return (
    <Center bg="gray.300" width="100%" height="100vh">
      <VStack width="40%">
        <Avatar size="lg" />
        <Heading color="teal.500">Welcome</Heading>
        <Box bg="white" width="100%" padding="1rem" boxShadow="md" borderRadius="sm"></Box>
      </VStack>
    </Center>
  );
};

export default LoginScreen;
