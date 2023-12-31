const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user.js');
const plant = require('../model/plant.js');
const CartItem = require('../model/cart.js');
const checkauth = require('../middleware/checkauth.js');
const cart = require("../model/cart.js");
const wishlist = require("../model/wishlist.js");
const order = require("../model/order.js");
const orderid = require("../model/orderid.js");
const stock = require("../model/stock.js");
const tranction = require("../model/trancation.js");
const uuid = require('uuid');
const secretkey = 'userdata@12#45';
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const ejs = require('ejs');




//===========================> plant part


// Router.get('/plant', async (req, res, next) => {
//     const page = req.query.page || 1;
//     const pageSize = req.query.pageSize;
//     const skip = (page - 1) * pageSize;
//     try {
//         const totalplants = (await plant.find()).length;
//         const plants = await plant.find().skip(skip).limit(pageSize);
//         res.json({
//             plants: plants,
//             totalplants: totalplants
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

Router.get('/plant', async(req, res, next) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize;
    const skip = (page - 1) * pageSize;

    try {
        const totalplants = (await plant.find()).length;
        const plants = await plant.find().skip(skip).limit(pageSize);
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Common_Name: plant.Common_Name,
            Botanical_Name: plant.Botanical_Name,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1,
        }));
        res.json({
            plants: allplants,
            totalplants: totalplants
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


Router.get('/allplant', async(req, res, next) => {
    try {
        const plants = await plant.find();

        const allplants = plants.map(plant => ({
            _id: plant._id,
            ID: plant.ID,
            Common_Name: plant.Common_Name,
            Botanical_Name: plant.Botanical_Name,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
        }));

        res.json(allplants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.get('/plantinfo1/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Family: plant.Family,
            Common_Name: plant.Common_Name,
            Botanical_Name: plant.Botanical_Name,
            Category: plant.Category,
            Growing_Time: plant.Growing_Time,
            Maintenance: plant.Maintenance,
            Special_Properties: plant.Special_Properties,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});


Router.get('/plantinfo2/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Planting_Potting_Growing_Instruction: plant.Planting_Potting_Growing_Instruction,
            Direction: plant.Direction,
            WaterFreq: plant.WaterFreq,
            Soil: plant.Soil,
            Soil_Moisture: plant.Soil_Moisture,
            Soil_PH: plant.Soil_PH,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});



Router.get('/plantinfo3/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Sunlight_Freq: plant.Sunlight_Freq,
            WaterReq: plant.WaterReq,
            WaterFreq: plant.WaterFreq,
            Temprature: plant.Temprature,
            Humidity: plant.Humidity,
            Fertilizer: plant.Fertilizer,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});



Router.get('/plantinfo4/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Water_Hardness: plant.Water_Hardness,
            Toxicity: plant.Toxicity,
            Fertilizer: plant.Fertilizer,
            Plant_Type: plant.Plant_Type,
            Arrangement: plant.Arrangement,
            Color: plant.Color,
            Shape: plant.Shape,
            Fragrance: plant.Fragrance,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});



Router.get('/plantinfo5/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Foliage: plant.Foliage,
            Suitable_Weather: plant.Suitable_Weather,
            Growing_Season: plant.Growing_Season,
            Height: plant.Height,
            Ultimate_Height: plant.Ultimate_Height,
            Spread: plant.Spread,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});



Router.get('/plantinfo6/:ID', async(req, res) => {
    try {
        const plants = await plant.find({ ID: req.params.ID });
        const allplants = plants.map(plant => ({
            ID: plant.ID,
            Repotting: plant.Repotting,
            Propogating: plant.Propogating,
            Pinch_Prune: plant.Pinch_Prune,
            Paste_Diseases: plant.Paste_Diseases,
            More_Info: plant.More_Info,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1,
            Photo_2: plant.Photo_2,
            Photo_3: plant.Photo_3,
        }));
        res.json(allplants);
    } catch {
        res.status(500).json({ error: 'plant not found' });
    }
});




//=================> filter part

Router.get('/plants/filter/:code', async(req, res) => {
    const coded = req.params.code;
    if (coded == 'Indoor' || coded == 'Outdoor') {
        try {
            const fplant = await plant.find({ Category: coded });
            console.log(fplant.length);
            res.json(fplant);
        } catch {
            res.status(500).json({ error: 'Internal Error .' });
        }
    }
});

Router.post('/filterPlants', async(req, res) => {
    const filters = req.body;
    // console.log(filters);
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize;
    const skip = (page - 1) * pageSize;
    try {

        const query = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '') {
                query[key] = value;
            }
        });


        const total = (await plant.find(query)).length;
        const filteredPlants = await plant.find(query).skip(skip).limit(pageSize);
        console.log(filteredPlants.length);
        res.json({
            plant: filteredPlants,
            total: total
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//==========================> user part

Router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user1 = await user.findOne({ username });

        if (!user1) {
            return res.status(401).json({ Message: 'Invalid user or password.' });
        }

        const validPassword = await bcrypt.compare(password, user1.password);
        if (!validPassword) {
            return res.status(401).json({ Message: 'Invalid user or password.' });
        }

        const token = jwt.sign({ userId: user1._id, username, password, role: user1.role }, secretkey, { expiresIn: '7d' });
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: 'Login Failed.' });
    }
});

