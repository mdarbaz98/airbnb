import { con } from "../config/db.js";
// import { User } from '../models/user.js'

export const register = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
      con.query(`insert into users username, email, password values (?,?,?)`,[username, email, password],(err,result) => {
        if(result) {
            console.log(result)
        }else{
            console.log(err)
        }
     })
    // res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
