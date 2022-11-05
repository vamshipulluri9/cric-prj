 const express=require("express");
 const app=express();
 const mongoose=require("mongoose");
 const path=require("path");
 const Player=require("./models/player");
 const methodOverride=require('method-override');

 app.listen(28,(req,res)=>{
  console.log("server is on");
 })

 main().catch(err => console.log(err));
 async function main() {
   console.log("connection to database");
   await mongoose.connect('mongodb://127.0.0.1:27017/cric_app');
 }

 app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride('_method'));
 
 app.get("/",(req,res)=>{
  res.redirect('/playersList');
 })

 app.get("/register",async (req,res)=>{
    res.render("register");
 })

 app.post('/register',async (req,res)=>{
  const player=new Player(req.body);
  await player.save();
  res.redirect('/playersList');
 })

 app.get('/playersList',async (req,res)=>{
  const players=await Player.find({});
  res.render('list',{players});
 })

 app.get('/player/:id',async(req,res)=>{
  const player=await Player.findById(req.params.id);
  res.render('player',{player});
 })

 app.get('/player/:id/update',async(req,res)=>{
  const id=req.params.id;
  const player=await Player.findById(id);
  res.render('update',{player});
 })

 app.put('/player/:id/update',async (req,res)=>{
  const id=req.params.id;
  await Player.findByIdAndUpdate(id,{...req.body});
  req.redirect(`/player/${id}`);
 })

 app.delete('/player/:id/delete',async (req,res)=>{
  const id=req.params.id;
  await Player.findByIdAndDelete(id);
  res.redirect('/playersList');
 })