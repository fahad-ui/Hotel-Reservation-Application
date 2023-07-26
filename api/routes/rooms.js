import express from 'express';
import Hotel from '../models/Hotel.js'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post("/:hotelid",verifyAdmin,createRoom)

//Update
router.put("/:id",verifyAdmin,updateRoom)
router.put("/availability/:id",updateRoomAvailability)

//Delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

//Get
router.get("/:id",getRoom)

//GetAll
router.get("/",getAllRooms)



export default router;