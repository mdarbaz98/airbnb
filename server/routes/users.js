import express from 'express';
import  { verifyAdmin, verifyUser}  from '../utils/verifyToken.js';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/", verifyAdmin, getAllUser);

export default router;