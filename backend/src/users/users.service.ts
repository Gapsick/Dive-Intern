import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GithubProfile } from '../github/entities/github-profile.entity';

interface OnboardingDto {
  student_id: string;
  desired_position?: string;
  portfolio_url?: string;
  github_url?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(GithubProfile)
    private readonly githubProfileRepository: Repository<GithubProfile>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(studentId: string) {
    return this.userRepository.findOne({ where: { student_id: studentId } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async completeOnboarding(currentStudentId: string, dto: OnboardingDto) {
    await this.userRepository.update(currentStudentId, {
      student_id: dto.student_id,
      desired_position: dto.desired_position,
      portfolio_url: dto.portfolio_url,
    });

    // GitHub URL 입력했으면 github_profiles에 저장
    if (dto.github_url) {
      const username = dto.github_url.replace('https://github.com/', '').replace(/\/$/, '');
      const profile = this.githubProfileRepository.create({
        user: { student_id: dto.student_id },
        github_username: username,
      });
      await this.githubProfileRepository.save(profile);
    }

    return this.userRepository.findOne({ where: { student_id: dto.student_id } });
  }
}
