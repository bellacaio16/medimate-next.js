import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique :true
    },
    password : {
        type : String,
        required : true
    },
    profileURL : {
        type : String,
        required : false
    },
})

export const UserModel = mongoose.models.users || mongoose.model("users", userSchema);