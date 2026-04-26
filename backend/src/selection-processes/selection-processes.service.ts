import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectionProcess } from './entities/selection-process.entity';

@Injectable()
export class SelectionProcessesService {
  constructor(
    @InjectRepository(SelectionProcess)
    private readonly selectionProcessRepository: Repository<SelectionProcess>,
  ) {}

  findAll() {
    return this.selectionProcessRepository.find();
  }

  findOne(id: string) {
    return this.selectionProcessRepository.findOne({ where: { id } });
  }
}
