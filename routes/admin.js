const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../model/user.js');
const plant = require('../model/plant.js')
const trend = require('../model/trend.js');
const stockdetails = require('../model/stock-details.js')

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
  

  Router.post('/addplant', async(req, res) => {
    try {
        const { Price, Direction, Humidity, WaterFreq, WaterReq, Sunlight_Freq, Soil, Exposure, Family, Botanical_Name, Blooming_Period, Sowing_Period, Container, Common_Name, Photo_1, Photo_2, Photo_3, Category, Growing_Time, Maintenance, Special_Properties, Location } = req.body;

        if (!Botanical_Name || !Common_Name) {
            res.status(400).json({ error: 'Plant Name not be Empty..' });
            return;
        }
        plant.findOne().sort({ "ID": -1 }).limit(1)
            .exec()
            .then(async(res1) => {
                const ID = Number(res1.ID) + 1;
                console.log(ID);
                const newplant = new plant({ ID, Price, Direction, Humidity, WaterFreq, WaterReq, Sunlight_Freq, Soil, Exposure, Family, Botanical_Name, Blooming_Period, Sowing_Period, Container, Common_Name, Photo_1, Photo_2, Photo_3, Category, Growing_Time, Maintenance, Special_Properties, Location });
                res.json({ message: 'plant added successfully' });
                await newplant.save();

            });
    } catch (error) {
        res.status(500).json({ error: 'Plant added Failed.' });

    }

});
  
  Router.post('/trending', async(req, res) => {
    try {
        const trendid = req.body.trendid;
        const trendid2 = req.body.trendid2;

        const vplants = await plant.findById(trendid2);
        if (!vplants) {
            return res.status(404).json({ message: 'Plant not Found' });
        }

        const exist = await trend.findOne({ ID: trendid });

        if (exist) {
            return res.status(400).json({ message: 'Plant is already trending' });
        }

        const trendingplants = await trend.create({
            ID: vplants.ID,
            Family: vplants.Family,
            Common_Name: vplants.Common_Name,
            Botanical_Name: vplants.Botanical_Name,
            Photo_1: vplants.Photo_1,
            trending: true
        });


        return res.json({ message: 'Trending plant successful', Data: trendingplants });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


Router.get('/gettplants', async(req, res) => {
    try {
        const tplants = await trend.find();
        res.json(tplants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

Router.delete('/removertrend/:id', async(req, res) => {
    try {
        const tidd = req.params.id;

        const tplants = await trend.findOneAndDelete({ ID: tidd });
        return res.json('plant deleted from trending..');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

Router.get('/trend', async(req, res) => {

  // try {
  //     const trendingPlants = await trend.find();
  //     res.json(trendingPlants);
  // } catch {
  //     res.status(500).json({ error: 'Internal Error .' });
  // }
  trend.find()
  .exec()
  .then((res1) => {
      res.json(res1);
  })
});

Router.post('/stock-details', async(req, res) => {
console.log('dsdsdsdsd  ')
  try {

      const {
          plantId,
          plantName,
          vendername,
          invoiceNumber,
          invoiceDate,
          quantity,
          price
      } = req.body;
      const a = await plant.find({ Common_Name: req.body.plantName });
      let pid = a[0].ID;;

      console.log(req.body.invoiceDate);
      const details = new stockdetails({
          plantId: pid,
          plantName,
          vendername,
          invoiceNumber,
          invoiceDate,
          quantity,
          price
      });
      console.log(details);
      await details.save();
      return res.json({ message: 'stock-details added successfully ' });
  } catch (error) {
      res.status(500).json({ error: 'internal server Error' });
  }
});



module.exports = Router;