const routes = require('express').Router();
const myController = require('../controllers');

const contactsController = require('../controllers/contacts');
routes.get('/', contactsController.getAll); 
routes.get('/:id', contactsController.getSingle);

module.exports = routes; 