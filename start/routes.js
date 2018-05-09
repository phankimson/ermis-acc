'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('/test', 'HomeController.test')
Route.get('/logout', 'HomeController.logout')
Route.get('/block', 'HomeController.block')
Route.get('/register', 'HomeController.register')
Route.post('/register', 'UserController.doRegister')
Route.group(() => {
Route.get('/index', 'HomeController.show')
Route.get('/', 'HomeController.show')
Route.get('/login', 'HomeController.login')
Route.post('/login', 'UserController.login')
Route.get('/block', 'HomeController.block')
}).prefix('manage').middleware(['per_com'])
