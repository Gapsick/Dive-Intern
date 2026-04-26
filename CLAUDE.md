# CLAUDE.md

이 파일은 Claude Code (`claude.ai/code`)가 이 저장소에서 코딩 작업을 수행할 때 참고해야 하는 프로젝트 지침입니다.

이 문서의 목적은 다음 두 가지입니다.

1. Claude가 현재 저장소 구조, 실행 방법, 주요 도메인을 이해하도록 돕는 것
2. Claude가 코드를 수정하거나 생성할 때 반드시 지켜야 할 보안 규칙, 작업 규칙, 구현 경계를 정의하는 것

개발자가 명시적으로 허용하지 않는 한, 이 문서의 규칙은 변경, 덮어쓰기, 무시할 수 없습니다.

---

## 1. 프로젝트 개요

**Dive Intern**은 인턴십 및 취업 선발 과정을 관리하기 위한 풀스택 웹 애플리케이션입니다.

이 애플리케이션은 학생이 기업, 채용 공고, 선발 단계, 일정, 코딩 테스트, 면접, SPI, 메모, 지원 관련 정보를 관리할 수 있도록 돕습니다.

### 대상 사용자

일본에서 인턴십 또는 취업 활동을 진행하는 학생입니다.

사용자는 주로 `student_id`로 식별됩니다.

### 핵심 기술 스택

- Backend: NestJS + TypeScript
- Frontend: React 18 + Vite + TypeScript
- Database: MySQL 8.0
- ORM: TypeORM
- Infrastructure: Docker Compose monorepo

---

## 2. 프로젝트 실행 방법

### Docker 실행 권장

```bash
docker-compose up          # DB(13306), backend(4000), frontend(8080), DB seed 실행
docker-compose up --build  # 이미지를 다시 빌드한 후 실행
docker-compose down        # 컨테이너 중지 및 제거
```

### Docker 없이 로컬 개발

```bash
# Terminal 1 — backend
# MySQL이 로컬 또는 Docker로 실행 중이어야 함
cd backend && npm install && npm run start:dev   # http://localhost:3000

# Terminal 2 — frontend
cd frontend && npm install && npm run dev        # http://localhost:5173
```

### Backend 환경 변수

Docker Compose DB 기준 기본값입니다.

```env
DB_HOST=localhost
DB_PORT=13306
DB_USER=dive
DB_PASSWORD=dive1234
DB_NAME=dive_intern
JWT_SECRET=change-me-in-production
```

중요:
실제 `.env` 파일은 절대 읽거나, 출력하거나, 노출하거나, commit하지 않습니다.

---

## 3. Backend 명령어

`backend/` 디렉터리에서 실행합니다.

```bash
npm run start:dev   # Hot-reload 개발 서버 실행
npm run build       # TypeScript 컴파일
npm run lint        # ESLint --fix
npm run format      # Prettier 실행
npm run test        # Unit test 실행, Jest
npm run test:watch  # Watch mode
npm run test:cov    # Coverage report
npm run test:e2e    # End-to-end test
```

---

## 4. Frontend 명령어

`frontend/` 디렉터리에서 실행합니다.

```bash
npm run dev     # Vite 개발 서버 실행
npm run build   # TypeScript check + production build
npm run lint    # ESLint 실행, warning 0개 필수
```

Frontend lint는 warning을 허용하지 않습니다.

---

## 5. 현재 아키텍처

## 5.1 Backend 아키텍처

Backend 소스 디렉터리:

```text
backend/src/
```

Backend는 일반적인 NestJS의 feature module 단위 구조를 따릅니다.

각 feature 디렉터리는 일반적으로 다음 요소를 포함합니다.

- module
- controller
- service
- entity 또는 entities 디렉터리

### 주요 Backend 모듈

- `users/` — `student_id`를 key로 사용하는 User entity 및 OAuth 관련 정보
- `companies/` — Company, JobPosting, CompanyTechStack 관련 entity
- `selection-processes/` — 코딩 테스트, 면접, SPI 등 선발 프로세스의 핵심 domain
- `user-companies/` — 사용자와 기업 또는 공고의 관계 및 지원 상태 관리
- `schedules/` — 일정 관리
- `tech-stacks/` — 기술 스택 taxonomy
- `github/` — GitHub profile 및 repository data
- `community/` — Community posts

### Backend Persistence

