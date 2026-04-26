import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  findAll() {
    return this.scheduleRepository.find();
  }

  findOne(id: string) {
    return this.scheduleRepository.findOne({ where: { id } });
  }
}
