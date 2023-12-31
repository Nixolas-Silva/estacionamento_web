import express, { request, response } from 'express';
import { openDatabase } from './database.js';
import { listVehicles } from './controllers/vehiclesController.js';
import { insertVehicles } from './controllers/vehiclesController.js';
import { updateVehicles } from './controllers/vehiclesController.js';
import { removeVehicles } from './controllers/vehiclesController.js';
import { activityCheckin, activityCheckout, listActivities, removeActivity } from './controllers/activitiesController.js';
const app = express();

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");// dentro do '*' poderia ser qual site poderia fazer a requisiçao.

    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

    next();

})

app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    })
});

/* ENDPOINTS vehicles */
app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicles);
app.put('/api/vehicles/:id', updateVehicles);
app.delete('/api/vehicles/:id', removeVehicles);

/* ENDPOINTS Activities */
app.post('/api/activities/checkin', activityCheckin);
app.put('/api/activities/checkout', activityCheckout);
app.delete('/api/activities/:id', removeActivity);
app.get('/api/activities', listActivities);

/* Sinalizador on */
app.listen(8000, () => {
    console.log("Rodando o ESTACIONAMENTO...");
});