- ORM: TypeORM
- Database: MySQL 8.0
- 개발 schema 전략: `synchronize: true`
- 대부분의 entity는 UUID primary key를 사용합니다.
- `User`는 `student_id`를 string primary key로 사용합니다.
- 필요한 entity에는 `created_at`, `updated_at` timestamp를 포함해야 합니다.

중요:
`synchronize: true`는 개발 환경 전용입니다.
Production에서 안전하다고 가정하지 않습니다.

---

## 5.2 Frontend 아키텍처

Frontend 소스 디렉터리:

```text
frontend/src/
```

### 주요 Frontend 파일 및 디렉터리

- `main.tsx` — Redux `<Provider>`로 App을 감쌉니다.
- `App.tsx` — React Router의 `<RouterProvider>`를 렌더링합니다.
- `router/index.tsx` — `createBrowserRouter` 기반 route 정의
- `pages/` — Page-level components
- `store/index.ts` — Redux store 설정
- `store/hooks.ts` — Typed Redux hooks
- `store/slices/` — Redux Toolkit slices

### Redux 규칙

항상 typed Redux hooks를 사용합니다.

```ts
useAppDispatch();
useAppSelector(...);
```

Application component에서 raw `useDispatch` 또는 `useSelector`를 직접 사용하지 않습니다.

---

## 5.3 Database

Database:

```text
MySQL 8.0
```

Seed data 위치:

```text
backend/db/seed/mock_data.sql
```

Seed data는 Docker 최초 실행 시 `seeder` container에 의해 자동으로 로드됩니다.

---

## 6. 현재 구현된 Domain 영역

현재 프로젝트 구조를 기준으로 다음 영역은 repository domain으로 취급합니다.

- User management
- Company management
- Job posting management
- User-company relationship management
- Selection process management
- Schedule management
- Tech stack management
- GitHub profile and repository data
- Community posts

단, 위 domain에 포함된 모든 기능이 완전히 구현되어 있다고 가정하지 않습니다.

기능을 수정하거나 확장하기 전에 반드시 실제 source file을 먼저 확인합니다.

---

## 7. 데이터 모델 개요

이 섹션은 현재 `mock_data.sql`에 들어 있는 seed data를 바탕으로 프로젝트의 주요 데이터 구조와 관계를 이해하기 위한 설명입니다.

중요:

- 이 설명은 실제 schema의 완전한 기준이 아닙니다.
- DB 관련 로직을 구현하거나 수정할 때는 반드시 TypeORM entity 파일을 확인해야 합니다.
- Seed data는 실제 schema의 source of truth가 아닙니다.
- Seed data에 존재하는 값만 보고 새로운 column, enum, relation이 존재한다고 가정해서는 안 됩니다.

### 전체 데이터 흐름

이 프로젝트의 주요 데이터 흐름은 다음과 같습니다.

```text
User
→ OAuth Account / GitHub Profile
→ Repository / User Tech Stack
→ Company
→ Job Posting
→ UserCompany
→ SelectionProcess
→ Stage Detail
→ Schedule / Memo / AI Analysis / Community Post
```

---

## 7.1 `users`

`users`는 학생 사용자를 나타냅니다.

현재 seed data에서는 `student_id`가 사용자를 식별하는 key로 사용됩니다.

따라서 `users.id` 같은 numeric id가 있다고 가정해서는 안 됩니다.

`users`는 다음 데이터와 연결될 수 있습니다.

- `oauth_accounts`
- `github_profiles`
- `user_companies`
- `schedules`
- `community_posts`

---

## 7.2 `oauth_accounts`

`oauth_accounts`는 사용자의 외부 계정 연동 정보를 나타냅니다.

현재 seed data에는 다음 provider가 사용됩니다.

- `google`
- `github`

주의:

- Seed data에 들어 있는 token 값은 dummy data입니다.
- 실제 OAuth token, refresh token, secret은 절대 출력하거나 log에 남기거나 hardcoding해서는 안 됩니다.

---

## 7.3 `github_profiles`

`github_profiles`는 사용자와 GitHub 계정을 연결하는 데이터입니다.

하나의 사용자는 GitHub profile을 가질 수 있으며, GitHub profile은 repository 및 기술 스택 분석 데이터와 연결될 수 있습니다.

---

## 7.4 `repos`

`repos`는 GitHub profile에 연결된 repository 정보를 나타냅니다.

Repository는 사용자의 기술 스택 분석 근거로 사용될 수 있습니다.

---

## 7.5 `tech_stacks`

