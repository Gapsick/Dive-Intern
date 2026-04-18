USE dive_intern;

-- users
INSERT INTO users (student_id, email, name, portfolio_url, desired_position) VALUES
('2021001', 'tanaka@example.com', '田中太郎', 'https://tanaka-portfolio.dev', 'バックエンドエンジニア'),
('2021002', 'sato@example.com', '佐藤花子', 'https://sato-portfolio.dev', 'フロントエンドエンジニア'),
('2021003', 'kim@example.com', '김민준', 'https://kimdev.io', 'フルスタックエンジニア');

-- oauth_accounts
INSERT INTO oauth_accounts (id, student_id, provider, provider_account_id, refresh_token) VALUES
(UUID(), '2021001', 'google', 'google-uid-001', 'refresh-token-001'),
(UUID(), '2021001', 'github', 'github-uid-001', 'refresh-token-002'),
(UUID(), '2021002', 'google', 'google-uid-002', 'refresh-token-003'),
(UUID(), '2021003', 'google', 'google-uid-003', 'refresh-token-004');

-- github_profiles
INSERT INTO github_profiles (id, student_id, github_username, analyzed_at) VALUES
('gp-0001-0000-0000-000000000001', '2021001', 'tanaka-dev', NOW()),
('gp-0001-0000-0000-000000000002', '2021002', 'sato-front', NOW()),
('gp-0001-0000-0000-000000000003', '2021003', 'kiminjun', NOW());

-- repos
INSERT INTO repos (id, github_profile_id, repo_name, repo_url) VALUES
('rp-0001-0000-0000-000000000001', 'gp-0001-0000-0000-000000000001', 'go-api-server', 'https://github.com/tanaka-dev/go-api-server'),
('rp-0001-0000-0000-000000000002', 'gp-0001-0000-0000-000000000001', 'nestjs-practice', 'https://github.com/tanaka-dev/nestjs-practice'),
('rp-0001-0000-0000-000000000003', 'gp-0001-0000-0000-000000000002', 'react-portfolio', 'https://github.com/sato-front/react-portfolio'),
('rp-0001-0000-0000-000000000004', 'gp-0001-0000-0000-000000000003', 'fullstack-app', 'https://github.com/kiminjun/fullstack-app');

-- tech_stacks
INSERT INTO tech_stacks (id, name, category) VALUES
('ts-0001-0000-0000-000000000001', 'React', 'Frontend'),
('ts-0001-0000-0000-000000000002', 'TypeScript', 'Frontend'),
('ts-0001-0000-0000-000000000003', 'NestJS', 'Backend'),
('ts-0001-0000-0000-000000000004', 'Go', 'Backend'),
('ts-0001-0000-0000-000000000005', 'MySQL', 'DB'),
('ts-0001-0000-0000-000000000006', 'PostgreSQL', 'DB'),
('ts-0001-0000-0000-000000000007', 'Docker', 'DevOps');

-- user_tech_stacks
INSERT INTO user_tech_stacks (id, github_profile_id, tech_stack_id, level, level_reason, analyzed_at) VALUES
('uts-001-0000-0000-000000000001', 'gp-0001-0000-0000-000000000001', 'ts-0001-0000-0000-000000000003', 4, 'NestJSを使った複数のAPIプロジェクトあり', NOW()),
('uts-001-0000-0000-000000000002', 'gp-0001-0000-0000-000000000001', 'ts-0001-0000-0000-000000000004', 3, 'GoでのAPI実装経験あり', NOW()),
('uts-001-0000-0000-000000000003', 'gp-0001-0000-0000-000000000002', 'ts-0001-0000-0000-000000000001', 5, 'Reactプロジェクト多数、高品質なコード', NOW()),
('uts-001-0000-0000-000000000004', 'gp-0001-0000-0000-000000000002', 'ts-0001-0000-0000-000000000002', 4, 'TypeScript積極活用', NOW()),
('uts-001-0000-0000-000000000005', 'gp-0001-0000-0000-000000000003', 'ts-0001-0000-0000-000000000003', 3, 'NestJS基礎レベル', NOW()),
('uts-001-0000-0000-000000000006', 'gp-0001-0000-0000-000000000003', 'ts-0001-0000-0000-000000000001', 3, 'React基礎〜中級レベル', NOW());

-- user_tech_stack_repos
INSERT INTO user_tech_stack_repos (id, user_tech_stack_id, repo_id) VALUES
(UUID(), 'uts-001-0000-0000-000000000001', 'rp-0001-0000-0000-000000000002'),
(UUID(), 'uts-001-0000-0000-000000000002', 'rp-0001-0000-0000-000000000001'),
(UUID(), 'uts-001-0000-0000-000000000003', 'rp-0001-0000-0000-000000000003'),
(UUID(), 'uts-001-0000-0000-000000000005', 'rp-0001-0000-0000-000000000004');

