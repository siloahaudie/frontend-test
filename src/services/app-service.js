import Request from './request';

const baseURL = '/api/v1/';

const AppService = {
    add: async (title) => {
        return await Request( baseURL + 'counter', 'POST', { title: title } );
    },
    get: async () => {
        return await Request( baseURL + 'counters' );
    },
    increment: async (id) => {
        return await Request( baseURL + 'counter/inc', 'POST', { id: id } );
    },
    decrement: async (id) => {
        return await Request( baseURL + 'counter/dec', 'POST', { id: id } );
    },
    delete: async (id) => {
        return await Request( baseURL + 'counter', 'DELETE', { id: id } );
    },
}

export default AppService;
