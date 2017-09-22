import { Vue } from 'av-ts';
import Vuex from 'vuex';
import todo from './todo/todo';
import todoLabel from './todo-label/todo-label';
import { State } from './state';

export const createStore = () => new Vuex.Store({
    modules: {
        todo,
        todoLabel
    }
});
