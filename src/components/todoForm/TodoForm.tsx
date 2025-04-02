import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Field, InputGroup, Input, Button, Textarea } from '@chakra-ui/react';
import { v4 as getId } from 'uuid';

import { createTodo } from '@src/entities/todo';

import { PiJarLabelDuotone } from 'react-icons/pi';

interface TodoFormFields {
  title: string;
  description: string;
}

const TodoForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormFields>();

  return (
    <Stack
      as='form'
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      onSubmit={handleSubmit(({ title, description }) => {
        createTodo({
          id: getId(),
          title,
          description,
          createdAt: Date.now(),
          accomplished: false,
        });

        reset();
      })}
    >
      <Stack padding={6} borderRadius={8} boxShadow='inset 0 0 0 1px var(--chakra-colors-border)'>
        <Field.Root invalid={!!errors.title}>
          <InputGroup startElement={<PiJarLabelDuotone />}>
            <Input
              placeholder='Name of what need to be done'
              aria-required
              type='text'
              {...register('title', {
                required: 'Set title',
                minLength: { value: 1, message: 'must be at least 1 characters' },
                maxLength: { value: 128, message: 'no more than 128 chars' },
              })}
            />
          </InputGroup>

          {errors.title?.message && <Field.ErrorText>{errors.title.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.description}>
          <Textarea
            placeholder='Description'
            variant='subtle'
            aria-required
            {...register('description', {
              required: 'Set description',
              minLength: { value: 1, message: 'must be at least 1 characters' },
              maxLength: { value: 256, message: 'no more than 256 chars' },
            })}
          />

          {errors.description?.message && <Field.ErrorText>{errors.description.message}</Field.ErrorText>}
        </Field.Root>

        <Button bg='bg.subtle' variant='outline' type='submit'>
          Create TODO
        </Button>
      </Stack>
    </Stack>
  );
};

export { TodoForm };
