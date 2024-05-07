import React, { useState } from 'react';
import {
  Container, Divider, Text, Link, Flex, Image, Button, Box,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet } from 'react-router-dom';

function Header() {
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const [isTasksHovered, setIsTasksHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  return (<header style={{
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '10px 0',
    backgroundColor: '#f5f0ff',
  }}>
    <Box style={{
      marginInline: 'auto',
      width: '720px',
    }}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Link
            as={ReactRouterLink}
            to="/"
            _hover={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
            transition="transform 0.3s ease-in-out"
            style={{ transform: isHomeHovered ? 'scale(1.1)' : 'scale(1)' }}
          >
            <Image src="img\home-icon.svg" alt="Home Icon"
                   marginRight="10px" />
          </Link>
          <Text fontSize="2xl" fontWeight="bold" marginRight="10px">Databases
            Project</Text>
        </Flex>
        <nav>
          <Link
            as={ReactRouterLink}
            to="/tasks"
            marginRight="10px"
            _hover={{
              textDecoration: 'none',
              backgroundColor: isTasksHovered ? 'purple.200' : 'blue.500',
              color: '#fff',
            }}
            fontSize="sm"
            onMouseEnter={() => setIsTasksHovered(true)}
            onMouseLeave={() => setIsTasksHovered(false)}
            transition="background-color 0.3s ease-in-out"
            borderRadius="md"
            padding="0.5rem 1rem"
          >
            Tasks
          </Link>
          <Link
            as={ReactRouterLink}
            to="/about"
            marginRight="10px"
            _hover={{
              textDecoration: 'none',
              backgroundColor: isAboutHovered ? 'purple.200' : 'blue.500',
              color: '#fff',
            }}
            fontSize="sm"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
            transition="background-color 0.3s ease-in-out"
            borderRadius="md"
            padding="0.5rem 1rem"
          >
            About
          </Link>
          <Button
            as={ReactRouterLink}
            to="/signup"
            marginRight="10px"
            backgroundColor={'purple.500'}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
            }}
            transition="transform 0.3s ease-in-out"
          >
            Sign Up
          </Button>
          <Button
            as={ReactRouterLink}
            to="/signin"
            backgroundColor={'purple.500'}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
            }}
            transition="transform 0.3s ease-in-out"
          >
            Sign In
          </Button>
        </nav>
      </Flex>
      <Divider />
    </Box>
  </header>);
}

export default function Layout() {
  return (<>
    <Header />
    <Box style={{
      marginInline: 'auto',
      width: '720px',
    }}>
      <main>
        <Outlet />
      </main>
      <footer>
        <Divider />
        <Text>Footer</Text>
      </footer>
    </Box>
  </>);
}
