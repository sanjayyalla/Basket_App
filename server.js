
const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');
app.use(express())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
dotEnv.config({ path: './config/config.env' });
app.use(express.urlencoded({ extended: false }));
app.get('/', (request, response) => {
    response.send(`<h2>Welcome to BigBasket Express Server</h2>`);
});
mongoose.connect(process.env.MONGO_DB_LOCAL_URL)
    .then((response) => {
        console.log(`Connected to Mongo DB Successfully...........`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 4000
app.use('/api', require('./router/apiRouter'));
app.listen(port, hostname, () => {
    console.log(`Express Server is Started at http://${hostname}:${port}`);
});