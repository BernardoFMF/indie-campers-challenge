insert into route_(name_, description_, start_location_, end_location_)
	values ('course 1', 'this is course 1', 'Lisbon', 'Porto'), ('course 2', 'this is course 2', 'Lisbon', 'Braga');
	
insert into landmark_(name_, description_, longitude_, latitude_)
	values ('landmark 1', 'this is landmark 1', -1.7297222222222221, 53.32055555555556), ('landmark 2', 'this is landmark 2', 12, 13);
	
insert into route_landmark_ (route_id_, landmark_id_, highlight_)
	values (1, 1, true), (1, 2, false);
	


select * from route_;

select * from landmark_;

select * from route_landmark_;

select * 
from route_landmark_ rl join landmark_ l on rl.landmark_id_ = l.id_
where rl.route_id_ = any(array[1]);

select l.name_, calculate_distance(53.31861111111111, -1.6997222222222223, l.latitude_, l.longitude_) as distance
from landmark_ l
order by calculate_distance(53.31861111111111, -1.6997222222222223, l.latitude_, l.longitude_)
limit 1;

select r.id_, r.name_, r.description_, l.id_ as landmark_id_, l.name_ 
from Route_ r left join Route_Landmark_ rl on r.id_ = rl.route_id_ left join Landmark_ l on rl.landmark_id_ = l.id_
where rl.route_id_ = 2 and rl.highlight_ = true;

select r.id_, l.id_ as landmark_id_, l.name_ 
from Route_ r left outer join Route_Landmark_ rl on r.id_ = rl.route_id_ left outer join Landmark_ l on rl.landmark_id_ = l.id_;

select r.id_, l.id_, l.name_ from Route_ r join Route_Landmark_ rl on r.id_ = rl.route_id_ join Landmark_ l on rl.landmark_id_ = l.id_ where rl.highlight_ = true;