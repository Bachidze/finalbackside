import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { CurrentUserDTO } from 'src/users/dto/current-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, user: CurrentUserDTO) {
    const post = await this.postModel.create({
      ...createPostDto,
      userId: user.id,
    });
    await this.usersService.addPost(user.id, post._id);
    return post;
  }

  findAll() {
    return this.postModel.find().populate({
      path: 'userId',
      select: 'email _id',
    });
  }

  findOne(id: string) {
    return this.postModel.findById(id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, {
      ...updatePostDto,
      $inc: { __v: 1 },
    });
  }

  remove(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
