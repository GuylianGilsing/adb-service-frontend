import axios from "axios";

const baseURL = `${process.env['VUE_APP_BACKEND_URL']}`;

// Creates a pre-configured axios object with a base URL and some standard request headers
// For more information: https://github.com/axios/axios
export default axios.create({
    baseURL,
    headers: {
        mode: 'cors',
        'Content-Type': 'application/json'
    }
});
