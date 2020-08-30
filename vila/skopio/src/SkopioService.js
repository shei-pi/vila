import axios from 'axios';
const API_URL = 'http://192.168.1.44:8000';


export default class SkopioService{

    constructor(){}


    getDevicesData() {
        const url = `${API_URL}/ambiente/device_data/`;
        return axios.get(url).then(response => response.data);
    }
    getDevicesDataByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    // getCustomer(pk) {
    //     const url = `${API_URL}/api/customers/${pk}`;
    //     return axios.get(url).then(response => response.data);
    // }
    // deleteCustomer(customer){
    //     const url = `${API_URL}/api/customers/${customer.pk}`;
    //     return axios.delete(url);
    // }
    // createCustomer(customer){
    //     const url = `${API_URL}/api/customers/`;
    //     return axios.post(url,customer);
    // }
    // updateCustomer(customer){
    //     const url = `${API_URL}/api/customers/${customer.pk}`;
    //     return axios.put(url,customer);
    // }
}

