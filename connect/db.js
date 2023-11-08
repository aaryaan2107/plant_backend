const mongoose = require("mongoose");

const DB = async() => {
    try 
    {
       await mongoose.connect(
            "mongodb+srv://plant:plantaaas@cluster0.h0l3dnq.mongodb.net/", { useNewUrlParser: true }    
            
        );
        console.log(`MongoDB Connected Successfully...`);
    } 
    catch (error) 
    {
        console.log(error);
    }
};

/*
=>      without async

function DB (){
    mongoose.connect(
        "mongodb+srv://plant:plantaaas@cluster0.h0l3dnq.mongodb.net/", { useNewUrlParser: true }    
    )
    .then( () => {
        console.log(`MongoDB Connected Successfully...`);
    })
    .catch( (err) => {
        console.log(err);
});
};
*/

module.exports = DB;