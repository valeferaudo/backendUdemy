const express = require ('express');
const router = express.Router();
const uploadCtrl = require ("../controllers/upload.controller")
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.put('/:tabla/:id', validarJWT,uploadCtrl.fileUpload);
router.get('/:tabla/:img',validarJWT,uploadCtrl.getFoto)

module.exports=router;