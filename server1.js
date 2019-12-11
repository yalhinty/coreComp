const express = require("express");
const bodyParser = require("body-parser");
const app = express()

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "postgres",
	password: "Yessie97",
	database: "postgres"
};

const pool = new Pool(config);

app.post("/restaurant", async (req, res) => {
	const name = req.body.name;
	const city = req.body.city;
	const state = req.body.state;
	const zip = req.body.zip;
	const type = req.body.type;
	const dollars = req.body.dollars;

	try {
		const template = "SELECT * FROM restaurants WHERE name = $1 AND city = $2 AND state = $3 AND zip = $4 AND type = $5 AND dollars = $6";
		const response = await pool.query(template, [
			name,
			city, 
			state, 
			zip, 
			type,
			dollars
		]);
	if (response.rowCount == 0) {
		const template = "INSERT INTO restaurants(name, city, state, zip, type, dollars) VALUES ($1, $2, $3, $4, $5, $6)";
		const response = await pool.query(template, [ name,city, state, zip, type, dollars ]);
		res.json({city: city, name: name, state:state, zip:zip, type:type, dollars:dollars});
	} else {
		res.json({error: "city already enrolled"});
		}
	} catch (err) {
		console.error("Error running query " + err);
		res.json({error: "Error in post"});
		      }
			
	});


app.get("/restaurant", async (req, res) => {
	try {
	  if (req.query.name) {
	
		const template = "SELECT * FROM restaurants WHERE name = $1";
		const response = await pool.query(template, [req.query.name]);
	
		if (response.rowCount == 0) {
			res.json({ status: "not found", searchTerm: req.query.name });
		} else {
			const restaurants = response.rows.map(function(item) {
			return item.name;
		});
			res.json({ status: "ok", attendees: workshops.rows[0] });


//			res.json({attendees: workshops.row[0] });
		}
	} else {
		console.log("In the else")
		const template = "SELECT distinct name FROM restaurants";
		const response = await pool.query(template);
		res.json({name: response.rows[0] });
		console.log("end of else")}
	} catch (err) {
		console.error("Error running query " + err);
		res.json({ status: "error in get" });
	}
});
	app.listen(app.get("port"), () => {
        console.log("running")
});
