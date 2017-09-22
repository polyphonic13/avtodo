import axios, {AxiosResponse} from 'axios';

import RequestParams from '../models/request-params';

export class Requestor {

  static url: string;
  
  static get(params: RequestParams): void {
    let data = params.data || {};
    let url = params.url || this.url;
    
    if(!url) {
      return;
    }

    axios
      .get(url, data)
      .then((response: AxiosResponse) => {
        params.done(null, response);
      })
      .catch(error => {
        params.done(error, null);
      });

  }

  static post(params: RequestParams): void {
    let url = params.url || this.url;
    
    if(!url || !params.data) {
      return;
    }

    let data = params.data;

    axios
      .post(url, data)
      .then((response: AxiosResponse) => {
        params.done(null, response);
      })
      .catch(error => {
        params.done(error, null);
      });
    
  }
};
