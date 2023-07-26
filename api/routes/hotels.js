import express from 'express';
import Hotel from '../models/Hotel.js'
import { countByCity, countByType,createHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post("/",verifyAdmin,createHotel)

//Update
router.put("/:id",verifyAdmin,updateHotel)

//Delete
router.delete("/:id",verifyAdmin,deleteHotel)

//Get
router.get("/find/:id",getHotel)

//GetAll
router.get("/",getAllHotel)



router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/rooms/:id",getHotelRooms)



export default router;