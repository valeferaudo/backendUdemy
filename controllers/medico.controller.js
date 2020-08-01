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
    const id = req.params.id;
    const uid = req.uid
    try {
        const medicoBD = await Medico.findById(id);
        if(!medicoBD){
            return res.status(404).json({
                ok:false,
                msg:'No existe Medico'
            });
        }
        const cambiosMedico = {
            ... req.body,
            usuario : uid
        }    
        const medico = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});
        res.json({
            ok:true,
            msg:"Medico Updated",
            medico
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
};
medicoCtrl.deleteMedico = async (req,res)=>{
    const id = req.params.id;
    try {
        const medicoBD = await Medico.findById(id);
        if(!medicoBD){
            return res.status(404).json({
                ok:false,
                msg:'No existe Medico'
            });
        }
        await Medico.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg: 'Medico eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = medicoCtrl;