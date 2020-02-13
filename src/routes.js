import { Router } from 'express';
import StudentsControllers from './app/controllers/StudentsControllers';
import SessionsControllers from './app/controllers/SessionsControllers';
import auth from './app/middlewares/auth';

const routers = new Router();

routers.post('/sessions', SessionsControllers.store);

routers.use(auth);

routers.post('/students', StudentsControllers.store);
routers.put('/students/:id', StudentsControllers.update);
routers.get('/students', StudentsControllers.all);

export default routers;
