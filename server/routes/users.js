import express from 'express';
import  {verifyToken, verifyUser}  from '../utils/verifyToken.js';

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    res.status(200).json("verify")
});
router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.status(200).json("verify")
});

export default router;