    const mongoose = require('mongoose');


    const plant = new mongoose.Schema({
  
        ID:String,
        Family:String,
        Common_Name:String,
        Botanical_Name:String,
        Photo_1:String,
        Photo_2:String,
        Photo_3:String,
        Category:String,
        Growing_Time:String,
        Maintenance:String,
        Toxicity:String,
        Special_Properties:String,
        Arrangement:String,
        Location:String,
        Container:String,
        Color:String,
        Shape:String,
        Fragrance:String,
        Sowing_Period:String,
        Blooming_Period:String,
        Direction:String,
        Exposure:String,
        Soil:String,
        Soil_Moisture:String,
        Soil_PH:String,
        PH:String,
        Sunlight_Freq:String,
        WaterReq:String,
        Water_Hardness:String,
        WaterFreq:String,
        Temprature:String,
        Humidity:String,
        Fertilizer:String,
        Plant_Type:String,
        Native_Area:String,
        Overview:String,
        Mature_Size:String,
        Foliage:String,
        Suitable_Weather:String,
        Growing_Season:String,
        Height:String,
        Ultimate_Height:String,
        Spread:String,
        Repotting:String,
        Propogating:String,
        Pinch_Prune:String,
        Paste_Diseases:String,
        More_Info:String,
        Planting_Potting_Growing_Instruction:String,
        quantity:String,
        Price:String
    })

    const model = mongoose.model('data',plant);
    module.exports = model;


   