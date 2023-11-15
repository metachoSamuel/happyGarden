/**
 * Server for HappyGarden App
 * @author metachoSamuel
 *
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./src/utils/logger');
const { connectDatabase } = require('./src/config/configDb')

const app = express();
const port = process.env.PORT || 4000
const corsOptions = {
    origin: 'http://localhost:4200'
};


app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const ENGINE_DB = process.env.ENGINE_DB;

connectDatabase()

app.listen(port, () => {
    logger.info(`Server on http://localhost:${port}`);
});