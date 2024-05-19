import React, { useState } from 'react';
import {
  Divider, Text, Link, Flex, Image, Button, Box, Select,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthIsLoggedIn, selectAuthUser,
} from '../../redux/auth/selectors.js';
import { Toaster } from 'react-hot-toast';
import UserOperations from '../../redux/auth/operations.js';
import { useTranslation } from 'react-i18next';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector(selectAuthUser);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isTasksHovered, setIsTasksHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const {
    t,
    i18n,
  } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (<header style={{
    width: '100%',
    padding: '10px 0',
    marginBottom: '2rem',
    backgroundColor: '#f5f0ff',
  }}>
    <Box style={{
      marginInline: 'auto',
      width: '960px',
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
            {t('tasks')}
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
            {t('allGroups')}
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
            {t('myGroups')}
          </Link>
          <Flex gap={4}>
            <Select id="languageSelect"
                    borderColor={'purple'}
                    width={'fit-content'}
                    value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="en">Eng</option>
              <option value="ua">Укр</option>
            </Select>
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
                  {t('logOut')}
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
                {t('signUp')}
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
                {t('signIn')}
              </Button>
            </>}
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Toaster position={'top-right'} />
    </Box>
  </header>);
}

export default function Layout() {
  const {
    t,
    i18n,
  } = useTranslation();
  return (<Box
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
        paddingBottom: '96px',
        width: '960px',
        flex: '1',
      }}
    >
      <main>
        <Outlet />
      </main>
    </Box>
    <footer style={{
      marginTop: '30px',
      paddingLeft: '45px',
      paddingRight: '45px',
      paddingBottom: '30px',
      paddingTop: '30px',
      backgroundColor: '#f5f0ff',
      border: '1px solid #e2d9ff',
      borderRadius: '5px',
    }}>
      <Box
        style={{
          marginInline: 'auto',
          paddingBottom: '96px',
          width: '960px',
          flex: '1',
        }}
      >
        <Divider />
        <Flex
          justify="flex-start"
          align="flex-start"
          flexDirection="column"
        >
          <Text>
            <Link as={ReactRouterLink} to="/">{t('homePage')}</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/tasks">{t('signUp')}</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/groups">{t('allGroups')}</Link>
          </Text>
          <Text>
            <Link as={ReactRouterLink} to="/my-groups">{t('myGroups')}</Link>
          </Text>
          <Text marginTop="30px">(c) {t('databaseProject')}</Text>
        </Flex>
      </Box>
    </footer>
    <Toaster position={'top-right'} />
  </Box>);
}
