const express = require('express')
const app = express();
const helmet = require("helmet");
const cors = require('cors');
const  logger  = require('./logger');
const routes = require('./routes');
const { connectToDatabase } = require('./database');
// const { notFound, errorHandler } = require('./middlewares');
const port = 5000;




app.use(express.json());

app.use(helmet({
    strictTransportSecurity: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'self'"]
        }
    },
    permissionsPolicy: {
        features: {
            geolocation: ["'none'"],
            camera: ["'self'"],
            syncXhr: ["'none'"],
        }
    },
    noSniff: true,
    xFrameOptions: false,
    hidePoweredBy: true,
}));

app.use(cors());
app.use('/api', routes);
// app.use(notFound);
// app.use(errorHandler);




async function startServer() {
    await connectToDatabase();

    app.listen(port, async () => {
        logger.info(`Server listenning on port ${port}.`);
    });
};

module.exports = startServer;