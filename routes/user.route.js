var express = require('express');
var router = express.Router(); //use object Router
var userController = require('../controller/user.controller');
var db = require('../db');
var validate = require('../validate/user.validate');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get('/', userController.index);

router.get('/search', userController.search)

router.get('/create', userController.create);

router.get('/:id', userController.id);

router.post('/create',
    upload.single('avatar'),
    validate.validatePostCreateUser,
    userController.postCreateUser);

module.exports = router;