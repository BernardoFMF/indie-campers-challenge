import { executeQuery, TransactionHandler } from "../../utils/database.config"
import { Landmark } from "./landmark.model";

export async function findClosestLandmark(latitude: Landmark["latitude_"], longitude: Landmark["longitude_"]) {
    const handler: TransactionHandler = async (client) => {
        const query = "select l.name_, l.id_, calculate_distance($1, $2, l.latitude_, l.longitude_) as distance_" + 
        " from landmark_ l " + 
        " order by calculate_distance($1, $2, l.latitude_, l.longitude_)" +
        " limit 1;"

        const routesResult = await client.query(query, [latitude, longitude]);
        
        let { rows } = routesResult;
        return rows[0];
    };

    let landmark: Landmark = await executeQuery(handler, false);
    return landmark;
}