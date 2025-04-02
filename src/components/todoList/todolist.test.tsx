import { screen, fireEvent } from '@testing-library/react';
import render from '@src/tests';

import { TodoList } from './TodoList';
import { useTodoItems } from './useTodoItems';

jest.mock('./useTodoItems', () => ({
  useTodoItems: jest.fn(),
}));

describe('TodoList', () => {
  const mockSetTodoFilter = jest.fn();
  const mockClearAcomplished = jest.fn();

  beforeEach(() => {
    //@ts-expect-error
    useTodoItems.mockImplementation(() => ({
      items: {
        all: [
          { id: 1, title: 'Todo 1', description: 'Description 1', accomplished: false },
          { id: 2, title: 'Todo 2', description: 'Description 2', accomplished: true },
        ],
        open: [{ id: 1, title: 'Todo 1', description: 'Description 1', accomplished: false }],
        accomplished: [{ id: 2, title: 'Todo 2', description: 'Description 2', accomplished: true }],
      },
      todoFilter: 'all',
      setTodoFilter: mockSetTodoFilter,
      clearAcomplished: mockClearAcomplished,
    }));
  });

  test('renders form inputs and buttons', () => {
    render(<TodoList />);

    expect(screen.getByText('1 todos are open')).toBeInTheDocument();

    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('OPEN')).toBeInTheDocument();
    expect(screen.getByText('ACCOMPLISHED')).toBeInTheDocument();

    expect(screen.getByText('Clear accomplished')).toBeInTheDocument();
  });

  test('filters tasks by "open" and "accomplished"', () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText('OPEN'));
    expect(mockSetTodoFilter).toHaveBeenCalledWith('open');
  });

  test('calls clearAcomplished when "Clear accomplished" button is clicked', () => {
    render(<TodoList />);
    // Клик по кнопке "Clear accomplished"
    fireEvent.click(screen.getByText('Clear accomplished'));
    // Проверка, что метод clearAcomplished был вызван
    expect(mockClearAcomplished).toHaveBeenCalled();
  });
});
