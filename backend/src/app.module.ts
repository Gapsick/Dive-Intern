import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { SchedulesModule } from './schedules/schedules.module';
import { SelectionProcessesModule } from './selection-processes/selection-processes.module';
import { CommunityModule } from './community/community.module';
import { UsersModule } from './users/users.module';
import { GithubModule } from './github/github.module';
import { TechStacksModule } from './tech-stacks/tech-stacks.module';
import { UserCompaniesModule } from './user-companies/user-companies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
    }),
    CompaniesModule,
    SchedulesModule,
    SelectionProcessesModule,
    CommunityModule,
    UsersModule,
    GithubModule,
    TechStacksModule,
    UserCompaniesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}