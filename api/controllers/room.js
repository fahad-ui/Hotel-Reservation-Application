import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body); //what and all we are passing,  will be created as a new Room

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, //we are pushing unique generated id's for rooms
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async(req,res,next) => {
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateRoom)     
      }catch(err){
          next(err)
      }    
}

export const updateRoomAvailability = async(req,res,next) => {
  try{
      const updateRoomAvailability = await Room.updateOne({"roomNumbers._id":req.params.id},
      {$push:{"roomNumbers.$.unavailableDates":req.body.dates}})
      res.status(200).json(updateRoomAvailability)     
    }catch(err){
        next(err)
    }      
}

export const deleteRoom = async(req,res,next) => {
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id },
            });
          } catch (err) {
            next(err);
          }
       res.status(200).json("Room has been deleted")     
     }catch(err){
         next(err)
     }   
}

export const getRoom = async(req,res,next) => {
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)     
      }catch(err){
        next(err)
      } 
}

export const getAllRooms = async(req,res,next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)     
      }catch(err){
          next(err)
      }  
}
