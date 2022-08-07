import {
  Center,
  VStack,
  Avatar,
  Heading,
  Box,
  Input,
  Button,
  FormControl,
  InputLeftElement,
  InputGroup,
  Icon,
  CSSObject,
  InputRightElement,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

import { FaUserAlt, FaLock } from 'react-icons/fa';

import { authHost, authPort } from '../utils/constants';

interface ILoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<ILoginScreenProps> = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const toast = useToast();

  const placeholderStyle: CSSObject = {
    color: 'gray.400',
  };

  const fauxLinkHoverStyle: CSSObject = {
    background: 'transparent',
    color: 'teal.300',
  };

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(evt.target.value);
  }

  function handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(evt.target.value);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLoginFailure(statusCode: number = 401) {
    console.log('I am here!');
    toast({
      title: 'Login error',
      description:
        statusCode === 401
          ? 'Wrong e-mail or password!'
          : 'An unknown error has occured!',
      status: 'error',
      duration: 4500,
      isClosable: true,
    });
  }

  function handleLogin(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const authUrl = `${authHost}:${authPort}`;

    axios
      .post(authUrl, {
        email: emailValue,
        password: passwordValue,
      })
      .then(() => {
        onLoginSuccess();
      })
      .catch((err) => {
        handleLoginFailure(err.response.status);
      });
  }

  return (
    <Center bg="gray.300" width="100%" height="100vh">
      <VStack width="40%">
        <Avatar size="lg" bg="teal.500" />
        <Heading color="teal.500">Welcome</Heading>
        <Box
          bg="white"
          width="100%"
          padding="1rem"
          boxShadow="md"
          borderRadius="sm"
        >
          <form onSubmit={handleLogin}>
            <VStack gap="0.5rem">
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon as={FaUserAlt} color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    id="email-input"
                    placeholder="email address"
                    _placeholder={placeholderStyle}
                    value={emailValue}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon as={FaLock} color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    _placeholder={placeholderStyle}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                size="sm"
                padding="0"
                h="1rem"
                bg="transparent"
                color="teal.500"
                alignSelf="flex-end"
                _hover={fauxLinkHoverStyle}
              >
                forgot password?
              </Button>
              <Button
                type="submit"
                width="100%"
                bg="teal.500"
                color="white"
                borderRadius="sm"
                _hover={{
                  bg: 'teal.300',
                }}
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
        <HStack>
          <Text fontSize="md">New to us? </Text>
          <Button
            padding="0"
            height="1rem"
            size="md"
            _hover={fauxLinkHoverStyle}
            bg="transparent"
            color="teal.500"
          >
            Sign Up
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default LoginScreen;
