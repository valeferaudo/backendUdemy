const express = require ('express');
const router = express.Router();
const busquedaCtrl = require ("../controllers/busqueda.controller")
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:busqueda', validarJWT,busquedaCtrl.getTodo);
router.get('/collection/:tabla/:busqueda', validarJWT,busquedaCtrl.getPorCollection);



module.exports=router;