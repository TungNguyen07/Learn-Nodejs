var express = require('express');
var multer = require('multer');

var userController = require('../controller/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router(); //use object Router

router.get('/', userController.index);

router.get('/search', userController.search)

router.get('/create', userController.create);

router.get('/:id', userController.id);

router.get('/logout', userController.logOut);

router.post('/create',
    upload.single('avatar'),
    validate.validatePostCreateUser,
    userController.postCreateUser);

module.exports = router;