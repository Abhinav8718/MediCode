require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const userModel = require('./Schema/userSchema');
const nodemailer=require('nodemailer');
const OtpModel = require('./Schema/otpSchema');
const productModel = require('./Schema/products');
const cors=require("cors");
const bcrypt=require("bcryptjs");
const app=express();
const router = express.Router();




app.use(express.json());
app.use(cors());

const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const userexist = await user.findOne({ email });
      console.log(userexist);
      if (!userexist) {
          return res.status(400).json({ message: "invalid credentials" });
      }
      const passwordvalid = await bcrypt.compare(password, userexist.password);
      if (passwordvalid) {
          res.status(200).json({
              msg: "registration successful",
              token: await userexist.generatetoken(),
              userId: userexist._id.toString(),
          });
      } else {
          res.status(401).json({ message: "invalid login" });
      }
  } catch (error) {
      //res.status(500).json("internal server error");
      next(error);
  }
};


const validate=(schema)=>async(req,res,next)=>{
  try {
    const parseBody=schema.parse(req.body);
    console.log("abcd")
    req.body=parseBody;
    next();
  } catch (err) {

    const status=422;
    const error=new Error("validation failed");
    console.log(error);
    res.status(400).json({msg:"validation failed"})
    next(error);
  }
};
// const register = async (req, res) => {
//   try {
//       console.log(req.body);
//       //const data=req.body
//       const { username, email, phone, password } = req.body;

//       const userexist = await user.findOne({ email });
//       if (userexist) {
//           return res.status(400).json({ msg: "email already exists" });
//       }
//       //hash the password
//       const saltround = 10;
//       const hash_password = await bcrypt.hash(password, saltround);
//       const usercreated = await user.create({ username, email, phone, password: hash_password });
//       res.status(201).json({
//           msg: "registration successful", token: await usercreated.generatetoken(),
//           userId: usercreated._id.toString(),
//       });
//   } catch (error) {
//       res.status(500).json({ msg: "page not found" });
//   }

// }

const register = async (req, res) => {
  try {
      console.log(req.body);
      //const data=req.body
      const { username,  phone, password,email } = req.body;

      const userexist = await user.findOne({ email:email });
      if (userexist) {
          return res.status(400).json({ msg: "email already exists" });
      }
      //hash the password
      const saltRound = 10;
      const hash_password = await bcrypt.hash(password, saltRound);
      const usercreated = await user.create({ username, phone, password: hash_password,email });
      res.status(201).json({
          msg: usercreated, token: await usercreated.generateToken(),
          userId: usercreated._id.toString(),
       });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "page not found" });
      // next(error);
  }

}
router.route("/register").post(register);

// const transport=nodemailer.createTransport({
//   host:'smtp.ethereal.email',
//   port:587,
//   auth:{
//       user:"providenci.cassin68@ethereal.email",
//       pass:"qcV1nAUqzGhFJab7q8"
//   }
// });

// //sending user otp in his email
// app.post('/sendOtp',async (req,res)=>{
//   let emailid=req.body.email;
//   if(emailid===""){
//       return res.send({"errormsg":"Email id is Maindatory"})
//   }
//   else{
//   let otp=Math.floor(Math.random()*9000) + 1000;
//   await transport.sendMail({
//       from:"<providenci.cassin68@ethereal.email>",
//       to:`${emailid}`,
//       subject:"urgent",
//       text:`Your verification Otp is ${otp}`
//   }).then(async(e)=>{
//       const check= await OtpModel.find({email:emailid});                  //reset the otp if present with same email
//       if(check.length>=1){
//           await OtpModel.deleteMany({email:emailid});   
//       }
//       const otpsave= new OtpModel({otp:otp,email:emailid});
//       otpsave.save();
//       res.status(200).send({'msg':'Otp send successfully',otp})})
//   .catch(e=>res.send({"errormsg":e}))
// }
// });


// // For verifying the otp
// app.post('/verify',async(req,res)=>{
//   let check=req.body;
//   let verify= await OtpModel.find({email:check.email,otp:check.otp});    
//   if(verify.length==1){
//   res.status(200).send({"msg":"Verified Successfully"});
//   OtpModel.deleteOne({email:check.email,otp:check.otp});
//   }
//   else
//   res.status(404).send({"errormsg":"incorrect Otp"});
// })

// //user Signup
// app.post('/signup',async (req,res)=>{
//   let data=req.body;
//   if(data.email){
//          const check= await userModel.find({email:data.email});                                                    // checking that user already present
//      try{    if(check.length>0){
//                res.status(200).send(check)      // return already present if present in db
//           } 
//         else{
//               const user=new userModel(data);
//               user.save((err,result)=>
//               {
//                   if(!err){
//                       res.status(201).send([user])                                      //sending data to frondend
//                   }else
//                   {
//                     console.log(err)
//                      res.status(400).send({'errormsg':'something went wrong'})
//                   }
//               });
//         }}
//         catch(err){
//           console.log("err",err)
//         }
         
//       }
//   else{
//       res.status(400).send({'errormsg':'all field mandetory'});                       //error if some feild is blank
//   }
// });

//updating user
app.post('/updateUser',async (req,res)=>{
  let data=req.body;
  if(data.email){
         const check= await userModel.find({email:data.email});              // checking that user already present
         if(check.length>0){     
              const user= await userModel.updateOne({email:data.email},data);
              res.send(user)
        }
        else {
            res.send({'errormsg':'email not found'});
        }   
  }
  else{
      res.status(400).send({'errormsg':'all field mandetory'});                       //error if some feild is blank
  }
});


//used for inserting data in database mongo
/* app.post('/ppp',async(req,res)=>{
    const data=req.body;
    console.log(data);
    try{
      for(let i=0;i<data.length;i++){
        const user=new productModel(data[i]);
        user.save();
      }
    }
    catch(err){
      res.status(400).send({'errormsg':'something went wrong'})
    }
      res.status(201).send(data)                                      
}) */

//fetch data categorywise
app.get('/products',async(req,res)=>{
  if(req.query.category){
    const data=await productModel.find({category:req.query.category});
    res.send(data);
  }
  else if(req.query.name){
    const data=await productModel.find({name:{ $regex: `${req.query.name}`, $options: 'i' }});
    res.send(data)
  }
  else{
    const data=await productModel.find();
    res.send(data);
  }
 
})

//fetch medicine name using id
app.get('/products/:id',async(req,res)=>{
  let id=req.params.id;
  const data=await productModel.find({_id:id});
  res.send(data)
})

const PORT=5000;
const uri= "mongodb+srv://Abhinav:Abhinav_2004@cluster0.soflmp9.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";


const connectDb=async()=>{
 try{
    await mongoose.connect(uri);
    console.log("connected");
 }
 catch(error)
 {
    console.error("database not connected");
    process.exit(0);
 }
};
connectDb().then(()=>{
  app.listen(PORT,()=>{
      console.log(`server is running at port :${PORT}`);
  });
  });
  