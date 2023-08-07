import axios from "./customizeAxios";

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
};

const fetchAddNewUser = (name, job) => {
    return axios.post("/api/users", { name, job });
};

const putUpdateUser = (name, job) => {
    return axios.put("/api/users/2", { name, job });
};

const deleteUser = (id) => {
    return axios.delete(`/api/users/2${id}`);
};

const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

export { fetchAllUsers, fetchAddNewUser, putUpdateUser, deleteUser, loginApi };
