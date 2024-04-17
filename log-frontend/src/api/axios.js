//Setup axios for to handle requests to node backend
//axios provides xsrf(cross-site request forgery) protection hence why it'll be used over fetch

import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';

export default axios.create({
    baseURL: BASE_URL
    
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});