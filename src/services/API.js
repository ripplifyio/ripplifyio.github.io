import axios from 'axios';


//const API_ROOT = 'http://localhost:5000';
//const API_ROOT = 'https://api.ripplify.io';
const API_ROOT = 'https://yhk6h4aex6.execute-api.us-east-1.amazonaws.com';

export const get = (endpoint, headers = {}) => {
    return axios
        .get(API_ROOT + '/' + endpoint, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                ...headers,
            },
        })
        .then((response) => response.data)
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                // Log out if token is unauthorized
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

export const post = (endpoint, data, headers = {}) => {
    return axios
        .post(API_ROOT + '/' + endpoint, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                ...headers,
            },
        })
        .then((response) => response.data)
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                // Log out if token is unauthorized
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

export const authorize = (spotifyToken) => {
    return axios
        .post(API_ROOT + '/authorize', { token: spotifyToken })
        .then((response) => response.data);
};

export const getUser = () => {

};

export const getHistoryFile = (id) => {
    return get('history_files/' + id);
};

export const getHistoryFiles = () => {
    return get('history_files');
};

export const uploadHistoryFile = (file) => {
    //let data = new FormData()
    //data.append('file', file);
    return post('history_files', file, {
        'Content-Type': 'application/zip',
    })
};

export const render = (options) => {
    return post('render', options);
};

export const getGraph = (graphId) => {
    return get('graphs/' + graphId);
};
