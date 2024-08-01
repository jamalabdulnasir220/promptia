import mongoose from "mongoose";

let isConnected = false; // Tracking the connection status

export const connectToDB = async () => {

    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }

    try {
        
    } catch (error) {
        
    }

}