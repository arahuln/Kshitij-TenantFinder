const mongoose=require('mongoose');

const Profile = require('./models/profile');

mongoose.connect('mongodb://127.0.0.1:27017/KGP')
.then(()=>{console.log("Mongoose Connection open!!!")})
.catch(err=>{
    console.log('Oh No!! mongoose connection error!!');
    console.log(err)
});

// const p= new Profile({
//     name:'Ruby GrapeFruit',
//     email:'rahulapple043@gmail.com',
//     bio:'how are you Rahul',
//     phone:8125961154,
//     Age:20,
//     image:'https',
//     gender:'male',
//     address:'Hyderabad'
// })
// p.save().then(p=>{
//     console.log(p)
// })
// .catch(e=>{
//     console.log(e)
// })

const seedProfiles=[
    {
        name:'Rahul',
        email:'rahul@gmail.com',
        bio:'how are you Rahul',
        phone:8125961154,
        age:20,
        image:'https',
        gender:'male',
        address:'Hyderabad'
    },
    {
        name:'Shashank',
        email:'sha@gmail.com',
        bio:'how are you Rahul',
        phone:8125961154,
        age:45,
        image:'https',
        gender:'male',
        address:'Hyderabad'
    },
    {
        name:'Ashritha',
        email:'ashr@gmail.com',
        bio:'how are you Rahul',
        phone:8125961154,
        age:24,
        image:'https',
        gender:'male',
        address:'Hyderabad'
    },
    {
        name:'Bhavani',
        email:'bhav@gmail.com',
        bio:'how are you Rahul',
        phone:8125961154,
        age:19,
        image:'https',
        gender:'male',
        address:'Hyderabad'
    }

]
Profile.insertMany(seedProfiles)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})


