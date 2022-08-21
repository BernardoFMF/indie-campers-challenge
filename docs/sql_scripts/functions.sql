/**
 * Utilizes the haversine formula
 * 6371 corresponds to the radius of earth in kilometers
 */
create or replace function calculate_distance(lat1 float, lon1 float, lat2 numeric, lon2 numeric)
returns double precision as
$body$
	select 6371 * acos( cos( radians(lat1) ) * cos( radians(lat2) ) * cos( radians(lon1) - radians(lon2) ) + sin( radians(lat1) ) * sin( radians(lat2) ) ) as distance
$body$
language sql;