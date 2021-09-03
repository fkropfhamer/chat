export const port = 9000;
export const env = process.env["NODE_ENV"];
export const isProduction = env === "production";

export const socketConfig = isProduction ? undefined : {
    cors: {
        origin: "http://localhost:1234",
        methods: ["GET", "POST"]
    }
};

export const backendUrl = isProduction ? '' : `http://localhost:${port}`
