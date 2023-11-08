const plant = require('../model/plant.js');

const getplant =(req,res)=> {
  plant.find()
      .then((plant) => {
           res.json(plant);
       })
      .catch((error) => {
           console.log(error);
      });
  };


module.exports = getplant;