Router.post('/signup', async(req, res) => {
    {
        try {
            const { username, password, email, phone, home_address } = req.body;

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
            const newuser = new user({ username, password: hashpassword, email, phone, home_address, role: 'user' });
            await newuser.save();
            res.status(200).json({ message: 'signup successfull' });
        } catch (error) {
            res.status(500).json({ error: 'signup Failed..' });
        }
    }
});

Router.get('/data', checkauth, (req, res) => {
    if (req.role == 'admin') {
        res.json({ message: 'Admin data fetched successfully!' });
    } else {
        console.log('permision dened');
        res.status(403).json({ message: 'Permission denied' });
    }
});

Router.post('/valid', async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(200).json({ success: false, message: "Error! Token was not provided." });
    }
    const d = jwt.verify(token, secretkey);
    res.status(200).json({ success: true, data: { username: d.username, password: d.password } });

});

Router.get('/profile', checkauth, (req, res) => {
    const userId = req.userId;
    user.findById(userId)
        .exec()
        .then((result) => {
            if (result) {
                res.json({ success: true, data: result });
            } else {
                res.json({ success: false, message: 'User not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: 'Server error' });
        });
});


Router.post('/adminrole', async(req, res) => {
    const userId = req.body.id;
    let role = req.body.str;
    if (role === 'admin') {
        role = 'user';
    } else {
        role = 'admin';
    }
    try {
        user.findByIdAndUpdate(userId, { role: role })
            .then((result) => {
                if (result) {
                    console.log(result);
                    res.json({ success: true, message: 'User added to admin' }); // Send the updated data in the response
                } else {
                    res.json({ success: false, message: 'User not added to admin' });
                }
            })
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

Router.get('/Alluser', (req, res) => {
    user.find()
        .then((res1) => {
            res.json(res1);
        })
})

Router.put('/update', checkauth, (req, res) => {
    const userId = req.userId;
    const updatedData = req.body.updatedUserData;

    user.findByIdAndUpdate(userId, updatedData)
        .exec()
        .then((result) => {
            if (result) {
                console.log(result);
                res.json({ success: true, data: result }); // Send the updated data in the response
            } else {
                res.json({ success: false, message: 'User not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: 'Server error' });
        });
});

Router.put('/checkupdate', checkauth, (req, res) => {
    const userId = req.userId;
    const updatedData = req.body.updatedUserData;
    const query = {};
    Object.entries(updatedData).forEach(([key, value]) => {
        if (value !== '') {
            query[key] = value;
        }
    });
    user.findByIdAndUpdate(userId, query)
        .exec()
        .then((result) => {
            if (result) {
                console.log(result);
                res.json({ success: true, data: result }); // Send the updated data in the response
            } else {
                res.json({ success: false, message: 'User not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: 'Server error' });
        });
});




//=======================> cart part
Router.post('/cart', (req, res) => {
    const { userId, productId, quantity, Price, Common_Name, Botanical_Name, Photo_1, Size } = req.body;
    console.log(req.body);
    CartItem.findOne({ userId: userId, productId: productId ,Size:Size})
        .exec()
        .then((res) => {
            if (res) {
                if (res.quantity + quantity >= 20) {
                    CartItem.findOneAndUpdate({ userId: userId, productId: productId, Size:Size }, { quantity: 20 })
                        .exec()
                        .then((res1) => {
                            console.log(res1);
                        })
                } else {
                    CartItem.findOneAndUpdate({ userId: userId, productId: productId, Size:Size }, { quantity: res.quantity + quantity })
                        .exec()
                        .then((res1) => {
                            console.log(res1);
                        })
                }
            } else {
                const cart = new CartItem({ userId, productId, quantity, Price, Common_Name, Botanical_Name, Photo_1, Size });
                cart.save();
            }

        });

    res.status(200).json({ Object: userId, productId, quantity, Price });
});

Router.get('/cartitem', checkauth, (req, res) => {
    userId1 = req.userId;
    CartItem.find({ userId: userId1 })
        .exec()
        .then((cartItems) => {
            res.json(cartItems);
        })
});
Router.post('/cartnew', checkauth, async(req, res) => {

    try {
        const { cartData } = req.body;
        console.log(cartData);
        for (const outerItem of cartData) {
            for (const productItem of outerItem.product) {


                const existCartItem = await CartItem.findOne({
                    userId: req.userId,
                    productId: productItem.ID,
                    Size: outerItem.Size
                });

                if (existCartItem) {

                    existCartItem.quantity += outerItem.quantity;
                    await existCartItem.save();
                } else {
                    const cartItem = new CartItem({
                        userId: req.userId,
                        productId: productItem.ID,
                        quantity: outerItem.quantity,
                        Price: outerItem.Price,
                        Size: outerItem.Size,
                        Common_Name: productItem.Common_Name,
                        Botanical_Name: productItem.Botanical_Name,
                        Photo_1: productItem.Photo_1
                    });

                    await cartItem.save();
                }
            }
        }
        res.status(200).json({ message: 'Cart data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



Router.delete('/deleteitem/:userId', (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    CartItem.findByIdAndRemove(userId)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Cart Item successfully' });
        })
        .catch(err => {
            // console.error(err);
            res.status(500).json({ error: err });
        });
});

Router.post('/qtyplus', (req, res) => {
    {
        try {
            const cID = req.body;
            console.log(cID);
            CartItem.findById(cID)
                .exec()
                .then((res2) => {
                    if (res2.quantity >= 20) {
                        console.log('maximun 20 item added in Cart');
                    } else {
                        CartItem.findByIdAndUpdate(cID, { quantity: res2.quantity + 1 })
                            .exec()
                            .then((res3) => {
                                res.json({ message: 'plus' });
                            })
                    }

                })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

Router.post('/qtymins', (req, res) => {
    {
        try {
            const cID = req.body;

            CartItem.findById(cID)
                .exec()
                .then((res2) => {


                    if (res2.quantity <= 1) {
                        CartItem.findByIdAndRemove(cID).exec();
                    } else {
                        CartItem.findByIdAndUpdate(cID, { quantity: res2.quantity - 1 })
                            .exec()
                            .then((res1) => {
                                res.json({ mesaage: 'minus' });
                            })
                    }

                })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


//============================> wishlist part

Router.post('/wishlist', async(req, res) => {
    const { productId, userId, Photo_1, Common_Name, Botanical_Name, Price, ID } = req.body;
    wishlist.findOne({ productId: productId, userId: userId })
        .exec()
        .then(async(res1) => {
            if (res1) {
                res.json({ success: false, massges: 'product already add', data: res1 });
            } else {
                const newwishlist = new wishlist({ productId, userId, class: 'res1', Photo_1, Common_Name, Botanical_Name, Price, ID });
                console.log(newwishlist);
                await newwishlist.save();
                res.json({ success: true, data: 'product add' });
            }
        });

});

Router.get('/getwishlist', checkauth, async(req, res) => {
    const userId = req.userId;
    wishlist.find({ userId: userId })
        .exec()
        .then((result) => {
            res.json(result);
        });
});

Router.delete('/deletewishlist/:userId', (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    wishlist.findByIdAndRemove(userId)
        .exec()
        .then(result => {
            res.status(200).json({ message: 'wishlist item deleted successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});



//======================> order part

Router.delete('/deleteorder/:userId', (req, res, next) => {
    const userId = req.params.userId;
    orderid.findByIdAndUpdate(userId, { statusbar: 'cancel' })
        .then(async result => {
            const orderlist = await order.find({ userId: result.userId, orderID: result.orderID });
            for (let a of orderlist) {
                const stocklist = await stock.findOne({ ID: a.productId });
                console.log(stocklist);
                await stock.findOneAndUpdate({ ID: a.productId }, { Stock: stocklist.Stock + a.quantity });
                const newtreanction = new tranction({ID:a.productId,orderID:a.orderID,Common_Name:a.Common_Name,Size:a.Size,date:a.date,quantity:a.quantity,Description:'Cancle'});
                newtreanction.save();
            }
            res.status(200).json({ message: 'order item cancle successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

Router.get('/orderid', checkauth, async(req, res) => {
    const userId = req.userId;
    orderid.findOne({ userId: userId }).sort({ "orderID": -1 }).limit(1)
        .exec()
        .then((res1) => {
            res.json(res1);
        });
});
Router.get('/getcurrentorder', checkauth, async(req, res) => {
    const userId = req.userId;

    orderid.find({ userId: userId })
        .exec()
        .then((res1) => {
            res.json(res1);
        });
});
Router.post('/allgetcurrentorder', (req, res, next) => {
    const { statusbar } = req.body;

    order.find({ statusbar: statusbar })
        .exec()
        .then((res1) => {
            res.json(res1);
        });
});

Router.get('/pastorder/:userId', async(req, res) => {
    const userId = req.params.userId;
    order.findByIdAndUpdate(userId, { statusbar: 'past' })
        .exec()
        .then((res1) => {
            res.json({ success: true });
        });
});




//======================> search part

Router.get('/search', async(req, res) => {
    const { search } = req.query;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize;
    const skip = (page - 1) * pageSize;


    try {
        const plants = await plant.find({
            $or: [
                { Common_Name: { $regex: search, $options: 'i' } },
                { Botanical_Name: { $regex: search, $options: 'i' } },
            ],
        }).skip(skip).limit(pageSize);

        res.json(plants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.get('/search2', async(req, res) => {
    const { search } = req.query;
    try {
        const plants = await plant.find({
            $or: [
                { Common_Name: { $regex: search, $options: 'i' } },
                { Botanical_Name: { $regex: search, $options: 'i' } },
            ],
        });

        res.json(plants.length);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


Router.get('/search3', async(req, res) => {
    const { search } = req.query;
    // console.log(search);
    // console.log(search.charAt(0));
    try {
        const plants = await plant.find({
            $or: [
                { Common_Name: { $regex: `^${search}`, $options: 'i' } }, // Match at the beginning (case-insensitive)
                // { Botanical_Name: { $regex: `^${search}`, $options: 'i' } }, // Match at the beginning (case-insensitive)
            ],
        });

        res.json(plants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// ======================> payment part

Router.post('/currentorder', async(req, res) => {
    const { userId, Price, quantity, home_address, orderID } = req.body;
    const userdata = await user.findOne({ _id: userId });

    try {
        const randomId = uuid.v4();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const neworderid = new orderid({ orderID: orderID, randomId: randomId, userId: userId, Price: Price, quantity: quantity, address: home_address, date: formattedDate, statusbar: 'draft' });
        await neworderid.save();

        try {
            const cashfreeRequest = {
                appId: 'TEST1002931373b63abe8a1faf0f3d5631392001',
                secretKey: 'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
                link_id: randomId,
                link_amount: Price,
                link_currency: 'INR',
                link_purpose: 'Payment for PlayStation 11',
                customer_details: {
                    customer_phone: String(userdata.phone),
                    customer_email: userdata.email,
                    customer_name: userdata.username
                },
                link_notify: {
                    send_sms: true,
                    send_email: true
                },
                link_meta: {
                    return_url: 'https://growmoreplant.netlify.app/#/orderlist/payment/' + randomId,
                    payment_methods: '',
                    notify_url: 'https://plant-backend6.onrender.com/Apis/getpayment/' + randomId
                }
            };
            const httpheader = {
                'accpet': 'application/json',
                'content-type': 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id': 'TEST1002931373b63abe8a1faf0f3d5631392001',
                'x-client-secret': 'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
            }
            const response = await axios.post('https://sandbox.cashfree.com/pg/links', cashfreeRequest, { headers: httpheader });
            if (response.data && response.data.link_url) {
                const sourceData = await CartItem.find({ userId: userId });
                orderid.findOneAndUpdate({ orderID: orderID, userId: userId }, { statusbar: 'pending' })
                    .exec()
                    .then((res2) => {

                    });

                await CartItem.deleteMany({ userId: userId });
                const newsourceData = sourceData.map(item => ({
                    ...item.toObject(),
                    statusbar: 'current',
                    date: formattedDate,
                    orderID: orderID,
                    _id: undefined,
                }));

                await order.insertMany(newsourceData);

                res.json({ paymentLink: response.data.link_url });
            } else {
                res.status(500).json({ error: 'Payment link not found in Cashfree response' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Payment initiation failed' });
        }

    } catch (error) {
        console.error('Error transferring data:', error);
    }

});


Router.get('/getpayment/:id', checkauth, async(req, res) => {
    const link_id = req.params.id;
    const userId = req.userId;
    try {
        const httpheader = {
            'accpet': 'application/json',
            'content-type': 'application/json',
            'x-api-version': '2022-09-01',
            'x-client-id': 'TEST1002931373b63abe8a1faf0f3d5631392001',
            'x-client-secret': 'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
        }
        const response = await axios.get('https://sandbox.cashfree.com/pg/links/' + link_id + '/orders', { headers: httpheader });
        if (response.data && response.data.length) {
            const order_id = response.data[0].order_id;
            // orderid.findOneAndUpdate({randomId:link_id},)
            const response1 = await axios.get('https://sandbox.cashfree.com/pg/orders/' + order_id + '/payments', { headers: httpheader });
            if (response1.data) {
                if (response1.data[0].payment_status == 'SUCCESS') {
                    const orderlist = await orderid.findOneAndUpdate({ randomId: link_id }, { statusbar: response1.data[0].payment_status });
                    const orderlist_1 = await order.find({ userId: userId, orderID: orderlist.orderID });
                    for (let or of orderlist_1) {
                        if (or.statusbar === 'current') {
                            const onestock = await stock.findOne({ ID: or.productId,Size:or.Size });
                            await stock.updateOne({ _id:onestock._id }, { Stock: onestock.Stock - or.quantity });
                            await order.updateMany({ userId: userId, orderID: or.orderID, productId: or.productId }, { statusbar: 'past' });
                            const newtreanction = new tranction({ID:or.productId,userID:userId,orderID:or.orderID,Common_Name:or.Common_Name,Price:or.Price,Size:or.Size,date:or.date,quantity:or.quantity,Description:'Sales'});
                            newtreanction.save();
                        }
                    }
                } else {
                    await orderid.findOneAndUpdate({ randomId: link_id }, { statusbar: 'failed' });
                }
                res.json({ data: response1.data[0].payment_method, order_id: response1.data[0].order_id, cf_payment_id: response1.data[0].cf_payment_id });
            } else {
                res.status(500).json({ error: 'not get payment method data ' });
            }
        } else {
            res.status(500).json({ error: 'not get order_id ' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);

    }
});



Router.get('/getrepayment/:id', async(req, res) => {
    const link_id = req.params.id;
    try {
        const httpheader = {
            'accpet': 'application/json',
            'content-type': 'application/json',
            'x-api-version': '2022-09-01',
            'x-client-id': 'TEST1002931373b63abe8a1faf0f3d5631392001',
            'x-client-secret': 'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
        }
        const response = await axios.get('https://sandbox.cashfree.com/pg/links/' + link_id, { headers: httpheader });
        res.json({ link_url: response.data.link_url })
    } catch (error) {
        console.error('Error fetching data:', error);

    }
});

Router.get('/getlinkid', checkauth, (req, res) => {
    const userId = req.userId;
    orderid.find({ userId: userId })
        .then((res1) => {
            res.json(res1)
        });
});


Router.post('/cashfree-webhook', (req, res) => {
    // Handle the Cashfree webhook payload
    const payload = req.body;
    console.log('Received Cashfree webhook:', payload);

    // Add your logic to process the webhook payload

    res.status(200).json({ massges: 'Webhook received successfully', data: payload });
});
Router.post('/plant/:Family', async(req, res) => {


    try {
        const Family = req.params.Family;


        const plants = await (plant.find({ Family: Family }));
        const sorted = plants.filter(item => item.ID !== req.body.Id)

        const allplants = sorted.map(plant => ({
            _id: plant._id,
            ID: plant.ID,
            Common_Name: plant.Common_Name,
            Botanical_Name: plant.Botanical_Name,
            Sprice: plant.Sprice,
            Mprice: plant.Mprice,
            Lprice: plant.Lprice,
            Photo_1: plant.Photo_1
        }));
        console.log(allplants);
        res.json({ data: allplants, length: allplants.length });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

    // plant.find()
    //     .exec()
    //     .then((res1) => {
    //         res.json({ data: res1, length: res1.length });
    //     });
});
Router.get('/plantid/:ID', (req, res) => {
    plant.find({ ID: req.params.ID })
        .then((res1) => {
            res.json({ data: res1 });
        });
});



//================= pdf part


Router.get('/pdf', async(req, res) => {
    console.log('sdfldf');


});

Router.get('/orderinfo/:ID', checkauth, async(req, res) => {
    const userId = req.userId;
    const id = req.params.ID;
    try {
        const order1 = await orderid.find({ userId: userId, orderID: id });
        const res1 = await order.find({ orderID: id, userId: userId });
        res.json({ item: res1, date: order1[0].date, Price: order1[0].Price, Statusbar: order1[0].statusbar, address: order1[0].address })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.get('/username', checkauth, async(req, res) => {
    const userId = req.userId;
    console.log(userId);
    const use = await user.findById(userId);
    res.json({ name: use.username });
});




module.exports = Router;