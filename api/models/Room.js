import mongoose from "mongoose";
const {Schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{ number: Number, unavailableDates: {type: [Date]} }]
},
{timestamps:true})

export default mongoose.model("Room",RoomSchema)

// example
// [
//     {number:101,unavailableDates:[01.02.2023,02.02.2023]}
// ]