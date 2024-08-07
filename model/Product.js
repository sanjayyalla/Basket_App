const mongoose=require('mongoose')
let ProductSchema=new mongoose.Schema(
    {
        company:{
            type:String,
            required:true
        },
        image : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        model : {
            type : String,
            required : true
        },
        specification : {
            type : String,
            required : true
        }

    }
   

)
let Product=mongoose.model('mobiles',ProductSchema);
module.exports=Product;