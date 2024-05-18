const {createHmac,randomBytes} = require('crypto');
  
const{Schema , model} = require("mongoose")
const { type } = require("os")


const userSchema = new Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    profileimage:{
        type : String,
        default: "/image/download.png",
    },
    
},
    {timestamps:true}
)

userSchema.pre("save",function(next){
    const user = this

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hasspass = createHmac("sha256",salt).update(user.password).digest('hex')

    this.salt = salt
    this.password = hasspass
})
const User = model("user",userSchema)
module.exports = User