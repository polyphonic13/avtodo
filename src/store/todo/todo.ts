import { ActionContext, Store } from 'vuex';
import { State as RootState } from '../state';
import { TodoState } from './todo-state';
import { Todo } from '../../models/todo';

import * as Constants from '../../constants';
import * as MutationTypes from '../mutation-types';

import { Requestor } from '../../services/requestor';
import RequestParams from '../../models/request-params';

type TodoContext = ActionContext<TodoState, RootState>;

export default {
    namespaced: true,
    state: {
        todos: Array<Todo>(),
        serverStatus: ''
    },
    
    getters: {
        getTodos(state: TodoState) {
            return state.todos.map(todo => todo);
        },
        getServerStatus(state: TodoState) {
            return state => state.serverStatus;
        }
    },
    
    actions: {
        [MutationTypes.REQUEST_TODOS]({ commit, state }) {
            const params: RequestParams = new RequestParams(
                Constants.TODOS_URL,
                {},
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, {});
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS, response.data);
                }
            )       
        },
        [MutationTypes.CREATE_TODO]({ commit, state }, payload) {
            const previousTodos = [...state.todos]
    
            const params: RequestParams = new RequestParams(
                Constants.TODOS_URL,
                payload,
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, { previousTodos });
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS);
                }
            )
            Requestor.post(params);
        },
        [MutationTypes.UPDATE_TODO]({ commit, state }, payload) {
            const previousTodos = [...state.todos]
            
            const url: string = Constants.TODOS_URL + '/' + payload._id; 
    
            const params: RequestParams = new RequestParams(
                url,
                payload,
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, { previousTodos });
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS);
                }
            )
            Requestor.post(params);
        }
    },
    
    mutations: {
        [MutationTypes.SERVER_SUCCESS](state, { todos }) {
            console.log('TodoState/' + MutationTypes.SERVER_SUCCESS + ', todos = ', todos);
            if(todos) {
                state.todos = todos.map(todo => todo);
            }
            state.serverStatus = 'success';
        },
    
        [MutationTypes.SERVER_ERROR](state, { previousTodos }) {
            if(!!previousTodos) {
                state.todos = previousTodos;
            }
            state.serverStatus = 'failed';
        }
    }
};