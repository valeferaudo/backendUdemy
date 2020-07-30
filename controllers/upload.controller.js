const path = require('path');
const fs = require('fs');
const {request, response} = require('express');
const uploadCtrl ={};
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');

uploadCtrl.fileUpload = async (req = request,res=response)=>{
    const tipo = req.params.tabla;
    const id = req.params.id;
    //Validar tipos
    const tiposValidos = ['hospitales','usuarios','medicos'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'La colleccion ingresada debe ser medico,usuario u hospital'
        });
    }
    //Validar si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
      }
    //Procesar el archivo
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length-1].toLowerCase();
    //validar extencion
    const extencionesValidas = ['png','jpg','jpeg','gif'];
    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'La extencion del archivo no esta permitida'
        });
    }
    //generar nombre del archivo (se utiliza el uuid para q el nombre sea un id unico asi no hay sobreescripcion de archivos)
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;
    //Crear el path para guardar la imagen en cada carpeta segun el tipo
    const path =`./uploads/${tipo}/${nombreArchivo}`;
    //mover la imagen al path creado recien
    file.mv(path, (err)=> {
        if (err){
            console.log(err)
        
          return res.status(500).json({
              ok:false,
              msg: 'Error al subir el archivo   '
          })
        }

        actualizarImagen(tipo,id, nombreArchivo);

        res.json({
            ok: true,
            msg:'File upload',
            tipo,
            id
            })
    });
    
}

uploadCtrl.getFoto = (req,res = response)=>{
    const tipo = req.params.tabla;
    const img = req.params.img;

    const pathImagen = path.join(__dirname,`../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
     const pathImagen = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImagen);
    }
}

module.exports = uploadCtrl;