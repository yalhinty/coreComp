
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
	city Text NOT NULL,
	name Text NOT NULL,
	state Text NOT NULL,
	zip serial NOT NULL,
	type Text NOT NULL,
	dollars Text NOT NULL,
	PRIMARY KEY (city)
);

INSERT INTO restaurants (city, name, state, zip, type, dollars) VALUES ('Santa Cruz','La Posta de Mesilla', 'CA', 95062, 'Italian, pizza', '$$$');
//INSERT INTO workshops (attendee, workshop) VALUES ('Brayden Doe','Docker Container Fundamentals');
//INSERT INTO workshops (attendee, workshop) VALUES ('Parker Drover','Machine Learning');
//INSERT INTO workshops (attendee, workshop) VALUES ('Sophie Fisher','MongoDB');
//INSERT INTO workshops (attendee, workshop) VALUES ('Alec Spencer','React Fundamentals');

