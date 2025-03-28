import React, { FC } from 'react';
import { Text, Stack, Flex, Box, CheckboxGroup, CheckboxCard, Button, ButtonGroup } from '@chakra-ui/react';

import { PiTrashLight } from 'react-icons/pi';

import { handleTodo } from '@src/entities/todo';
import { useTodoItems } from './useTodoItems';
import type { TodoFilter } from './interfaces';

const FILTER_ITEMS: TodoFilter[] = ['all', 'open', 'accomplished'];

const TodoList: FC = () => {
  const { items, todoFilter, setTodoFilter, clearAcomplished } = useTodoItems();

  return (
    <Stack flex='1 1 auto' padding={6} borderRadius={8} boxShadow='inset 0 0 0 1px var(--chakra-colors-border)'>
      <Flex justify='space-between' mb={4}>
        <Box>{!!items.open.length && <Text>{`${items.open.length} todos are open`}</Text>}</Box>

        <ButtonGroup size='sm' variant='outline' attached>
          {FILTER_ITEMS.map((filterVal) => (
            <Button
              key={filterVal}
              disabled={!items.all.length}
              variant={todoFilter === filterVal ? 'surface' : 'outline'}
              onClick={() => setTodoFilter(filterVal)}
            >
              {filterVal.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup size='sm' variant='outline' attached>
          <Button disabled={!items.accomplished.length} variant='outline' onClick={() => clearAcomplished()}>
            <PiTrashLight /> Clear accomplished
          </Button>
        </ButtonGroup>
      </Flex>

      <CheckboxGroup>
        <Flex gap={4} wrap='wrap'>
          {items[todoFilter].map((item, itemIdx) => (
            <CheckboxCard.Root
              key={item.id}
              checked={item.accomplished}
              onCheckedChange={() => handleTodo({ ...item, accomplished: !item.accomplished })}
              colorPalette={item.accomplished ? 'green' : 'gray'}
              minW='320px'
            >
              <CheckboxCard.HiddenInput />

              <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>{`${itemIdx + 1}. ${item.title}`}</CheckboxCard.Label>

                  <CheckboxCard.Description>{item.description}</CheckboxCard.Description>
                </CheckboxCard.Content>

                <CheckboxCard.Indicator />
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          ))}
        </Flex>
      </CheckboxGroup>
    </Stack>
  );
};

export { TodoList };
