
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
const uuid = require('uuid');  
const secretkey = 'userdata@12#45';
const axios = require('axios');

// const isAdmin = require('../middleware/auth');
Router.post('/login', async (req, res) => {
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

    const token = jwt.sign({ userId: user1._id, username ,password,role:user1.role}, secretkey, { expiresIn: '7d' });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: 'Login Failed.' });
  }
});




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
      const newuser = new user({ username, password: hashpassword, email, phone, address ,role:'user'});
      await newuser.save();
      res.status(200).json({ message: 'signup successfull' });
    }
    catch (error) {
      res.status(500).json({ error: 'signup Failed..' });
    }
  }
});



Router.get('/data',checkauth,(req, res) => {
  console.log('helll');

  if ( req.role == 'admin') {
    res.json({ message: 'Admin data fetched successfully!' });
  } else {
    console.log('permision dened');
    res.status(403).json({ message: 'Permission denied' });
  }
});





















Router.post('/valid', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(200).json({ success: false, message: "Error! Token was not provided." });
  }
  const d = jwt.verify(token, secretkey);
  res.status(200).json({ success: true, data: { username: d.username ,password  : d.password} });

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



Router.post('/cart', (req, res) => {
  const { userId, productId, quantity, Price } = req.body;

  CartItem.findOne({userId:userId,productId:productId})
  .exec()
  .then((res) =>{
    if(res)
    {
      if(res.quantity+quantity >= 20) 
      {
        CartItem.findOneAndUpdate({userId:userId,productId:productId},{quantity:20})
        .exec()
        .then((res1) =>{
          console.log(res1); 
        })
      }
      else
      {
        CartItem.findOneAndUpdate({userId:userId,productId:productId},{quantity:res.quantity+quantity})
        .exec()
        .then((res1) =>{
          console.log(res1); 
        })
      }
    }
    else
    {
      const cart = new CartItem({ userId, productId, quantity, Price });
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




Router.post('/cartnew', checkauth, async (req, res) => {

  try {
    const { cartData } = req.body;
    for (const outerItem of cartData) {
      for (const productItem of outerItem.product) {
        const cartItem = new CartItem({
          userId: req.userId,
          productId: productItem.ID,
          quantity: outerItem.quantity,
          Price: productItem.Price
        });
  
        await cartItem.save();
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

Router.post('/qtyplus',  (req, res) => {
  {
    try{
      const cID = req.body;
      console.log(cID);
      CartItem.findById(cID)
      .exec()
      .then((res2) =>{
        if(res2.quantity >=20){
          console.log('maximun 20 item added in Cart');
        }
        else{
          CartItem.findByIdAndUpdate(cID,{ quantity:res2.quantity + 1})
          .exec()
          .then((res3) =>{
        res.json({message:'plus'});
          })
        }
       
      })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

Router.post('/qtymins',  (req, res) => {
  {
    try{
      const cID = req.body;
    
      CartItem.findById(cID)
      .exec()
      .then((res2) =>{
        
        
        if(res2.quantity <= 1)
        {
             CartItem.findByIdAndRemove(cID).exec();   
        }
        else{
        CartItem.findByIdAndUpdate(cID,{ quantity:res2.quantity - 1})
        .exec()
        .then((res1) =>{
          res.json({mesaage:'minus'});
        })
        }
      
      })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


Router.get('/plant', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize;
  const skip = (page - 1) * pageSize;
  

  try {
    const plants = await plant.find().skip(skip).limit(pageSize);
    res.json(plants);
  }catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    } 
  }
);






Router.post('/wishlist',  async (req, res) => {
  const { productId , userId } = req.body;
  wishlist.findOne({productId:productId,userId:userId})
  .exec()
  .then(async (res1) =>{
    if(res1)
    {
      res.json({success:false,massges:'product already add' , data :res1});
    }
    else
    {
      const newwishlist = new wishlist({ productId ,userId,class:'res1' });
      await newwishlist.save();
      res.json({success:true, data:'product add'});
    }
  });
  
});

Router.get('/getwishlist',checkauth,  async (req, res) => {
  const userId = req.userId;
  wishlist.find({userId:userId})
  .exec()
  .then((result) =>{
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

Router.delete('/deleteorder/:userId', (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  order.findByIdAndUpdate(userId,{statusbar:'cancel'})
    .exec()
    .then(result => {
      res.status(200).json({ message: 'order item cancle successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});





Router.get('/orderid',checkauth, async (req ,res ) => {
  const userId = req.userId;
  orderid.findOne({userId:userId}).sort({"orderID":-1}).limit(1) 
  .exec()
  .then((res1) =>{
    res.json(res1);
  });
});




Router.get('/getcurrentorder',checkauth, async (req ,res ) => {
  const userId =req.userId ;
 
  order.find({userId:userId,statusbar:'current'})
  .exec()
  .then((res1) => {
     res.json(res1);
  });
});

Router.post('/allgetcurrentorder',  (req ,res ,next) => {
  const { statusbar } = req.body;

  order.find({statusbar:statusbar})
  .exec()
  .then((res1) => {
    res.json(res1);
  });
});


Router.get('/alluser',(req,res) =>{
  user.find()
  .then((res1)=>{
    res.json(res1);
  })
})


Router.get('/pastorder/:userId',  async (req, res) => {
  const userId = req.params.userId;
  order.findByIdAndUpdate(userId , {statusbar:'past'})
  .exec()
  .then((res1) =>{
    res.json({success:true});
  });
});

Router.get('/search', async (req, res) => {
  const { search } = req.query;
  try {
    const plants = await plant.find({
      $or: [
        { Common_Name: { $regex: search, $options: 'i' } },
        { Botanical_Name: { $regex: search, $options: 'i' } },
      ],
    });

    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




Router.get('/plants/filter/category/:category', async (req, res) => {
  const category = req.params.category;
  const filteredPlants = await plant.find({ Category: category });
  res.json(filteredPlants);
});

Router.get('/plants/filter/Fragrance/:Fragrance', async (req, res) => {
  const Fragrance = req.params.Fragrance;
  const filteredPlants = await plant.find({ Fragrance: Fragrance });
  res.json(filteredPlants);
});


Router.post('/currentorder',  async (req, res) => {
  const { userId , Price , quantity , address , orderID } = req.body;
  const userdata =await user.findOne({_id:userId});
  
  try {

    const randomId = uuid.v4();

    

    const sourceData = await CartItem.find({userId:userId});
    await CartItem.deleteMany({userId:userId});
    const currentDate = new Date(); 
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const newsourceData = sourceData.map(item => ({
      ...item.toObject(),
      statusbar:'current',
      date:formattedDate,
      orderID:orderID,
      _id: undefined,
    }));

    await order.insertMany(newsourceData);

    try {
      const cashfreeRequest = {
        appId: 'TEST1002931373b63abe8a1faf0f3d5631392001',
        secretKey: 'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
        link_id:randomId,
        link_amount:Price,
        link_currency:'INR',
        link_purpose:'Payment for PlayStation 11',
        customer_details: {
          customer_phone:String(userdata.phone),
          customer_email:userdata.email,
          customer_name:userdata.username
        },
        link_notify: {
          send_sms:true,
          send_email:true
        },
        link_meta : {
          return_url:'https://localhost:4200',
          payment_methods:''
        }
      };
      const httpheader = {
        'accpet':'application/json',
        'content-type':'application/json',
        'x-api-version':'2022-09-01',
        'x-client-id':'TEST1002931373b63abe8a1faf0f3d5631392001',
        'x-client-secret':'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
      }
      const response = await axios.post('https://sandbox.cashfree.com/pg/links', cashfreeRequest,{headers:httpheader});
      if (response.data && response.data.link_url) {
        res.json({ paymentLink: response.data.link_url });
        
        const neworderid = new orderid({orderID:orderID,randomId:randomId,userId:userId,Price:Price,quantity:quantity,address:address});
        await neworderid.save();

      } 
      else 
      {
        res.status(500).json({ error: 'Payment link not found in Cashfree response' });
      }
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Payment initiation failed' });
    }

  } catch (error) {
    console.error('Error transferring data:', error);
  }

});




Router.get('/getpayment/:id', async (req, res) => {
  const link_id = req.params.id;
  console.log(link_id);
    try {
      const httpheader = {
        'accpet':'application/json',
        'content-type':'application/json',
        'x-api-version':'2022-09-01',
        'x-client-id':'TEST1002931373b63abe8a1faf0f3d5631392001',
        'x-client-secret':'TEST207a125d08a56da08f47f2aaef77307d9f617fec',
      }
      const response = await axios.get('https://sandbox.cashfree.com/pg/links/'+link_id+'/orders',{headers:httpheader});
      if (response.data)
      {
        const order_id = response.data[0].order_id;
        const response1 = await axios.get('https://sandbox.cashfree.com/pg/orders/'+order_id+'/payments',{headers:httpheader});
        if (response1.data)
        {
          res.json({data:response1.data[0].payment_method,order_id:response1.data[0].order_id,cf_payment_id:response1.data[0].cf_payment_id});
        }
        else 
        {
          res.status(500).json({ error: 'not get payment method data ' });
        }
      }
      else 
      {
        res.status(500).json({ error: 'not get order_id ' });
      }
    } catch (error) {
    console.error('Error fetching data:', error);
      
    }
});

Router.get('/getlinkid',checkauth, (req, res) => {
  const userId = req.userId;
  orderid.find({userId:userId})
  .then((res1) => {
    res.json(res1)
  });
});

Router.get('/allplant', async(req, res, next) => {
  try {
      const plants = await plant.find();
      res.json(plants);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = Router;