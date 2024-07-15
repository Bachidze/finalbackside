import mongoose from "mongoose"

export class CurrentUserDTO{
    email:string
    id:mongoose.Schema.Types.ObjectId
}