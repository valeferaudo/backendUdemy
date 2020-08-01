const express = require ('express');
const router = express.Router();
const hospitalCtrl = require ("../controllers/hospital.controller")
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT} = require('../middlewares/validar-jwt')


router.get('/',validarJWT,hospitalCtrl.getHospitales);
router.post('/',[validarJWT,
                check('nombre','El nombre es obligatotio').not().isEmpty(),
                validarCampos],hospitalCtrl.createHospital);
router.put('/:id',[validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    validarCampos], hospitalCtrl.updateHospital);
router.delete('/:id',validarJWT,hospitalCtrl.deleteHospital)


module.exports = router;