export interface IConfig {
    socketUrl: string;
    dbUrl: string;
}

const config: IConfig = {
    socketUrl: `${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}`,
    dbUrl: `${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}`
};

export default config;