-- companies
INSERT INTO companies (id, name, industry, description, region, hp_url, mvv) VALUES
('co-0001-0000-0000-000000000001', 'メルカリ', 'EC', 'フリマアプリNo.1', '東京', 'https://mercari.com', 'あらゆる価値を循環させる'),
('co-0001-0000-0000-000000000002', 'サイバーエージェント', 'IT', 'インターネットの総合企業', '東京', 'https://cyberagent.co.jp', '21世紀を代表する会社を創る'),
('co-0001-0000-0000-000000000003', 'LINE', 'IT', 'コミュニケーションアプリLINE', '東京', 'https://linecorp.com', 'WOW');

-- company_tech_stacks
INSERT INTO company_tech_stacks (id, company_id, tech_stack_id) VALUES
(UUID(), 'co-0001-0000-0000-000000000001', 'ts-0001-0000-0000-000000000004'),
(UUID(), 'co-0001-0000-0000-000000000001', 'ts-0001-0000-0000-000000000005'),
(UUID(), 'co-0001-0000-0000-000000000002', 'ts-0001-0000-0000-000000000001'),
(UUID(), 'co-0001-0000-0000-000000000002', 'ts-0001-0000-0000-000000000003'),
(UUID(), 'co-0001-0000-0000-000000000003', 'ts-0001-0000-0000-000000000002'),
(UUID(), 'co-0001-0000-0000-000000000003', 'ts-0001-0000-0000-000000000006');

-- job_postings
INSERT INTO job_postings (id, company_id, position, description, employment_type, is_remote, salary_min, salary_max, term, start_date, end_date, deadline) VALUES
('jp-0001-0000-0000-000000000001', 'co-0001-0000-0000-000000000001', 'バックエンドエンジニア', 'Go/マイクロサービス開発', 'インターン', true, 250000, 300000, '2024 summer', '2024-07-01', '2024-09-30', '2024-05-31'),
('jp-0001-0000-0000-000000000002', 'co-0001-0000-0000-000000000002', 'フロントエンドエンジニア', 'React/TypeScriptでのUI開発', 'インターン', false, 200000, 250000, '2024 summer', '2024-07-15', '2024-09-15', '2024-06-15'),
('jp-0001-0000-0000-000000000003', 'co-0001-0000-0000-000000000003', 'フルスタックエンジニア', 'LINEサービスの機能開発', 'インターン', true, 280000, 320000, '2024 winter', '2024-12-01', '2025-02-28', '2024-10-31');

-- user_companies
INSERT INTO user_companies (id, student_id, job_posting_id, status, is_bookmarked, is_applying, saved_at) VALUES
('uc-0001-0000-0000-000000000001', '2021001', 'jp-0001-0000-0000-000000000001', '面接', true, true, NOW()),
('uc-0001-0000-0000-000000000002', '2021001', 'jp-0001-0000-0000-000000000002', '書類準備', true, false, NOW()),
('uc-0001-0000-0000-000000000003', '2021002', 'jp-0001-0000-0000-000000000002', '応募完了', true, true, NOW()),
('uc-0001-0000-0000-000000000004', '2021003', 'jp-0001-0000-0000-000000000003', '書類準備', false, true, NOW());

-- ai_analyses
INSERT INTO ai_analyses (id, user_company_id, match_score, match_summary) VALUES
(UUID(), 'uc-0001-0000-0000-000000000001', 87.5, 'NestJS・Go経験がメルカリのバックエンド要件と高くマッチしています。'),
(UUID(), 'uc-0001-0000-0000-000000000003', 92.0, 'React・TypeScriptスキルがサイバーエージェントのフロントエンド要件と非常に高くマッチしています。');

-- memos
INSERT INTO memos (id, user_company_id, title, content) VALUES
(UUID(), 'uc-0001-0000-0000-000000000001', '面接準備メモ', 'Go言語の基礎とマイクロサービスの概念を復習すること。'),
(UUID(), 'uc-0001-0000-0000-000000000002', '志望動機', 'Abemaの事業に関わりたい。広告技術に興味あり。'),
(UUID(), 'uc-0001-0000-0000-000000000003', '企業研究', 'サイバーエージェントのAI事業部について調べる。');

