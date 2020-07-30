const Medico = require ('../models/medico.model');
const {request, response} = require('express');
const medicoCtrl ={};

medicoCtrl.getMedicos = async (req,res)=>{
    const medicos = await Medico.find({},'nombre usuario hospital imagen')
                            .populate('usuario','nombre')
                            .populate('hospital','nombre')
    res.json({
        ok:true,
        medicos
    })
};
medicoCtrl.createMedico = async (req,res)=>{
    const medico = new Medico(req.body);
    const uid = req.uid;
    medico.usuario =uid;
    try {

        await medico.save();
        res.json({
            ok:true,
            msg:'Medico creado'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
};
medicoCtrl.updateMedico = async (req,res)=>{
    res.json({
        hola:'hola update'
    })
};
medicoCtrl.deleteMedico = async (req,res)=>{
    res.json({
        hola:'hola delte'
    })
}

module.exports = medicoCtrl;