const {request, response} = require('express');
const busquedaCtrl ={};
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


busquedaCtrl.getTodo = async (req = request,res = response)=>{
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const[usuarios,medicos,hospitales] = await Promise.all([
                    Usuario.find({nombre : regex}),
                    Hospital.find({nombre : regex}),
                    Medico.find({nombre : regex})
    ])


    res.json({
        ok:true,
        msg:'Funcionando getTodo',
        usuarios,
        medicos,
        hospitales
    })
}

busquedaCtrl.getPorCollection = async (req,res)=>{
    const busqueda = req.params.busqueda;
    const collection = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch(collection){
        case 'usuarios':
            data = await Usuario.find({nombre : regex})
            break;
        case 'medicos':
            data = await Medico.find({nombre : regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
            break;
        case 'hospitales':
            data = await Hospital.find({nombre : regex})
                                .populate('usuario','nombre img')
            break;   
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser medicos, usuarios u hospitales'
            }) 
        }

    res.json({
        ok:true,
        msg: `Buscando por ${collection}`,
        resultado: data
    })
}

module.exports = busquedaCtrl;