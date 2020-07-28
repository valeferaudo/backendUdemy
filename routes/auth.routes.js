const express = require ('express');
const router = express.Router();
const authCtrl = require ("../controllers/auth.controller")
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos")



router.post('/',[check('email','EL email es obligatorio').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                validarCampos],authCtrl.login)


module.exports = router;