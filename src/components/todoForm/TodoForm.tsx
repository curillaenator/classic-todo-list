import React, { FC } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { Stack, Box, Field, Input, Button, Group } from '@chakra-ui/react';

import { TodoList } from '@src/components/todoList';

interface TodoFormFields {
  title: string;
}

const TodoForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      //  dirtyFields
    },
  } = useForm<TodoFormFields>({ defaultValues: { title: '' } });

  return (
    <Stack
      h='100%'
      as='form'
      onSubmit={handleSubmit(({ title }) => {
        console.log('title', title);
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
