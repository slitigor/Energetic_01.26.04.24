import axios from "axios";

export const appDataBase = axios.create({ baseURL: "http://localhost:8080/" });
