import { executeQuery, TransactionHandler } from "../../utils/database.config"
import { Route } from "./route.model";

export async function findRoutesByLocation(start_location_: Route["start_location_"], end_location_: Route["end_location_"]) {
    const handler: TransactionHandler = async (client) => {
        const query = "select r.id_, r.name_, r.description_, l.id_ as landmark_id_, l.name_ as landmark_name_ " + 
        "from Route_ r left join Route_Landmark_ rl on r.id_ = rl.route_id_ left join Landmark_ l on rl.landmark_id_ = l.id_ " + 
        "where r.start_location_ = $1 and r.end_location_ = $2;"

        const routesResult = await client.query(query, [start_location_, end_location_]);
        let { rows } = routesResult;
        return rows;
    }

    let rows: Array<any> = await executeQuery(handler, false);
    rows = rows.reduce((prev, curr) => {  
        const idx = prev.length != 0 ? prev.findIndex((elem: any) => elem.id_ == curr.id_) : -1;

        if (idx != -1 && curr.landmark_id_ != null) {
            const highlight = {
                id_: curr.landmark_id_,
                name_: curr.landmark_name_
            };
            prev[idx].highlights.push(highlight);
        } else {
            const route = {
                id_: curr.id_,
                name_: curr.name_,
                description_: curr.description_,
                highlights: []
            };
            prev.push(route);
        }
        return prev;
    }, [])

    const formattedRoutes = {
        start_location_,
        end_location_,
        routes_: rows
    }

    return formattedRoutes;
}

export async function findRouteById(id_: Route["id_"]) {
    const handler: TransactionHandler = async (client) => {
        const queryRoute = "select r.id_, r.name_, r.description_ " + 
        "from Route_ r " + 
        "where r.id_ = $1;"
        const queryLandmarks = "select l.id_, l.name_, l.description_, rl.highlight_ " + 
        "from Route_Landmark_ rl join Landmark_ l on rl.landmark_id_ = l.id_ " + 
        "where rl.route_id_ = $1;"

        const routeResult = await client.query(queryRoute, [id_]);
        const landmarksResult = await client.query(queryLandmarks, [id_]);
        const { rows } = routeResult;
        let route = rows[0];
        if (!route) return null;
        route.landmarks_ = landmarksResult.rows;

        return route;
    }

    return await executeQuery(handler, false);
}