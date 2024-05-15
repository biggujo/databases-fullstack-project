import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import handsImage from '../../img/hands.webp';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn, selectAuthUser } from '../redux/auth/selectors.js';

export default function HomePage() {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const { username } = useSelector(selectAuthUser);

  return (
    <Box>
      <Flex direction="column" align="center" mt={8}>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>Welcome!</Text>
        <Image src={handsImage} alt="Hands" width="100%" mb={4} />
        <Text mb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        <Text mb={8}>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        {isLoggedIn ? (
          <Flex direction="column" align="center" p={4} bg="purple.50" borderRadius="md" mb={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>Hello, {username}</Text>
            <Text mb={4}>How are you doing?</Text>
            <Flex>
              <Button as={ReactRouterLink} to="/tasks" colorScheme="purple" mr={4}>My tasks</Button>
              <Button as={ReactRouterLink} to="/my-groups" colorScheme="purple">My groups</Button>
            </Flex>
          </Flex>
        ) : (
          <Flex direction="column" align="center" p={4} bg="purple.50" borderRadius="md" mb={4}>
            <Text mb={4}>Log in now to start</Text>
            <Button as={ReactRouterLink} to="/signin" colorScheme="purple">Log in</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
