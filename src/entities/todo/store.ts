import { createStore, createEvent } from 'effector';

import type { TodoItemProps } from './interfaces';

const setFullTodoList = createEvent<TodoItemProps[]>();
const createTodo = createEvent<TodoItemProps>();
const handleTodo = createEvent<TodoItemProps>();

const $todosStore = createStore<TodoItemProps[]>([]);

$todosStore
  .on(setFullTodoList, (_, store) => store)
  .on(createTodo, (prev, todoItem) => [todoItem, ...prev])
  .on(handleTodo, (prev, todoItem) => prev.map((stateItem) => (stateItem.id === todoItem.id ? todoItem : stateItem)));

export { $todosStore, createTodo, handleTodo, setFullTodoList };
