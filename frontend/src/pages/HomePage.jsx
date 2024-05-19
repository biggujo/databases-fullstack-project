import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import handsImage from '../../img/hands.webp';
import { useSelector } from 'react-redux';
import {
  selectAuthIsLoggedIn, selectAuthUser,
} from '../redux/auth/selectors.js';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const { username } = useSelector(selectAuthUser);

  return (<Box>
    <Flex direction="column" align="center" mt={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>{t('welcome')}</Text>
      <Flex gap={4}>
        <Image src={handsImage} alt="Hands" width={'50%'}
               borderRadius={'7px'}
               mb={4} />
        <Box>
          <Text mb={4}>{t('lorem')}</Text>
          <Text mb={8}>{t('sed')}</Text>
          {isLoggedIn ? (
            <Flex direction="column" align="center" p={4} bg="purple.50"
                  borderRadius="md" mb={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>{t('hello',
                { username },
              )}</Text>
              <Text mb={4}>{t('howAreYou')}</Text>
              <Flex>
                <Button as={ReactRouterLink} to="/tasks" colorScheme="purple"
                        mr={4}>{t('myTasks')}</Button>
                <Button as={ReactRouterLink} to="/my-groups"
                        colorScheme="purple">{t('myGroups')}</Button>
              </Flex>
            </Flex>) : (
            <Flex direction="column" align="center" p={4} bg="purple.50"
                  borderRadius="md" mb={4}>
              <Text mb={4}>{t('loginPrompt')}</Text>
              <Button as={ReactRouterLink} to="/signin"
                      colorScheme="purple">{t('login')}</Button>
            </Flex>)}
        </Box>
      </Flex>
    </Flex>
  </Box>);
}