-- schedules
INSERT INTO schedules (id, student_id, user_company_id, title, schedule_type, start_at, end_at) VALUES
(UUID(), '2021001', 'uc-0001-0000-0000-000000000001', 'メルカリ 一次面接', '面接', '2024-05-20 10:00:00', '2024-05-20 11:00:00'),
(UUID(), '2021001', 'uc-0001-0000-0000-000000000002', 'サイバーエージェント 書類締切', '書類締切', '2024-06-15 23:59:00', NULL),
(UUID(), '2021002', 'uc-0001-0000-0000-000000000003', 'サイバーエージェント 説明会', '説明会', '2024-05-10 14:00:00', '2024-05-10 16:00:00'),
(UUID(), '2021003', NULL, '個人勉強会', 'その他', '2024-05-25 19:00:00', '2024-05-25 21:00:00');

-- selection_processes
INSERT INTO selection_processes (id, user_company_id, stage_type, stage_order, date, result, memo, is_shared) VALUES
('sp-0001-0000-0000-000000000001', 'uc-0001-0000-0000-000000000001', '書類', 1, '2024-05-01', '合格', '特に問題なし', false),
('sp-0001-0000-0000-000000000002', 'uc-0001-0000-0000-000000000001', 'コーディングテスト', 2, '2024-05-10', '合格', 'アルゴリズム問題3問、難易度普通', true),
('sp-0001-0000-0000-000000000003', 'uc-0001-0000-0000-000000000001', '面接', 3, '2024-05-20', '待ち', '技術面接、エンジニア2名', true),
('sp-0001-0000-0000-000000000004', 'uc-0001-0000-0000-000000000003', 'SPI', 1, '2024-05-05', '合格', 'Webテスティング形式', false);

-- coding_test_details
INSERT INTO coding_test_details (id, selection_process_id, platform, problem_count, duration_minutes, difficulty) VALUES
(UUID(), 'sp-0001-0000-0000-000000000002', '自社プラットフォーム', 3, 90, '普通');

-- interview_details
INSERT INTO interview_details (id, selection_process_id, interview_type) VALUES
('id-0001-0000-0000-000000000001', 'sp-0001-0000-0000-000000000003', 'オンライン');

-- interviewers
INSERT INTO interviewers (id, interview_detail_id, role, count, memo) VALUES
('iv-0001-0000-0000-000000000001', 'id-0001-0000-0000-000000000001', 'エンジニア', 2, 'バックエンド担当エンジニア'),
('iv-0001-0000-0000-000000000002', 'id-0001-0000-0000-000000000001', '人事', 1, NULL);

-- interviewer_qna
INSERT INTO interviewer_qna (id, interviewer_id, question, answer, reverse_question, reverse_question_answer) VALUES
(UUID(), 'iv-0001-0000-0000-000000000001', 'Goを選んだ理由は？', 'パフォーマンスと並行処理の学習のためです。', 'チームの技術スタックはどうなっていますか？', 'Go・Kubernetes・GCPがメインです。'),
(UUID(), 'iv-0001-0000-0000-000000000001', 'マイクロサービスの経験は？', '個人プロジェクトで小規模に試しました。', NULL, NULL),
(UUID(), 'iv-0001-0000-0000-000000000002', '志望理由を教えてください。', 'メルカリのエンジニア文化に共感しています。', 'インターン後の正社員登用はありますか？', '実績次第で検討できます。');

-- spi_details
INSERT INTO spi_details (id, selection_process_id, platform, duration_minutes, memo) VALUES
('sd-0001-0000-0000-000000000001', 'sp-0001-0000-0000-000000000004', 'Webテスティング', 70, '自宅受験可能');

-- spi_sections
INSERT INTO spi_sections (id, spi_detail_id, section_type, memo) VALUES
(UUID(), 'sd-0001-0000-0000-000000000001', '言語', '文章読解が多め'),
(UUID(), 'sd-0001-0000-0000-000000000001', '非言語', '図形問題あり'),
(UUID(), 'sd-0001-0000-0000-000000000001', '性格', '約30分');

-- community_posts
INSERT INTO community_posts (id, student_id, selection_process_id, title, content) VALUES
(UUID(), '2021001', 'sp-0001-0000-0000-000000000002', 'メルカリ コーディングテスト体験記', 'アルゴリズム3問、90分。難易度は普通でした。DPとグラフ問題が出ました。'),
(UUID(), '2021001', 'sp-0001-0000-0000-000000000003', 'メルカリ 一次面接 体験記', 'オンラインで技術面接。GoとNestJSについて深く聞かれました。'),
(UUID(), '2021002', NULL, 'インターン就活のコツ', 'GitHubのREADMEをちゃんと書くと印象が上がります。');
