import axios, {AxiosResponse} from 'axios';

export class MockService {
    static get(url: string, done: Function) {
        done()
    }
    static post(url: string, payload: any, done: Function) {
        done()
    }
    static put(url: string, payload: any, done: Function) {
        done()
    }
    static delete(url: string, id: string, done: Function) {
        done()
    }
};