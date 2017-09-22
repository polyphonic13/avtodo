export interface Service {
    get(url: string, done: Function);
    post(url: string, payload: any, done: Function); 
    put(url: string, id: string, payload: any, done: Function);
    delete(url: string, id: string, done: Function);
};

