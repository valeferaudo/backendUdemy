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
    const id = req.params.id;
    const uid = req.uid
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe Hospital'
            });
        }
        const cambiosHospital = {
            ... req.body,
            usuario : uid
        }
        
        const hospital = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});
        res.json({
            ok:true,
            msg:"Hospital Updated",
            hospital
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
};
hospitalCtrl.deleteHospital = async (req,res)=>{
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe Hospital'
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg: 'Hospital eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = hospitalCtrl;