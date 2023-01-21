const express = require('express');
const app = express();
const mongoose=require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const {isLoggedIn}=require('./middleware');

const userRoutes=require('./routes/users');
const Profile = require('./models/profile');
const { Console } = require('console');

mongoose.connect('mongodb://127.0.0.1:27017/404NF')
.then(()=>{console.log("Mongoose Connection open!!!")})
.catch(err=>{
    console.log('Oh No!! mongoose connection error!!');
    console.log(err)
});


app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
console.log("hey");

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',userRoutes)




const genders =['male','female','other'];

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/profiles',isLoggedIn,async(req,res)=>{
    const profiles= await Profile.find({})
    console.log(profiles)
    // res.send("Hey!! all profiles here!")
    // const profiles = await Profile.find({})
    // console.log(profiles)
    res.render('profiles/index',{profiles})
})

app.get('/profiles/new',(req,res)=>{
    res.render('profiles/new',{genders})
})

app.post('/profiles',async (req,res)=>{
    // console.log(req.body)
    // res.send('making your profile')
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.redirect(`/profiles/${newProfile._id}`)
})

app.get('/profiles/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const profile =await Profile.findOne({_id: id})
    // console.log(profile)
    // res.send('details page')
    res.render('profiles/show',{profile})
})

app.get('/profiles/:id/edit',async (req,res)=>{
    const { id }=req.params;
    const profile = await Profile.findById(id);
    res.render('profiles/edit',{profile,genders})
})

app.put('/profiles/:id',async(req,res)=>{
    // console.log(req.body);
    // res.send('PUT!!!!')
    const { id } = req.params;
    const profile =await Profile.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/profiles/${profile._id}`);
})

// app.delete('/profiles/:id',async (req,res)=>{
//     const { id } = req.params;
//     const deletedprofile =await profile.findByIdAndDelete(id);
//     res.redirect('/profiles');
// })

app.listen(3000,()=>{
    console.log("APP IS LISTENING ON PORT 3000!")
})