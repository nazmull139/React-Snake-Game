const express = require('express');
const User = require('./user.model.js');




const userRegistration = async (req , res ) => {

    try {
        const {username , email , password  } = req.body;
        //console.log("Request body:", req.body);

    
        const user = new User({email , username , password});
        await user.save();
       // console.log("registration",user)

        res.status(201).send({message: "User Registered Successfully!",user});
    } catch (error) {
            console.error("Error registering user",error);
            res.status(500).send({message:"Registration Failed"})
    }


};



const userLoggedIn = async (req , res ) => {

    try {
        const { email , password} = req.body;

       const user =await User.findOne({email});

        if(!user){
            return res.status(404).send({message: "user not found"})
        }

     
        if(password !== user.password){
            return res.status(401).send({message: "password not matched"})
        }



        res.status(200).send({message: "Logged in successfully", user:{
          _id:user._id,
          
          username:user.username,
          role:user.role,
          isPassword:true,
          highScore:user.highScore

        }});


      } catch (error) {
        console.error("Error logged in user",error);
        res.status(500).send({message:"Error logged in user"}); 
      }


}

const userLogOut = async(req,res)=>{
    try {
     
       res.clearCookie('user');
       res.status(200).send({message: "Loggedout successfully"})
   
   
    } catch (error) {
       //console.error("Error logged out as a user",error);
     res.status(500).send({message:"Logged out failed!" , error});

    }
   
   
   }

   const updateHighScore = async (req, res) => {

    try {   
            const {  highScore } = req.body ;
            const {id} = req.params;
            const user = await User.findByIdAndUpdate(id , {highScore}, {new:true});
            if(!user){
                return res.status(404).send({message:"user not found"})
            }
            res.status(200).send({message:"user high score updated successfully" , user});
    
       } catch (error) {
        console.log("Error updating user role",error);
          res.status(500).send({message:"Error updating high score"});
  
    }


   }
   const getHighScore = async (req,res)=> {

    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({message:"user not found"})
        }

       const highScore =  user.highScore;

       res.status(200).send({message:"user high score updated successfully" , user , highScore});

    } catch (error) {
        
    }

   }
   





module.exports = {
    userRegistration  , userLoggedIn , userLogOut , updateHighScore ,getHighScore
}