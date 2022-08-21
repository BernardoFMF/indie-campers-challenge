insert into route_(name_, description_, start_location_, end_location_)
	values ('course 1', 'this is course 1', 'Lisbon', 'Porto'), ('course 2', 'this is course 2', 'Lisbon', 'Braga');
	
insert into landmark_(name_, description_, longitude_, latitude_)
	values ('landmark 1', 'this is landmark 1', -1.7297222222222221, 53.32055555555556), ('landmark 2', 'this is landmark 2', 12, 13);
	
insert into route_landmark_ (route_id_, landmark_id_, highlight_)
	values (1, 1, true), (1, 2, false);