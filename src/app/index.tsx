import React, { FC } from 'react';
import { Container, Box, Heading, Stack } from '@chakra-ui/react';
import { Provider as ChakraProvider } from '@src/components/ui/provider';

import { TodoForm } from '@src/components/todoForm';
import { TodoList } from '@src/components/todoList';

const App: FC = () => (
  <ChakraProvider>
    <Container as='main' minW='768px' data-app-container>
      <Stack w='100%' h='100vh'>
        <Box w='100%' p={6} flex='0 0 auto'>
          <Heading size='6xl'>Classic TODO LIST with 2025 React stack</Heading>
        </Box>

        <Stack w='100%' p={6} flex='1 1 auto'>
          <TodoForm />
          <TodoList />
        </Stack>
      </Stack>
    </Container>
  </ChakraProvider>
);

export { App };
