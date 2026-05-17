import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9000/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

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

export { get, post, put, del }