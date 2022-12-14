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
  Link,
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
      <VStack>
        <Avatar size="lg" bg="teal.500" />
        <Heading color="teal.500">Welcome</Heading>
        <Box
          bg="white"
          padding="1rem"
          boxShadow="md"
          borderRadius="sm"
          minWidth={{base: "90%", md: "580px"}}
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
              <Link
                href="#"
                color="teal.500"
                fontSize="sm"
                alignSelf="flex-end"
                lineHeight="1em"
              >
                forgot password?
              </Link>
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
          <Text fontSize="md">
            New to us?{' '}
            <Link height="1em" color="teal.500" href="#">
              Sign Up
            </Link>
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
};

export default LoginScreen;
