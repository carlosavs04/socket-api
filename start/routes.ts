/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/animal', 'AnimalController.create')
  Route.get('/animales', 'AnimalController.allAnimales')
}).prefix('api/v1/animales')


Route.group(() => {
  Route.post('/jugador', 'JugadorController.create')
  Route.get('/jugadores', 'JugadorController.allJugadores')
}).prefix('api/v1/jugadores')

Route.group(() => {
  Route.post('/consola', 'ConsolasController.createConsola')
  Route.get('/consolas', 'ConsolasController.getConsolas')
  Route.get('/consolas/event', 'ConsolasController.eventSource')
}).prefix('api/v1/consolas')
