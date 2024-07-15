import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name)private userModel:Model<User>){}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async addPost(userId:mongoose.Schema.Types.ObjectId,postId:mongoose.Schema.Types.ObjectId){
    const user = await this.userModel.findById(userId)
    user.posts.push(postId)
    await user.save()
  }

  findAll() {
    return this.userModel.find();
  }

  findByEmail(email:string){
    return this.userModel.findOne({email}).select(['email','password','_id'])
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
