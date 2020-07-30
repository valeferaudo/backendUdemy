const Usuario = require ('../models/usuario.model');
const {request, response} = require('express');
const usuarioCtrl ={};
const bycript = require('bcryptjs');
const {generarJWT} = require ('../helpers/jwt')


usuarioCtrl.getUsuarios = async (req,res)=>{
    
    const desde = Number(req.query.desde) || 0;
    const[usuarios, total] = await Promise.all([
                    Usuario.find({},'nombre email role google imagen')
                            .skip(desde)
                            .limit(5) ,
                    Usuario.count()
    ]);
    res.json({
        ok:true,
        usuarios: usuarios,
        total: total
    })
}

usuarioCtrl.createUsuario = async (req,res = response)=>{
    const {email,password} = req.body;
    try {
        const existeMail = await Usuario.findOne({email});
        if(existeMail){
            return res.status(400).json({
                ok:false,
                msg:"Ya existe el mail"
            })
        }
        
        const usuario = new Usuario(req.body);
        const salt = bycript.genSaltSync();
        usuario.password = bycript.hashSync(password,salt);
        await usuario.save();
        //GENERAR JWT
        const token =  await generarJWT(usuario.id)
        res.json({
            status:'Usuario creado',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }

}

usuarioCtrl.updateUsuario = async (req = request, res = response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario'
            });
        }
        const campos = req.body;
        if(req.body.email === usuarioDB.email){
            delete campos.email;
        }else{
            const existeMail = await Usuario.findOne({email:req.body.email});
            if(existeMail){
            return res.status(400).json({
                ok:false,
                msg:"Ya existe el mail"
            })
        }
        }
        delete campos.password;
        delete campos.google;

        const usuario = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        res.json({
            status:"Usuario Updated",
            usuario
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
}

usuarioCtrl.deleteUsuario = async (req,res) =>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = usuarioCtrl;