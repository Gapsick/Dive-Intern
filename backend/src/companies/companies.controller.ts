import { Controller, Get, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';

// @Controller('companies') → /api/companies 경로의 진입점
// main.ts의 globalPrefix('api')와 합쳐져서 /api/companies가 됨
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // GET /api/companies → 전체 기업 목록 조회
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  // GET /api/companies/:id → 특정 기업 조회
  // @Param('id')로 URL의 :id 값을 꺼내옴
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  // POST /api/companies → 기업 생성
  // @Post()
  // create(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companiesService.create(createCompanyDto);
  // }

  // PATCH /api/companies/:id → 기업 정보 수정
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companiesService.update(id, updateCompanyDto);
  // }

  // DELETE /api/companies/:id → 기업 삭제
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companiesService.remove(id);
  // }
}
