const express = require ('express');
const router = express.Router();
const usuarioCtrl = require ("../controllers/usuario.controller")
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT,usuarioCtrl.getUsuarios);
router.post('/',[check('nombre','El nombre es obligatorio').not().isEmpty(),
                check('password','El password es obligatorio').not().isEmpty(),
                check('email','El Mail es obligatorio').isEmail(),
                validarCampos] ,usuarioCtrl.createUsuario);
router.put('/:id',[validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('role','El role es obligatorio').not().isEmpty(),
                    check('email','El Mail es obligatorio').isEmail(),
                     validarCampos,], usuarioCtrl.updateUsuario);
router.delete('/:id',validarJWT,usuarioCtrl.deleteUsuario)



module.exports = router;