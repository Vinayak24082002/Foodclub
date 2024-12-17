const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:"customer",
        enum:['customer','admin','superadmin']
    }

},
{timestamps: true}
);

const User = mongoose.model("user",userSchema);

module.exports=User;