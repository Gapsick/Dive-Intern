import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityPost } from './entities/community-post.entity';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityPost])],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
