import axios from "axios";

export const instance = axios.create({
    baseURL: "http://3.39.36.97:8080"
});