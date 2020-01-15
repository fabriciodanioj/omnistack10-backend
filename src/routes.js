import { Router } from 'express';

import CreateUserController from './app/controllers/CreateUserController';
import ListUserController from './app/controllers/ListUserController';
import SearchUserController from './app/controllers/SearchUserController';

const routes = new Router();

routes.post('/user/create', CreateUserController.store);
routes.get('/user/list', ListUserController.index);
routes.get('/user/search', SearchUserController.index);

export default routes;
