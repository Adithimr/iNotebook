const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "adithiisagoodg$irl";

// ROUTE1:create a user using :POST "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "enter the valid name").isLength({ min: 3 }),
    body("email", "enter the valid email").isEmail(),
    body("password", "password must 5 character atleast").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether user exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ error: "Sorry user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({success, authtoken });
      
    
    
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE2 authenticate a user using :POST "/api/auth/login". no login required
router.post(
  "/login",
  [body("email", "enter the valid email").isEmail(),
  body("password", "password cann't be blank").exists(),
],
  async (req, res) => {
    let success = false;

    //if there are errors,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password} = req.body
    try {
        //check whether user exists already
        let user = await User.findOne({ email});
        if (!user) {
          success = false
          return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
          success = false
          return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        // res.json(user);
     
        res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//ROUTE3 Get loggedin user details using :POST "/api/auth/getuser". login required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
try {
  const userId = req.user.id
  const user = await User.findById(userId).select("-password")
  res.send(user)
  success = true
} catch (error) {
  console.error(error.message);
      res.status(500).send("Internal server error");
}
});
module.exports = router;
 