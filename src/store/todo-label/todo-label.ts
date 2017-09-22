import { ActionContext, Store } from 'vuex';
import { State as RootState } from '../state';

import { TodoLabel } from '../../models/todo-label';
import { TodoLabelState } from './todo-label-state';

import * as Constants from '../../constants';
import * as MutationTypes from '../mutation-types';

import { Requestor } from '../../services/requestor';
import RequestParams from '../../models/request-params';

type TodoContext = ActionContext<TodoLabelState, RootState>;

export default {
    namespaced: true,
    state: {
        labels: Array<TodoLabel>(),
        serverStatus: ''
    },
    
    getters: {
        getTodoLabels(state: TodoLabelState) {
            return state.labels.map(label => label);
        },
        getServerStatus(state: TodoLabelState) {
            return state => state.serverStatus;
        }
    },
    
    actions: {
        [MutationTypes.REQUEST_LABELS]({ commit, state }) {
            let params: RequestParams = new RequestParams(
                Constants.TODO_LABELS_URL,
                {},
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, {});
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS, response.data);
                }
            )       
        },
        [MutationTypes.CREATE_LABEL]({ commit, state }, payload) {
            const previousTodoLabels = [...state.labels]
    
            let params: RequestParams = new RequestParams(
                Constants.TODO_LABELS_URL,
                payload,
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, { previousTodoLabels });
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS);
                }
            )
            Requestor.post(params);
        },
        [MutationTypes.UPDATE_LABEL]({ commit, state }, payload) {
            const previousTodoLabels = [...state.labels]
            
            let url: string = Constants.TODO_LABELS_URL + '/' + payload._id; 
    
            let params: RequestParams = new RequestParams(
                url,
                payload,
                (response) => {
                    if(response.err) {
                        return state.commit(MutationTypes.SERVER_ERROR, { previousTodoLabels });
                    }
                    return state.commit(MutationTypes.SERVER_SUCCESS);
                }
            )
            Requestor.post(params);
        }
    },
    
    mutations: {
        [MutationTypes.SERVER_SUCCESS](state, { labels }) {
            console.log('TodoLabelState/' + MutationTypes.SERVER_SUCCESS + ', labels = ', labels);
            if(labels) {
                state.labels = labels.map(label => label);
            }
            state.serverStatus = 'success';
        },
    
        [MutationTypes.SERVER_ERROR](state, { previousTodoLabels }) {
            if(!!previousTodoLabels) {
                state.labels = previousTodoLabels;
            }
            state.serverStatus = 'failed';
        }
    }
};