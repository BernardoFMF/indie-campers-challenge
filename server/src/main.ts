import express from "express";
import helmet from "helmet";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database.config";
import route from "./modules/route/route.route";
import landmark from "./modules/landmark/landmark.route";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(helmet());

// Routes
app.use("/api/routes", route);
app.use("/api/landmarks", landmark);

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