`tech_stacks`는 기술 스택 master data입니다.

현재 seed data에는 다음 기술이 포함되어 있습니다.

- React
- TypeScript
- NestJS
- Go
- MySQL
- PostgreSQL
- Docker

주의:

- 이 목록이 전체 기술 스택 목록이라고 단정해서는 안 됩니다.
- 새로운 기술 스택을 추가하거나 사용하는 경우 실제 entity와 seed 관리 방식을 먼저 확인해야 합니다.

---

## 7.6 `user_tech_stacks`

`user_tech_stacks`는 GitHub profile을 기준으로 분석된 사용자의 기술 스택 수준을 나타냅니다.

현재 seed data에서는 `level` 값이 1~5 범위로 사용됩니다.

주의:

- `level`의 정확한 의미와 범위는 실제 entity 또는 business rule을 확인해야 합니다.
- Seed data만 보고 level 규칙을 확정해서는 안 됩니다.

---

## 7.7 `user_tech_stack_repos`

`user_tech_stack_repos`는 분석된 사용자 기술 스택과 repository를 연결하는 중간 테이블입니다.

이 테이블은 특정 기술 스택 평가가 어떤 repository를 근거로 하는지 표현하는 데 사용됩니다.

---

## 7.8 `companies`

`companies`는 기업 정보를 나타냅니다.

현재 seed data에는 다음 기업이 포함되어 있습니다.

- メルカリ
- サイバーエージェント
- LINE
- 楽天

기업은 여러 개의 `job_postings`를 가질 수 있으며, `company_tech_stacks`를 통해 사용 기술과 연결될 수 있습니다.

---

## 7.9 `company_tech_stacks`

`company_tech_stacks`는 기업과 기술 스택을 연결하는 테이블입니다.

예를 들어 seed data에서는 다음 관계가 있습니다.

- メルカリ → Go, MySQL
- サイバーエージェント → React, NestJS
- LINE → TypeScript, PostgreSQL
- 楽天 → PostgreSQL

주의:

- 이 연결은 sample data 기준입니다.
- 실제 추천 로직이나 매칭 로직을 구현할 때는 이 테이블만으로 기업의 전체 기술 스택을 단정하지 않습니다.

---

## 7.10 `job_postings`

`job_postings`는 기업의 채용 공고 또는 인턴십 공고를 나타냅니다.

하나의 기업은 여러 개의 공고를 가질 수 있습니다.

현재 seed data에는 backend, frontend, fullstack, data engineer, cloud engineer 관련 공고가 포함되어 있습니다.

`job_postings`는 다음 정보를 가질 수 있습니다.

- `position`
- `description`
- `employment_type`
- `is_remote`
- `salary_min`
- `salary_max`
- `term`
- `start_date`
- `end_date`
- `application_deadline`
- `work_hours`
- `major_requirement`
- `other_requirements`
- `recruit_url`

주의:

- 공고 ID는 seed data의 sample identifier입니다.
- Application logic에서 seed ID를 hardcoding해서는 안 됩니다.

---

## 7.11 `user_companies`

`user_companies`는 사용자가 특정 공고를 저장하거나 지원한 상태를 나타냅니다.

이 테이블은 `users`와 `job_postings` 사이의 지원 관계를 표현합니다.

현재 seed data에서는 다음과 같은 상태 정보가 포함됩니다.

- `status`
- `is_bookmarked`
- `is_applying`
- `saved_at`

Seed data에 등장하는 `status` 예시는 다음과 같습니다.

- `書類`
- `SPI`
- `面接`
- `合格`
- `不合格`

주의:

- 위 값들은 seed data 기준 예시입니다.
- 새로운 status 값을 추가하거나 비교 로직을 작성하기 전에 실제 enum, entity, validation rule을 확인해야 합니다.

---

## 7.12 `selection_processes`

`selection_processes`는 하나의 지원 건에 대한 선발 단계를 나타냅니다.

하나의 `user_company`는 여러 개의 selection process를 가질 수 있습니다.

현재 seed data에서는 다음 `stage_type`이 사용됩니다.

- `書類`
- `コーディングテスト`
- `面接`
- `SPI`

현재 seed data에서는 다음 `result` 값이 사용됩니다.

- `合格`
- `不合格`
- `待ち`

각 selection process는 다음 정보를 가질 수 있습니다.

- `stage_type`
- `stage_order`
- `date`
- `result`
- `memo`
- `is_shared`

