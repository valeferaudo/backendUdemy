const Usuario = require ('../models/usuario.model');
const {request, response} = require('express');
const authCtrl ={};
const bycript = require('bcryptjs');
const {generarJWT} = require ('../helpers/jwt')

authCtrl.login = async(req = request,res = response)=>{
    const { email, password} = req.body;
    try {
        const usuarioDB = await  Usuario.findOne({email});
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"Error de correo o contraseña"
            })
        }
        const validPassword = bycript.compareSync(password , usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:"Error de contraseña o password"
            })
        }
        //GENERAR JWT
        const token =  await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            msg:"Bienvenido",
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
}


module.exports = authCtrl;