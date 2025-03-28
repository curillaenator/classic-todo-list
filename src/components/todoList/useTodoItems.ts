import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUnit } from 'effector-react';

import { $todosStore, setFullTodoList, type TodoItemProps } from '@src/entities/todo';
import type { TodoFilter } from './interfaces';

const useTodoItems = () => {
  useEffect(() => {
    const storedList = sessionStorage.getItem('todoList');

    if (!!storedList) {
      setFullTodoList(JSON.parse(storedList) as TodoItemProps[]);
    }
  }, []);

  const all = useUnit($todosStore);
  const [todoFilter, setTodoFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    sessionStorage.setItem('todoList', JSON.stringify(all));
  }, [all, todoFilter]);

  const items: Record<TodoFilter, TodoItemProps[]> = useMemo(() => {
    const accomplished: TodoItemProps[] = [];
    const open: TodoItemProps[] = [];

    all.forEach((todo) => {
      if (todo.accomplished) {
        accomplished.push(todo);
      } else {
        open.push(todo);
      }
    });

    return { all, accomplished, open };
  }, [all]);

  const clearAcomplished = useCallback(() => setFullTodoList(items.open), [items]);

  return {
    items,

    todoFilter,
    setTodoFilter,

    clearAcomplished,
  };
};

export { useTodoItems };
