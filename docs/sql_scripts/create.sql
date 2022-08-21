create table Route_ (
	id_ 			int generated always as identity,
	name_ 			varchar(40),
	description_	text,
	start_location_	text,
	end_location_	text,
	
	primary key (id_)
);

create table Landmark_ (
	id_ 			int generated always as identity,
	name_ 			varchar(40),
	description_	text,
	longitude_		numeric,
	latitude_		numeric,
	
	primary key(id_)
);

create table Route_Landmark_ (
	route_id_		int,
	landmark_id_	int,
	highlight_		bool default false,
	
	primary key (route_id_, landmark_id_),
	constraint fk_route foreign key(route_id_) references Route_(id_),
	constraint fk_landmark foreign key(landmark_id_) references Landmark_(id_)
);
