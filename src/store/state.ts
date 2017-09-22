import { TodoState } from './todo/todo-state';
import { TodoLabelState } from './todo-label/todo-label-state';

export interface State {
    todo: TodoState;
    label: TodoLabelState
};