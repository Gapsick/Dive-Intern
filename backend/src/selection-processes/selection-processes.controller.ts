import { Controller, Get, Param } from '@nestjs/common';
import { SelectionProcessesService } from './selection-processes.service';

@Controller('selections')
export class SelectionProcessesController {
  constructor(
    private readonly selectionProcessesService: SelectionProcessesService,
  ) {}

  @Get()
  findAll() {
    return this.selectionProcessesService.findAll();
  }

  // 지원 현황 페이지에서 조회 
  // - 학생이 지원리스트 + 전형 단계, 다음 일정, AI 매칭 점수 등을 한 번에 조회
  @Get('student/:studentId')
  findByStudentId(@Param('studentId') studentId: string) {
    return this.selectionProcessesService.findByStudentId(studentId);
  }

  @Get(':id/interview-detail')
  getInterviewDetail(@Param('id') id: string) {
    return this.selectionProcessesService.getInterviewDetail(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionProcessesService.findOne(id);
  }
}
