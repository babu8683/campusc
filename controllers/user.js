
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import { sendCookie } from '../utils/feature.js';
import nodemailer from 'nodemailer'




export const loginUser = async (req,res) => {
  const {email,password} = req.body

  const user = await User.findOne({email}).select("+password")

  if(!user)
  return res.status(404).json({
    success : false,
    message : "Invalid Email Or Password..."
  })

  const isMatch = password;

  if(!isMatch)
  return res.status(404).json({
    success : false,
    message : "Invalid Email or Password..."
  })

  sendCookie(user, res, `Welcome Back, ${user.name}`, 200)
}


export const registerUsers = async (req, res) => {
 const { name, email , age, phone, role, lastname } = req.body;

 const  password = Math.floor(Math.random() * 90000000) + 10000000;
 console.log(password);
   

 let user = await User.findOne({email})

 if(user)
  return res.status(404).json({
    success : false,
    message : "User Already Exist"
  })

 //const hashPassword = await bcrypt.hash(password,10)
 //console.log(hashPassword);



  
user = await User.create({
  name,
  email,
  password,
  age,
  phone,
  role,
  lastname,
  // password: user.hashPassword,
});

sendCookie(user, res, "Registed Successfully...,", 201);

if (user.statusCode == 201) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gina.koelpin1@ethereal.email", // generated ethereal user
      pass: "dzYuz4hwJCpt6C8275", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const msg = {
    from: "Campus Crate <CampusCrate@example.com>", // sender address
    to: `${email}`, // list of receivers
    subject: "Login Detail", // Subject line
    text:
      "Your UserName is : " +
      `${email} ` +
      "Your Password is : " +
      `${password} `, // plain text body
  };
  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
    

};


export const getMyProfile = (req,res) => {
  res.status(200).json({
    success: true,
    user : req.user,
  });
}

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};