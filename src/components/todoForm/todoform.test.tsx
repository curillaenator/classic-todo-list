import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import render from '@src/tests';

import { TodoForm } from './TodoForm';

import { createTodo } from '@src/entities/todo';

jest.mock('@src/entities/todo', () => ({
  createTodo: jest.fn(),
}));

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs and submit button', () => {
    render(<TodoForm />);

    expect(screen.getByPlaceholderText(/Name of what need to be done/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create TODO/i })).toBeInTheDocument();
  });

  it('shows validation errors when inputs are empty', async () => {
    render(<TodoForm />);

    fireEvent.click(screen.getByRole('button', { name: /Create TODO/i }));

    expect(await screen.findByText(/Set title/i)).toBeInTheDocument();
    expect(await screen.findByText(/Set description/i)).toBeInTheDocument();
  });

  it('submits form with valid data and resets fields', async () => {
    render(<TodoForm />);

    const titleInput = screen.getByPlaceholderText(/Name of what need to be done/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const submitButton = screen.getByRole('button', { name: /Create TODO/i });

    await userEvent.type(titleInput, 'Buy milk');
    await userEvent.type(descriptionInput, 'Get two liters of milk from the store');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createTodo).toHaveBeenCalledTimes(1);
      expect(createTodo).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Buy milk',
          description: 'Get two liters of milk from the store',
          accomplished: false,
        }),
      );
    });

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});
