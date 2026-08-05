import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9000/api/v1",
    timeout: 10000
})

api.defaults.withCredentials = true

api.interceptors.response.use(
    response=> response,
    error=> {
        if (error.response?.statue === 401) {
            window.dispatchEvent(new CustomEvent('unauthorized'));
        }
        return Promise.reject(error);
    }
)

const get = (endpoint) => {
    return api(endpoint, { method: "get" })
}

const post = (endpoint, data) => {
    return api(endpoint, { method: "post", data })
}

const put = (endpoint, data) => {
    return api(endpoint, { method: "put", data })
}

const del = (endpoint) => {
    return api(endpoint, { method: "delete" })
}

const patch = (endpoint) => {
    return api(endpoint, { method: "patch" })
}

export { get, post, put, del, patch }