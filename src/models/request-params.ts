export default class RequestParams {
    constructor(
        public url: string,
        public data: any,
        public done: Function
    ) {}
};

