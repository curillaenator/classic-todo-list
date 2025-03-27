import React, { FC } from 'react';
import { Container, Box, Heading, Stack } from '@chakra-ui/react';
import { Provider as ChakraProvider } from '@src/components/ui/provider';

import { TodoForm } from '@src/components/todoForm';

const App: FC = () => (
  <ChakraProvider>
    <Container as='main' data-app-container>
      <Stack w='100%' h='100vh'>
        <Box w='100%' p={6} flex='0 0 auto'>
          <Heading size='6xl'>Mindbox TODOs</Heading>
        </Box>

        <Box w='100%' p={6} flex='1 1 auto'>
          <TodoForm />
        </Box>
      </Stack>
    </Container>
  </ChakraProvider>
);

export { App };
