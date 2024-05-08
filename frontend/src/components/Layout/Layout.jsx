import React, { useState } from 'react';
import {
  Divider, Text, Link, Flex, Image, Button, Box,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthIsLoggedIn, selectAuthUser,
} from '../../redux/auth/selectors.js';
import { Toaster } from 'react-hot-toast';
import UserOperations from '../../redux/auth/operations.js';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector(selectAuthUser);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isTasksHovered, setIsTasksHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  return (<header style={{
    width: '100%',
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
        <Flex as={'nav'} align="center" gap={2}>
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
          {isLoggedIn && <>
            <Flex alignItems={'center'} gap={2}>
              <p>Hello, {username}</p>
              <Button
                marginRight="10px"
                backgroundColor={'purple.500'}
                color={'white'}
                _hover={{
                  textDecoration: 'none',
                  transform: 'scale(1.05)',
                }}
                transition="transform 0.3s ease-in-out"
                onClick={async () => {
                  await dispatch(UserOperations.logout()).unwrap();
                  navigate('/');
                }}
              >
                Log out
              </Button>
            </Flex>
          </>}
          {!isLoggedIn && <>
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
          </>}
        </Flex>
      </Flex>
      <Divider />
    </Box>
  </header>);
}

export default function Layout() {
  return (<Box bg={'gray.50'} style={{
    minHeight: '100vh',
  }}>
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
    <Toaster position={'top-right'} />
  </Box>);
}