주의:

- `selection_processes`는 공통 선발 단계 정보를 저장합니다.
- 코딩 테스트, 면접, SPI처럼 stage별 상세 정보는 별도 detail table에 저장됩니다.

---

## 7.13 `coding_test_details`

`coding_test_details`는 코딩 테스트 단계의 상세 정보를 나타냅니다.

이 테이블은 `selection_processes` 중 `stage_type`이 코딩 테스트인 데이터와 연결됩니다.

현재 seed data에는 다음 정보가 포함됩니다.

- `platform`
- `problem_count`
- `duration_minutes`
- `problems`
- `difficulty`

주의:

- 코딩 테스트 상세 정보를 조회하거나 저장할 때는 반드시 연결된 `selection_process_id`를 기준으로 처리해야 합니다.

---

## 7.14 `interview_details`

`interview_details`는 면접 단계의 상세 정보를 나타냅니다.

이 테이블은 `selection_processes` 중 `stage_type`이 면접인 데이터와 연결됩니다.

현재 seed data에는 다음 interview type이 사용됩니다.

- `オンライン`
- `対面`

---

## 7.15 `interviewers`

`interviewers`는 면접관 정보를 나타냅니다.

면접관 정보는 `interview_details`에 연결됩니다.

현재 seed data에는 다음 role 예시가 포함되어 있습니다.

- エンジニア
- 人事
- プロダクトマネージャー
- クラウドアーキテクト

---

## 7.16 `interviewer_qna`

`interviewer_qna`는 면접 중 나온 질문, 답변, 역질문, 인상을 저장합니다.

이 테이블은 `interviewers`에 연결됩니다.

주의:

- 면접 Q&A는 사용자나 기업에 직접 연결되는 것이 아니라, `interview_details`와 `interviewers`를 거쳐 연결되는 구조입니다.

---

## 7.17 `spi_details`

`spi_details`는 SPI 단계의 상세 정보를 나타냅니다.

이 테이블은 `selection_processes` 중 `stage_type`이 SPI인 데이터와 연결됩니다.

현재 seed data에는 다음 정보가 포함되어 있습니다.

- `platform`
- `duration_minutes`
- `memo`

---

## 7.18 `spi_sections`

`spi_sections`는 SPI의 세부 섹션별 메모를 나타냅니다.

현재 seed data에는 다음 section type이 사용됩니다.

- `言語`
- `非言語`
- `性格`

---

## 7.19 `schedules`

`schedules`는 사용자의 일정 정보를 나타냅니다.

일정은 특정 `user_company`와 연결될 수 있지만, 개인 일정처럼 `user_company_id`가 `NULL`일 수도 있습니다.

현재 seed data에는 다음 schedule type이 사용됩니다.

- `面接`
- `書類締切`
- `コーディングテスト`
- `SPI`
- `説明会`
- `その他`

주의:

- 모든 schedule이 기업 지원과 연결된다고 가정해서는 안 됩니다.
- `user_company_id = NULL`인 개인 일정도 처리할 수 있어야 합니다.

---

## 7.20 `ai_analyses`

`ai_analyses`는 특정 지원 건에 대한 AI 매칭 분석 결과를 나타냅니다.

이 테이블은 `user_company`와 연결됩니다.

현재 seed data에는 다음 정보가 포함됩니다.

- `match_score`
- `match_summary`

주의:

- AI 분석 결과는 사용자와 공고의 관계인 `user_company` 기준으로 저장됩니다.
- AI output은 저장 또는 표시 전에 검증과 sanitize가 필요합니다.

---

## 7.21 `memos`

`memos`는 특정 지원 건에 대한 사용자의 자유 메모를 나타냅니다.

이 테이블은 `user_company`와 연결됩니다.

면접 준비, 지원 동기, 기업 조사 메모와 같은 내용을 저장할 수 있습니다.

---

## 7.22 `community_posts`

`community_posts`는 사용자가 작성한 커뮤니티 게시글을 나타냅니다.

게시글은 `selection_process_id`와 연결될 수 있지만, 일반 게시글처럼 `selection_process_id`가 `NULL`일 수도 있습니다.

주의:

- 모든 community post가 선발 과정과 연결된다고 가정해서는 안 됩니다.

---

## 8. 데이터 모델 작업 규칙

