import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import helmet from "helmet";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database.config";
import errorHandler from "./middlewares/error.middleware";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
/**
 * Prepared to be consumed by client if necessary
 * By default the client will be running on localhost:3000
 */
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);
app.use(helmet());

// Routes


app.use(errorHandler);

const server = app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    await connectToDatabase();
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        server.close();
        await disconnectFromDatabase();
        process.exit(0);
    });
}
  
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i]);
}