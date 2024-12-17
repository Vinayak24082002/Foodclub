const mongoose = require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    image:{
        type:String,
        default: "https://imgs.search.brave.com/FuJfj2uI6CGmIwObg0IUIU0AcehdkZ2HITEaHjflIaA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mb29k/d29ya3Mub25saW5l/L2FwcC91cGxvYWRz/LzIwMjEvMTAvV29y/ay1hbnl3aGVyZS5z/dmc"
        
    },
    isVeg:{
        type:Boolean,
        default:true
    },
    rating:{

        type:Number,
        default:0
    },
    restroId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    review:{
        type:[{
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }]
    }
    
})

const food=mongoose.model("food")