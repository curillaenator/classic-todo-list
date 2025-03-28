import { createStore, createEvent } from 'effector';

import type { TodoItemProps } from './interfaces';

const createTodo = createEvent<TodoItemProps>();
const handleTodo = createEvent<TodoItemProps>();

const $todosStore = createStore<TodoItemProps[]>([]);

$todosStore
  .on(createTodo, (prev, todoItem) => [todoItem, ...prev])
  .on(handleTodo, (prev, todoItem) => prev.map((stateItem) => (stateItem.id === todoItem.id ? todoItem : stateItem)));

export { $todosStore, createTodo, handleTodo };
