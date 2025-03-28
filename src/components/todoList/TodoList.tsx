import React, { FC } from 'react';
import { useUnit } from 'effector-react';

import { Text, Stack, Flex, Box, Table, Checkbox } from '@chakra-ui/react';

import { $todosStore, handleTodo } from '@src/entities/todo';

export const TodoList: FC = () => {
  const todos = useUnit($todosStore);
  const accomplishedTodos = todos.filter(({ accomplished }) => !accomplished);

  return (
    <Stack>
      <Flex justify='space-between' mb={4}>
        <Box>
          <Text>{`${accomplishedTodos.length} items left`}</Text>
        </Box>

        <Box></Box>

        <Box>Clear</Box>
      </Flex>

      <Box>
        <Table.Root>
          <Table.ColumnGroup>
            <Table.Column htmlWidth='44px' />
            <Table.Column />
          </Table.ColumnGroup>

          <Table.Body>
            {todos.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Checkbox.Root
                    size='sm'
                    top='0.5'
                    aria-label='Select row'
                    checked={item.accomplished}
                    onCheckedChange={() => handleTodo({ ...item, accomplished: !item.accomplished })}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>

                <Table.Cell>
                  <Text>
                    {item.accomplished ? (
                      <s style={{ color: 'var(--chakra-colors-fg-muted)' }}>{item.title}</s>
                    ) : (
                      item.title
                    )}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Stack>
  );
};
