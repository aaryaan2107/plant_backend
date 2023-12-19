const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../model/user.js');
const plant = require('../model/plant.js')
const trend = require('../model/trend.js');
const stock = require('../model/stock.js');
const tranction = require('../model/trancation.js');
const stockdetails = require('../model/stock-details.js');
const checkauth = require("../middleware/checkauth.js");

Router.post('/signup', async(req, res) => {
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
            const newuser = new user({ username, password: hashpassword, email, phone, address, role: 'admin' });
            await newuser.save();
            res.status(200).json({ message: 'signup successfull' });
        } catch (error) {
            res.status(500).json({ error: 'signup Failed..' });
        }
    }
});
Router.get('/addplantid', async(req, res) => {
    plant.findOne().sort({ "ID": -1 }).limit(1)
        .exec()
        .then((res1) => {
            res.json(res1);
        });
});


Router.post('/addplant', async(req, res) => {
    try {
        const { Price, Direction, Humidity, WaterFreq, WaterReq, Sunlight_Freq, Soil, Exposure, Family, Botanical_Name, Blooming_Period, Sowing_Period, Container, Common_Name, Photo_1, Photo_2, Photo_3, Category, Growing_Time, Maintenance, Special_Properties, Location } = req.body;

        const userdata = req.body.userdata;
        const Size = req.body.Size;




        if (!userdata.Botanical_Name || !userdata.Common_Name) {

            res.status(400).json({ error: 'Plant Name not be Empty..' });
            return;
        }
        plant.findOne().sort({ "ID": -1 }).limit(1)
            .exec()
            .then(async(res1) => {
                const ID = Number(res1.ID) + 1;
                console.log(ID);
                const newplant = new plant(userdata);
                // res.json({ message: 'plant added successfully' });
                // await newplant.save();

                const newstock = new stock({ ID: ID, Common_Name: userdata.Common_Name, Stock: 0, Size: Size });
                res.json({ message: 'stock added successfully' });
                await newstock.save();

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



//###################################  stock-part

Router.post('/stock-details', async(req, res) => {

    try {
        const {
            plantName,
            vendername,
            invoiceNumber,
            invoiceDate,
            quantity,
            price,
            Size
        } = req.body;

        const a = await plant.find({ Common_Name: req.body.plantName });

        if (a && a.length > 0) {
            const pid = a[0].ID;

            const details = new stockdetails({
                plantId: pid,
                plantName,
                vendername,
                invoiceNumber,
                invoiceDate,
                quantity,
                price,
                Size
            });

            await details.save();

            const b = await stock.find({ Common_Name: req.body.plantName ,Size : req.body.Size});
            console.log(b);
            if (b && b.length > 0) {
                const oldstock = b[0].Stock;
                const result = await stock.findOneAndUpdate({
                    ID: pid,
                    Size: req.body.Size
                }, { Stock: oldstock + details.quantity });

                console.log(result);
                if (!result) {
                    console.log('no result');
                }
                const newtreanction = new tranction({ID:pid,userID:details.vendername,orderID:details.invoiceNumber,Common_Name:details.plantName,Size:req.body.Size,Price:req.body.price,date:details.invoiceDate,quantity:details.quantity,Description:'Parches'});
                newtreanction.save();
                return res.json({ message: 'stock-details added successfully' });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server Error' });
    }
});

Router.post('/Allstock', async(req, res) => {
    try {
        const { id } = req.body;

        const stacklist = await stock.find({ ID: req.body.id });

        return res.json(stacklist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'can`t get stock details' });
    }
})

Router.post('/deadstock',checkauth,async(req, res) => {
    const userId = req.userId;
    const {reason , quantity} = req.body.formdata;
    const stockId = req.body.id;

    const stocklist = await stock.findById(stockId);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const newstockdetelis = new tranction({ID:stocklist.ID,userID:userId,Common_Name:stocklist.Common_Name,Size:stocklist.Size,date:formattedDate,quantity:quantity,Description:reason});
    newstockdetelis.save();    

    await stock.findByIdAndUpdate(stockId,{Stock:stocklist.Stock - quantity})
    res.json({message:'plant cut in stock for reason is '+ reason})
});

module.exports = Router;