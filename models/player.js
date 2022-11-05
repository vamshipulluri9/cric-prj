const mongoose=require("mongoose");
const {Schema}=mongoose;

const playerSchema = new Schema({
    name:  String, 
    role: {
        type: String,
        enum: {
            values: ["Batting","Bowling","AllRounder"],
            message: "type the correct role"
        }
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type : String,
        required: true
    }
    
  });

  module.exports=mongoose.model('Player',playerSchema);