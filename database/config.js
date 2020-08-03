const mongoose = require ('mongoose');

const URI = process.env.DB_CNN;
const dbConnection = async () =>{
    try{
        await mongoose.connect(URI,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true});

            console.log("DB online")
        }
        catch(error){
            console.error(error)
            throw new Error("Error a la hora de iniciar bd")            
    }

    }

module.exports = { dbConnection }
