const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../model/user.js');
const plant = require('../model/plant.js')

Router.post('/signup', async (req, res) => {
    {
      try {
        const { username, password, email, phone, address } = req.body;
  
        if (!username || !password) {
          res.status(400).json({ error: 'Username or Password is Empty' });
          return;
        }
        const exist = await user.findOne({ username });
        if (exist) {
          res.status(409).json({ error: 'Username already Exist' });
          return;
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newuser = new user({ username, password: hashpassword, email, phone, address ,role:'admin'});
        await newuser.save();
        res.status(200).json({ message: 'signup successfull' });
      }
      catch (error) {
        res.status(500).json({ error: 'signup Failed..' });
      }
    }
  });
  Router.get('/addplantid', async (req ,res ) => {
    plant.findOne().sort({"ID":-1}).limit(1) 
    .exec()
    .then((res1) =>{
      res.json(res1);
    });
  });
  


  Router.post('/addplant', async (req, res) => {
    const { Price,Direction,Humidity,WaterFreq,WaterReq,Sunlight_Freq,Soil,Exposure,Family,Botanical_Name,Blooming_Period, Sowing_Period,Container,Common_Name,Photo_1,Photo_2,Photo_3, Category,Growing_Time,Maintenance,Special_Properties,Location} = req.body;
      
    plant.findOne().sort({"ID":-1}).limit(1) 
    .exec()
    .then(async (res1) =>{
      const ID = Number(res1.ID)+1;
      console.log(ID);
      const newplant = new plant({ ID,Price,Direction,Humidity,WaterFreq,WaterReq,Sunlight_Freq,Soil,Exposure,Family,Botanical_Name,Blooming_Period, Sowing_Period,Container,Common_Name,Photo_1,Photo_2,Photo_3, Category,Growing_Time,Maintenance,Special_Properties,Location });
      res.json({ message: 'plant added successfull' });
      await newplant.save();
      
    });
  });
  

  

module.exports = Router;