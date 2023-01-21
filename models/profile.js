const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/404NF')
.then(()=>{console.log("Mongoose Connection open!!!")})
.catch(err=>{
    console.log('Oh No!! mongoose connection error!!');
    console.log(err)
});

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate:[validateEmail, 'Email already exists'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    age:{
        type:Number,
        required:true,
        min:0
    },
    image:{
        type:String,
        data:Buffer
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        enum:['male','female','other']
    },
    address:{
        type:String,
        // required:true
    },
})

const Profile = mongoose.model('Profile',profileSchema);
 module.exports = Profile;