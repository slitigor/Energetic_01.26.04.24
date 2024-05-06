import axios from "axios";

export const appDB = axios.create({ baseURL: "http://localhost:3000" });
