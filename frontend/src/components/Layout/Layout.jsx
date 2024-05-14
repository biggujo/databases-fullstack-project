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

  return (
    <header style={{
      width: '100%',
      padding: '10px 0',
      backgroundColor: '#f5f0ff',
    }}>
      <Box style={{
        marginInline: 'auto',
        width: '780px',
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
              <Image src="img\home-icon.svg" alt="Home Icon" marginRight="10px" />
            </Link>
            <Text fontSize="2xl" fontWeight="bold" marginRight="10px">Databases Project</Text>
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
              to="/groups"
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
              style={{ whiteSpace: 'nowrap' }}
            >
              All Groups
            </Link>
            <Link
              as={ReactRouterLink}
              to="/my-groups"
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
              style={{ whiteSpace: 'nowrap' }}
            >
              My Groups
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
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        style={{
          marginInline: 'auto',
          width: '720px',
          flex: '1',
        }}
      >
        <main>
          <Outlet />
        </main>
      </Box>
      <footer style={{ marginTop: '30px', paddingLeft: '45px', paddingRight: '45px', paddingBottom: '30px', paddingTop: '30px', backgroundColor: '#f5f0ff', border: '1px solid #e2d9ff', borderRadius: '5px' }}>
        <Divider />
        <Flex
          justify="flex-start"
          align="flex-start"
          flexDirection="column"
        >
          <Text>
            <Link as={ReactRouterLink} to="/">Home Page</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/tasks">My Tasks</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/groups">All Groups</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/my-groups">My Groups</Link>
          </Text>
          <Text marginTop="30px">(c) Databases Project</Text>
        </Flex>
      </footer>
      <Toaster position={'top-right'} />
    </Box>
  );
}