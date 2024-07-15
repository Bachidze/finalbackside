import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Post {

    _id:mongoose.Schema.Types.ObjectId

    @Prop()
    title:string

    @Prop()
    content:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    userId:mongoose.Schema.Types.ObjectId

}


export const PostsSchema = SchemaFactory.createForClass(Post)
