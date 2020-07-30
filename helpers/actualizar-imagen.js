const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const fs = require('fs');

const borrarImagen= (path)=>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}
let pathViejo ="";
const actualizarImagen = async (tipo, id, nombreArchivo) =>{
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log("No es un usuario por id");
                return false
            }
            pathViejo= `./uploads/usuarios/${usuario.imagen}`;
            borrarImagen(pathViejo);
            usuario.imagen= nombreArchivo;
            await usuario.save();
            return true
            
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log("No es un hospital por id");
                return false
            }
            pathViejo= `./uploads/hospitales/${hospital.imagen}`;
            borrarImagen(pathViejo);
            hospital.imagen= nombreArchivo;
            await hospital.save();
            return true
        
        break;
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log("No es un medico por id");
                return false
            }
            pathViejo= `./uploads/medicos/${medico.imagen}`;
            borrarImagen(pathViejo);
            medico.imagen= nombreArchivo;
            await medico.save();
            return true
            break;
    
        default:
            break;
    }
}


module.exports= { actualizarImagen}