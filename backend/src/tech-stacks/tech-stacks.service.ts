import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from './entities/tech-stack.entity';

// @Injectable() → NestJS의 DI 컨테이너에 등록
@Injectable()
export class TechStacksService {
  constructor(
    // @InjectRepository(TechStack) → TypeORM이 자동으로 만들어주는 Repository 주입
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {}

  // SELECT * FROM tech_stacks
  findAll() {
    return this.techStackRepository.find();
  }

  // SELECT * FROM tech_stacks WHERE id = ?
  findOne(id: string) {
    return this.techStackRepository.findOne({ where: { id } });
  }

  // INSERT INTO tech_stacks ...
  // create(createTechStackDto: CreateTechStackDto) {
  //   const techStack = this.techStackRepository.create(createTechStackDto);
  //   return this.techStackRepository.save(techStack);
  // }

  // UPDATE tech_stacks SET ... WHERE id = ?
  // update(id: string, updateTechStackDto: UpdateTechStackDto) {
  //   return this.techStackRepository.update(id, updateTechStackDto);
  // }

  // DELETE FROM tech_stacks WHERE id = ?
  // remove(id: string) {
  //   return this.techStackRepository.delete(id);
  // }
}