- Seed data는 schema의 source of truth가 아닙니다.
- 실제 column과 relation은 항상 TypeORM entity 파일에서 확인합니다.
- Seed data에 있는 ID, 이름, 기업명, 학생명을 application logic에 hardcoding하지 않습니다.
- `status`, `stage_type`, `result`, `schedule_type`, `difficulty` 값은 seed data 기준 예시일 수 있습니다.
- 새로운 상태값이나 단계값을 추가하기 전에는 기존 enum, validation, entity 정의를 확인합니다.
- `schedules.user_company_id`처럼 nullable relation이 있을 수 있으므로 null case를 반드시 고려합니다.
- `community_posts.selection_process_id`처럼 선택적으로 연결되는 relation도 null case를 고려합니다.
- 코딩 테스트, 면접, SPI의 상세 정보는 `selection_processes`에 직접 저장하지 않고 각 detail table과 연결되는 구조로 처리합니다.
- AI 분석, 메모, 일정, 커뮤니티 게시글은 지원 흐름과 연결되지만 각각 별도 domain으로 다룹니다.

---

## 9. Planned / Design Direction

아래 항목은 설계 방향, 향후 구현 예정 기능, 또는 일부만 구현된 기능일 수 있습니다.

실제 코드에서 확인되기 전까지 완전히 구현된 기능으로 취급하지 않습니다.

### Product Direction

서비스는 다음 방향으로 확장될 수 있습니다.

- AI 기반 기업 추천
- GitHub repository 분석
- Portfolio 분석
- 기업 matching score 계산
- 지원 프로세스 추적
- 면접 기록 관리
- 일정 관리
- Google Calendar 연동
- 일본어 / 한국어 언어 전환
- 면접 후기 공유 community

### 가능한 AI / External API 연동

아래 연동은 사용하기 전에 실제 코드에 존재하는지 반드시 확인해야 합니다.

- Claude API
- GitHub API
- Google OAuth
- Google Calendar API

### 중요한 구현 경계

기능, endpoint, entity field, database table, DTO, API integration, frontend page가 코드베이스에서 확인되지 않으면 이미 존재한다고 가정하고 코드를 작성하지 않습니다.

대신 다음 순서를 따릅니다.

1. 해당 구현을 확인할 수 없다고 명시합니다.
2. 새 동작을 추가하기 전에 개발자에게 확인합니다.
3. 필요한 최소 구현 계획을 제안합니다.

---

## 10. 보안 규칙

## 10.1 `.env` 및 Secret 관리

실제 `.env` 파일은 절대 읽거나, 출력하거나, 노출하지 않습니다.

엄격히 금지되는 행위:

- 실제 `.env` 파일 읽기
- 환경 변수 값을 출력하기
- API key, secret, token, credential을 코드에 hardcoding하기
- secret을 comment, log, console output, test output, error message에 포함하기
- `.env` 파일을 commit하기

환경 변수는 key name으로만 참조합니다.

Backend:

```ts
process.env.VARIABLE_NAME
```

Frontend:

```ts
import.meta.env.VITE_VARIABLE_NAME
```

`.env.example`에는 key name만 작성하고, 값은 비워두거나 placeholder를 사용합니다.

