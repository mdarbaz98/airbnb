import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from '../controllers/room.js';

const router = express.Router();

router.post("/", createRoom);
router.get("/:id", getRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/", getAllRoom);

export default router;