import { client } from "./client.js";
export const handleLogic = {
    getAPIKey: async function (query = {}) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");

        const queryString = new URLSearchParams(query).toString();
        const { data } = await client.get(`/api-key?${queryString}`);
        if (data.status_code === "SUCCESS") {
            const apiKey = data.data.apiKey;
            localStorage.setItem("apiKey", apiKey);
        }
        loading.classList.add("hide");
        return data;
    },

    getListTodo: async function () {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");

        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.get(`/todos`, apiKey);
        loading.classList.add("hide");

        return data;
    },

    postTodo: async function (body) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");
        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.post(`/todos`, body, apiKey);
        loading.classList.add("hide");

        return data;
    },

    updateTodo: async function (id, body) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");
        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.patch(`/todos/${id}`, body, apiKey);
        loading.classList.add("hide");

        return data;
    },

    deleteTodo: async function (id) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");
        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.delete(`/todos/${id}`, apiKey);
        loading.classList.add("hide");
        return data;
    },

    searchTodo: async function (query = {}, apiKey) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hide");

        const queryString = new URLSearchParams(query).toString();
        const { data } = await client.get(`/todos?${queryString}`, apiKey);

        loading.classList.add("hide");
        return data;
    },
};
