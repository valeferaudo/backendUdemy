const Usuario = require ('../models/usuario.model');
const {request, response} = require('express');
const authCtrl ={};
const bycript = require('bcryptjs');
const {generarJWT} = require ('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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

authCtrl.googleLogin = async (req = request,res= response)=>{
    const googleToken = req.body.token;
    try {
        
        const {name,email,picture} = await googleVerify(googleToken);
        //Verificar que extista un usuario con el email de google
        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){
            usuario = new Usuario({
                nombre:name,
                email: email,
                //se le pone esto a la password porq es requerido, pero no es q el usuario puede entrar por esa psw
                password: '@@@',
                imagen: picture,
                google :true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            //aca la pasword pasa lo mismo, y ahora la persona solo se  puede autenticar con google ( si no se le cambia la persona puede tambien auntenticarse normalmente con su psw)
            //usuario.password = '@@@'
        }
        //guardar el usaurio en bd
        await usuario.save();
        //GENERAR JWT
        const token =  await generarJWT(usuario.id)
        res.json({
            ok:true,
            msg:'Google SignIn',
            token,
            name,
            picture
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:'Token no es correcto'
        })
    }
}

authCtrl.renewToken = async (req,res)=>{
    const uid = req.uid;


    //GENERAR JWT
    const token =  await generarJWT(uid)
    
    res.json({
        ok:true,
        uid,
        token: token
    })
}

module.exports = authCtrl;