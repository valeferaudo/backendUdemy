const Hospital = require ('../models/hospital.model');
const {request, response} = require('express');
const hospitalCtrl ={};

hospitalCtrl.getHospitales = async (req,res)=>{
    const hospitales = await Hospital.find({},'nombre usuario imagen')
                                    .populate('usuario','nombre email')
    res.json({
        ok:true,
        hospitales
    })
};
hospitalCtrl.createHospital = async (req,res)=>{
    const hospital = new Hospital(req.body);
    const uid = req.uid;
    hospital.usuario =uid;
    try {

        await hospital.save();
        res.json({
            ok:true,
            msg:'Hospital creado'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
};
hospitalCtrl.updateHospital = async (req,res)=>{
    res.json({
        hola:'hola update'
    })
};
hospitalCtrl.deleteHospital = async (req,res)=>{
    res.json({
        hola:'hola delte'
    })
}

module.exports = hospitalCtrl;