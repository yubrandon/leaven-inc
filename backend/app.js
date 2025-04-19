const express = require("express");
const apiRouter = require("./routes/apiRouter");
require("dotenv").config();

const app = express();
//app.use(cors());

app.use("/api", apiRouter);
//API fetch can append response.status to json object when fetching - json['status'] = response.status
app.get("/{*any}", (req, res) => res.status(404).json({message : 'resource not found!'}));

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});