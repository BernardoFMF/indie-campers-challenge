import { StatusCodes } from "http-status-codes";
import { Pool, PoolClient } from "pg";
import { StatusError } from "../middlewares/error.middleware";

export type TransactionHandler = (client: PoolClient) => Promise<any>;

const DB_CONNECTION_STRING = process.env.INDIE_DB_CONNECTION_STRING

let connector: Pool;

export async function connectToDatabase() {
    if (!DB_CONNECTION_STRING) process.exit(1);
    try {
        connector = new Pool({
            connectionString: DB_CONNECTION_STRING
        })
    } catch (e) {
        process.exit(1);
    }
}

export async function disconnectFromDatabase() {
    if (!connector) return;
    await connector.end();
}

export async function executeQuery(transactionHandler: TransactionHandler, needsCommit: boolean) {
    const client = await connector.connect();
    try {
        await client.query('Begin');
        const result = await transactionHandler(client);
        if (needsCommit) await client.query('Commit');
        return result;
    } catch(e) {
        await client.query('Rollback');
        throw new StatusError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error");
    } finally {
        client.release();
    }
}