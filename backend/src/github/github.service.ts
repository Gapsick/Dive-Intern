import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubProfile } from './entities/github-profile.entity';

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(GithubProfile)
    private readonly githubProfileRepository: Repository<GithubProfile>,
  ) {}

  findAll() {
    return this.githubProfileRepository.find();
  }

  findOne(id: string) {
    return this.githubProfileRepository.findOne({ where: { id } });
  }
}
