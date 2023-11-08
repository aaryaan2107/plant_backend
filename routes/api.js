

const express = require("express");
const getplant = require('../controllers/data');
const apiRoutes = express.Router();

apiRoutes.use("/data", getplant);

module.exports = apiRoutes;