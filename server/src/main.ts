import express from "express";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database.config";
import route from "./modules/route/route.route";
import landmark from "./modules/landmark/landmark.route";
import errorHandler from "./middlewares/error.middleware";

const PORT = process.env.PORT || 4000;

const openapi = yaml.load(process.cwd() + '/src/openApi.yaml')

const app = express();

app.use(express.json());
// Cors setup if needed
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);
app.use(helmet());

// Routes
app.use("/api/routes", route);
app.use("/api/landmarks", landmark);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi))

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