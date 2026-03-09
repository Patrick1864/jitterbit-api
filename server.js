const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// conexão MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ordersdb")
.then(()=> console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.use("/", routes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});