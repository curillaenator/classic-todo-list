import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Stack, Box, Field, Input, Button, Group } from '@chakra-ui/react';
import { v4 as getId } from 'uuid';

import { createTodo } from '@src/entities/todo';
import { TodoList } from '@src/components/todoList';

const TodoForm: FC = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  return (
    <Stack
      h='100%'
      as='form'
      onSubmit={handleSubmit(({ title }) => {
        createTodo({ id: getId(), title, createdAt: Date.now(), accomplished: false });
        reset({ title: '' });
      })}
    >
      <Box padding={6} borderRadius={8} boxShadow='inset 0 0 0 1px var(--chakra-colors-border)'>
        <Controller
          control={control}
          name='title'
          rules={{
            required: 'Set title',
            minLength: { value: 3, message: 'must be at least 3 characters' },
            maxLength: { value: 128, message: 'no more than 128 chars' },
          }}
          render={({ field }) => (
            <Field.Root invalid={!!errors.title}>
              <Group attached w='full'>
                <Input {...field} placeholder='what need to be done' aria-required type='text' />

                <Button bg='bg.subtle' variant='outline' type='submit'>
                  Submit
                </Button>
              </Group>

              {errors.title?.message && <Field.ErrorText>{errors.title.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />
      </Box>

      <Box flex='1 1 auto' padding={6} borderRadius={8} boxShadow='inset 0 0 0 1px var(--chakra-colors-border)'>
        <TodoList />
      </Box>
    </Stack>
  );
};

export { TodoForm };