예시:

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLAUDE_API_KEY=
JWT_SECRET=
```

`.env`는 항상 `.gitignore`에 포함되어야 합니다.

---

## 10.2 인증 및 인가

- JWT token을 response body로 반환하지 않습니다.
- 인증 구현 방식이 HttpOnly Cookie 기반이라면 JWT token은 HttpOnly Cookie로 관리합니다.
- Google OAuth callback 처리 시 `state` parameter를 반드시 검증합니다.
- 보호된 API endpoint에는 JWT Guard 또는 동등한 인증 보호를 적용합니다.
- 사용자는 자신의 데이터만 조회 및 수정할 수 있어야 합니다.
- 필요한 경우 `student_id`를 기준으로 ownership check를 수행합니다.
- 다른 사용자의 데이터 접근은 403으로 거부합니다.

인증 동작을 수정하기 전에는 반드시 현재 구현을 먼저 확인합니다.

---

## 10.3 입력 검증

- Frontend와 Backend 양쪽에서 입력값을 검증합니다.
- Backend validation을 생략하지 않습니다.
- NestJS DTO에는 필요한 경우 `class-validator`를 사용합니다.
- Project가 지원하는 경우 `ValidationPipe`를 global로 사용합니다.
- SQL injection 방지를 위해 TypeORM parameter binding을 사용합니다.
- Raw SQL은 명확한 이유와 개발자 승인이 없으면 사용하지 않습니다.
- 사용자 입력값을 HTML에 직접 삽입하지 않습니다.
- 필요한 경우 사용자 입력값을 sanitize 또는 escape합니다.

---

## 10.4 AI Output Safety

AI가 생성한 content를 database에 저장하거나 사용자에게 표시하는 경우:

- 구조를 검증합니다.
- 사용자에게 표시되는 content를 sanitize합니다.
- AI output을 기본적으로 안전하다고 신뢰하지 않습니다.
- 명시적인 사용자 action 없이 AI 재분석을 자동 실행하지 않습니다.

---

## 11. 파일 작업 규칙

개발자의 명시적 승인 없이 아래 작업은 엄격히 금지합니다.

- 기존 파일 삭제
- 기존 파일 덮어쓰기
- 기존 파일 이름 변경
- 설정 파일 수정
  - `vite.config.ts`
  - `nest-cli.json`
  - `tsconfig.json`
  - `package.json`
  - Docker 관련 파일
- 생성된 migration file을 생성 후 수정하기

새 파일을 만들기 전에는 다음을 확인합니다.

1. 같은 이름의 파일이 이미 존재하는지 확인합니다.
2. 올바른 directory와 naming convention을 확인합니다.
3. 가능한 최소 변경을 우선합니다.

`src/` 아래 기존 코드를 수정하기 전에는 다음을 따릅니다.

1. 현재 파일을 먼저 확인합니다.
2. 의도한 변경 내용을 설명합니다.
3. 명시적 요청이 없으면 광범위한 refactor를 피합니다.

---

## 12. Dependency 규칙

- 개발자 승인 없이 새 package를 추가하지 않습니다.
- 새 package를 제안하기 전에 현재 project에 이미 사용할 수 있는 dependency가 있는지 확인합니다.
- `dependencies`와 `devDependencies`를 올바르게 구분합니다.
- `package.json` 확인 없이 package가 설치되어 있다고 가정하지 않습니다.

---

## 13. 코딩 규칙

## 13.1 공통 규칙

- Language: TypeScript
- Indentation: 2 spaces
- Encoding: UTF-8
- Line endings: LF
- Semicolons: required
- String literals: single quotes preferred
- 가능한 한 명확하고 좁은 type을 사용합니다.

### `any`에 대한 중요 규칙

Backend lint 설정상 `any`가 허용될 수 있습니다.

그러나 명확한 이유가 없다면 `any` 사용을 피합니다.

`any`가 필요한 경우:

- 사용 범위를 최소화합니다.
- 가능한 경우 DTO, interface, type alias, 또는 `unknown` 기반 type narrowing으로 대체합니다.

### 주석 규칙

- 코드의 동작이 명확하지 않거나, 프로젝트 흐름상 중요한 의도가 있는 경우 주석을 작성합니다.
- 단순히 코드 내용을 그대로 반복하는 주석은 작성하지 않습니다.
- 주석은 “무엇을 하는 코드인지”보다 “왜 필요한 코드인지”, “어떤 작업을 위한 코드인지”를 설명하는 것을 우선합니다.
- 임시 처리, 우회 처리, 제한 사항이 있는 경우 반드시 이유를 주석으로 남깁니다.
- Script, seed, batch, migration 보조 코드처럼 실행 목적이 명확해야 하는 파일에는 파일 상단에 작업 목적을 주석으로 작성합니다.
- 주석은 실제 코드와 다르게 방치되지 않도록, 코드 수정 시 함께 갱신합니다.

---

## 13.2 Frontend 규칙

- React function component만 사용합니다.
- Class component는 사용하지 않습니다.
- Props에는 명시적인 type을 정의합니다.
- API 통신 처리를 component 내부에 직접 작성하지 않습니다.
- 현재 codebase와 일관된다면 API 호출은 `src/api/` 또는 `src/services/`로 분리합니다.
- Custom hook은 `use` prefix를 붙입니다.
- Claude API 또는 secret이 필요한 API를 frontend에서 직접 호출하지 않습니다.
- Typed Redux hooks를 사용합니다.
  - `useAppDispatch`
  - `useAppSelector`

Frontend lint 규칙:

```text
--max-warnings 0
```

모든 warning은 error로 취급됩니다.

---

## 13.3 Backend 규칙

- Module, controller, service, DTO, entity의 책임을 분리합니다.
- Controller는 routing과 request/response 경계를 담당합니다.
- Business logic은 service에 위치시킵니다.
- Entity는 `@Entity()`를 사용하고, project와 일관된다면 table name을 명시합니다.
- DTO에는 필요한 경우 `class-validator`를 사용합니다.
- Error response는 project의 일관된 format을 따릅니다.
- Ownership check를 우회하지 않습니다.
- Error에 secret value를 노출하지 않습니다.

---

## 13.4 Database 규칙

- Table name과 column name은 snake_case를 사용합니다.
- Project가 이미 다른 key를 사용하는 경우를 제외하고 UUID primary key를 사용합니다.
- 예외: `users.student_id`처럼 기존 구조상 string primary key를 사용하는 경우
- Timestamp column은 필요한 경우 `@CreateDateColumn`, `@UpdateDateColumn`을 사용합니다.
- 생성된 migration file은 생성 후 수동 수정하지 않습니다.
- Entity 또는 schema 확인 없이 column이 존재한다고 가정하지 않습니다.

중요:

현재 project는 개발 환경에서 TypeORM `synchronize: true`를 사용합니다.
이후 migration이 도입되거나 사용되는 경우, 두 방식을 무분별하게 섞지 말고 project의 실제 migration 전략을 따릅니다.

---

## 14. AI / Claude API 사용 규칙

Claude API 연동이 존재하거나 새로 추가되는 경우:

- Claude API 호출은 Backend에만 배치합니다.
- Claude API key는 Frontend bundle에 절대 포함하지 않습니다.
- Tool Use 또는 function-calling 방식 구현은 신중하게 검증합니다.
- AI 분석 재실행은 명시적인 사용자 action이 있을 때만 수행합니다.
- AI 생성 content는 database 저장 전에 validate 및 sanitize합니다.
- AI output은 application data 또는 검증된 외부 source에 근거하지 않는 한 사실로 취급하지 않습니다.

---

## 15. Git 규칙

- Branch naming:
  - `feature/feature-name`
  - `fix/bug-name`
  - `chore/task-name`
- `main` branch에 직접 push하지 않습니다.
- `main` 변경은 Pull Request를 통해 진행합니다.
- `.env` 파일은 절대 commit하지 않습니다.
- Secret, token, generated credential을 commit하지 않습니다.
- commit, push, merge는 사용자의 명시적인 요청 없이 실행하지 않습니다.

---

## 16. Hallucination 방지 규칙

존재하지 않는 가정을 바탕으로 코드를 생성하지 않습니다.

엄격히 금지되는 행위:

- 존재하지 않는 API endpoint를 가정하기
- 존재하지 않는 DB column을 가정하기
- 존재하지 않는 DTO field를 가정하기
- 존재하지 않는 frontend route를 가정하기
- 존재하지 않는 service, hook, utility, component를 가정하기
- 실제로 존재하지 않는 library API 또는 method를 사용하기
- test하지 않은 code를 test 완료라고 말하기
- codebase에서 확인하지 않은 기능을 구현 완료 상태라고 말하기

불확실한 경우:

1. 관련 file을 확인합니다.
2. 확인된 내용을 명시합니다.
3. 확인되지 않은 내용을 명시합니다.
4. 추측 기반 구현을 하기 전에 개발자에게 확인합니다.

---

## 17. Claude의 작업 방식

Code 구현 또는 수정 요청을 받으면 다음 순서를 따릅니다.

1. 관련 file을 먼저 확인합니다.
2. 가장 작고 안전한 변경 범위를 찾습니다.
3. 불필요한 refactor를 피합니다.
4. 기존 architecture와 naming convention을 유지합니다.
5. 위험한 변경은 적용 전에 설명합니다.
6. 관련 없는 file은 수정하지 않습니다.
7. 요청받지 않은 public behavior 변경은 하지 않습니다.
8. 가능한 경우 lint, build, test를 실행합니다.
9. test를 실행하지 않았다면 실행하지 않았다고 명확히 말합니다.
10. 실제로 수행한 검증 이상으로 확인했다고 말하지 않습니다.

---

## 18. 우선순위

규칙이 충돌하는 경우 다음 우선순위를 따릅니다.

1. Security rules
2. Developer instructions
3. Existing codebase behavior
4. Current repository architecture
5. Planned / design direction
6. General best practices

안전하게 판단할 수 없는 충돌이 있으면 작업을 멈추고 개발자에게 확인합니다.
