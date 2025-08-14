import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){

     // Production level if this is occuring error remove/delete the opts
     const opts = {
        bufferCommands: true,
        maxPoolSize: 10,
     }

        mongoose
        .connect(MONGODB_URI, opts)
        .then(() => {
            return mongoose.connection;
        });
    }

    try{
    cached.conn = await cached.promise;
    }
    catch(error){
        console.error(error);
        throw error;
    }
    return cached.conn;
}
