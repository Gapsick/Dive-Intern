import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPost } from './entities/community-post.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private readonly communityPostRepository: Repository<CommunityPost>,
  ) {}

  findAll() {
    return this.communityPostRepository.find();
  }

  findOne(id: string) {
    return this.communityPostRepository.findOne({ where: { id } });
  }
}
