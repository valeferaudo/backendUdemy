const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const UsuarioSchema = new Schema({
    nombre:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    imagen:{type:String},
    role:{type:String,required:true, default:'USER_ROLE'},
    google:{type:Boolean, default: false}
},{collection:'usuarios'})

UsuarioSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.uid = _id;
    return object;
})

module.exports= model('Usuario',UsuarioSchema);