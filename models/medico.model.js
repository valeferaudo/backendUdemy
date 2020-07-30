const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const MedicoSchema = new Schema({
    nombre:{type:String, required: true},
    imagen:{type:String},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required:true},
    hospital:{type:Schema.Types.ObjectId, ref:'Hospital',required:true}
},{collection:'medicos'})

MedicoSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id=_id;
    return object;
})

module.exports= model('Medico',MedicoSchema);