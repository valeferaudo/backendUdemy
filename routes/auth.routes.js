const express = require ('express');
const router = express.Router();
const authCtrl = require ("../controllers/auth.controller")
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos")
const { validarJWT } = require ("../middlewares/validar-jwt")



router.post('/',[check('email','EL email es obligatorio').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                validarCampos],authCtrl.login);
router.post('/google',[check('token','EL token de google es obligatorio').not().isEmpty(),
                        validarCampos],authCtrl.googleLogin);
router.get('/renew',validarJWT,authCtrl.renewToken);


module.exports = router;