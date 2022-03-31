const express = require('express');
const router = express.Router();

const userActions = require('../actions/userActions.js');

//pobieranie wszystkich uzytkownikow
router.get('/users', userActions.getAllUsers);
// pobieranie jednego uzytkownika
router.get('/users/:id', userActions.getUser);
//zapisywanie nowego uzytkownika
router.post('/users', userActions.addUser);
//edytowanie uzytkownika
router.put('/users/:id', userActions.updateUser);

module.exports = router;
