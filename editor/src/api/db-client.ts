import axios from "axios";
import config from "../config";

const dbclient = axios.create({
    baseURL: config.dbUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

export { dbclient };
