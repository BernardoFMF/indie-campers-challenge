import { Pool, PoolClient } from "pg";

export type TransactionHandler = (client: PoolClient) => Promise<any>;

const DB_CONNECTION_STRING = "postgres://postgres:postgres@localhost:5432/indie-campers"

let connector: Pool;

export async function connectToDatabase() {
    if (!DB_CONNECTION_STRING) process.exit(1);
    try {
        connector = new Pool({
            connectionString: DB_CONNECTION_STRING
        })
        console.log("CONNECTOR -> " + connector)
    } catch (e) {
        console.log("ERROR -> " + e)
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
        throw e;
    } finally {
        client.release();
    }
}