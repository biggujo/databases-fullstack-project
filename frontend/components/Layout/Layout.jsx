import React from 'react';
import { Container, Divider, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (<Container>
    <header>
      <Text>Header (App Bar)</Text>
      <Link color={'teal'}
            as={ReactRouterLink}
            to={'/'}>Homepage</Link>
      <Link color={'teal'}
            as={ReactRouterLink}
            to={'/about'}
      >About</Link>
      <Divider />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <Divider />
      <Text>Footer</Text>
    </footer>
  </Container>);
}
