const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const HospitalSchema = new Schema({
    nombre:{type:String, required: true},
    imagen:{type:String},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required:true}
},{collection:'hospitales'})

HospitalSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id=_id;
    return object;
})

module.exports= model('Hospital',HospitalSchema);