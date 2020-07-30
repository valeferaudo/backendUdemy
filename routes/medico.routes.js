const express = require ('express');
const router = express.Router();
const medicoCtrl = require ("../controllers/medico.controller")
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT} = require('../middlewares/validar-jwt')


router.get('/',validarJWT,medicoCtrl.getMedicos);
router.post('/',[validarJWT,
                check('nombre','El nombre es obligatotio').not().isEmpty(),
                check('hospital','El hospital id debe ser valido').isMongoId(),
                validarCampos],medicoCtrl.createMedico);
router.put('/:id',[], medicoCtrl.updateMedico);
router.delete('/:id',medicoCtrl.deleteMedico)


module.exports = router;