-- VC Route Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('startup', 'investor', 'admin')),
  company VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funds table
CREATE TABLE IF NOT EXISTS funds (
  id BIGSERIAL PRIMARY KEY,
  fund_type VARCHAR(50) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  fund_name VARCHAR(200) NOT NULL,
  registered_at DATE,
  expired_at DATE,
  settlement_month INTEGER,
  manager VARCHAR(100),
  support VARCHAR(100),
  purpose TEXT,
  industry VARCHAR(255),
  base_rate DECIMAL(5,2),
  total_amount BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investors table
CREATE TABLE IF NOT EXISTS investors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(200) NOT NULL,
  position VARCHAR(100),
  investment_focus VARCHAR(255),
  portfolio TEXT[], -- Array of company names
  min_investment BIGINT,
  max_investment BIGINT,
  description TEXT,
  email VARCHAR(255),
  -- 새로 추가된 필드
  total_investment BIGINT, -- 총투자금액
  portfolio_count INTEGER, -- 포트폴리오 수
  investment_tendency TEXT, -- 투자성향 및 단계 (내용)
  investment_stages TEXT[], -- 투자 단계 (PRE-SEED, SEED, PRE-A, SERIES A, SERIES B+)
  fund_info TEXT, -- 운용펀드 정보
  website VARCHAR(255), -- 홈페이지 URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Startups table
CREATE TABLE IF NOT EXISTS startups (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  industry VARCHAR(50),
  industry_label VARCHAR(100),
  founded_date DATE,
  location VARCHAR(200),
  employees INTEGER,
  funding_stage VARCHAR(50),
  funding_amount BIGINT,
  description TEXT,
  ceo VARCHAR(100),
  website VARCHAR(255),
  user_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id BIGSERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  tag VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  author VARCHAR(100),
  author_role VARCHAR(100),
  date DATE DEFAULT CURRENT_DATE,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table (for tracking startup-investor connections)
CREATE TABLE IF NOT EXISTS matches (
  id BIGSERIAL PRIMARY KEY,
  startup_id BIGINT REFERENCES startups(id),
  investor_id BIGINT REFERENCES investors(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_funds_fund_type ON funds(fund_type);
CREATE INDEX IF NOT EXISTS idx_startups_industry ON startups(industry);
CREATE INDEX IF NOT EXISTS idx_startups_funding_stage ON startups(funding_stage);
CREATE INDEX IF NOT EXISTS idx_notices_category ON notices(category);
CREATE INDEX IF NOT EXISTS idx_notices_date ON notices(date DESC);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies for public read access (adjust as needed)
CREATE POLICY "Public funds are viewable by everyone" ON funds
  FOR SELECT USING (true);

CREATE POLICY "Public investors are viewable by everyone" ON investors
  FOR SELECT USING (true);

CREATE POLICY "Public startups are viewable by everyone" ON startups
  FOR SELECT USING (true);

CREATE POLICY "Public notices are viewable by everyone" ON notices
  FOR SELECT USING (true);

-- Policies for authenticated actions (using service role key bypasses RLS)
CREATE POLICY "Service role can manage funds" ON funds
  FOR ALL USING (true);

CREATE POLICY "Service role can manage investors" ON investors
  FOR ALL USING (true);

CREATE POLICY "Service role can manage startups" ON startups
  FOR ALL USING (true);

CREATE POLICY "Service role can manage notices" ON notices
  FOR ALL USING (true);

CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (true);

CREATE POLICY "Service role can manage matches" ON matches
  FOR ALL USING (true);

-- Insert sample data for testing

-- Sample Funds
INSERT INTO funds (fund_type, company_name, fund_name, registered_at, expired_at, settlement_month, manager, support, purpose, industry, base_rate, total_amount) VALUES
('투자조합', '벤처캐피탈 A', '제1호 혁신성장 투자조합', '2025-01-10', '2032-01-10', 12, '홍길동', '모태펀드', '초기 창업기업 선제적 투자 및 육성', 'AI,ICT,빅데이터', 8.0, 12000000000),
('개인투자조합', '스타트업 인베스트', '스타트업 엔젤 매칭펀드', '2024-05-15', '2030-05-15', 3, '이수진', '자체결성', '시드 단계 스타트업 발굴', '핀테크,커머스', 5.0, 2500000000),
('PEF', '그로스 파트너스', '그로스 제1호 사모투자합자회사', '2023-08-05', '2033-08-05', 6, '최민서', '연기금', '중견기업 사업재편 및 스케일업 지원', '소부장,제조테크', 10.0, 150000000000);

-- Sample Investors
INSERT INTO investors (name, company, position, investment_focus, portfolio, min_investment, max_investment, description, email, total_investment, portfolio_count, investment_tendency, investment_stages, fund_info, website) VALUES
('김투자', '한국벤처캐피탈', '파트너', 'AI, SaaS, 핀테크', ARRAY['테크노바', '헬스커넥트', '그린에너지텍'], 500000000, 5000000000, 'AI 및 B2B SaaS 분야 전문 투자자', 'invest@kvc.kr', 50000000000, 15, '혁신적인 기술 기반 스타트업에 집중 투자하며, 특히 AI/ML 분야에서 글로벌 시장 진출 가능성이 있는 기업을 선호합니다.', ARRAY['SEED', 'PRE-A', 'SERIES A'], '제1호 혁신성장 투자조합 (120억원), AI 스타트업 전문 펀드 (80억원)', 'https://kvc.kr'),
('이엔젤', '엔젤클럽', '대표', '초기 스타트업, 딥테크', ARRAY['바이오텍'], 50000000, 500000000, '초기 스타트업 전문 엔젤 투자자', 'angel@club.kr', 5000000000, 8, '초기 단계 스타트업의 성장 잠재력을 보고 투자합니다. 창업자의 비전과 실행력을 중시합니다.', ARRAY['PRE-SEED', 'SEED'], '개인 엔젤 투자', 'https://angelclub.kr');

-- Sample Startups
INSERT INTO startups (name, industry, industry_label, founded_date, location, employees, funding_stage, funding_amount, description, ceo, website) VALUES
('테크노바', 'ai', 'AI/ML', '2023-03-15', '서울 강남구', 12, '시드', 500000000, '자연어 처리 기반 기업용 AI 어시스턴트 개발', '김민준', 'https://technova.ai'),
('그린에너지텍', 'energy', '에너지/환경', '2022-07-20', '대전 유성구', 28, '시리즈A', 3000000000, '차세대 태양광 패널 및 에너지 저장 시스템 개발', '이서연', 'https://greenenergy.tech'),
('헬스커넥트', 'healthcare', '헬스케어', '2021-11-10', '서울 서초구', 45, '시리즈B', 15000000000, 'AI 기반 원격 의료 진단 플랫폼', '박지훈', 'https://healthconnect.kr');

-- Sample Notices
INSERT INTO notices (category, tag, title, summary, author, author_role, date, content) VALUES
('notice', '# 공지', 'VC route 서비스 정식 런칭 및 기능 안내', '대한민국 스타트업 투자 생태계를 혁신할 VC route가 정식으로 런칭되었습니다.', '관리자', 'VC route Team', '2026-01-25', 'VC route 서비스 정식 런칭을 알려드립니다. 펀드 매칭부터 기업가치 산정까지 다양한 기능을 제공합니다.'),
('update', '# 업데이트', 'DCF 계산기 알고리즘 고도화', 'DCF 계산기의 세금 계산 방식을 세율 기반으로 변경했습니다.', '개발팀', 'Service Dev', '2026-01-20', 'DCF 계산기가 업데이트되었습니다. 새로운 기능을 확인해보세요.'),
('event', '# 이벤트', '신규 가입 스타트업 무료 기업가치 진단 이벤트', '선착순 100개 스타트업 대상 무료 기업가치 진단 제공', '마케팅', 'Operations', '2026-01-15', '신규 가입 스타트업을 위한 특별 이벤트를 진행합니다.'),
('demoday', '# 데모데이', '2026 Q1 VC route 데모데이 참가 스타트업 모집', '2026년 1분기 데모데이에 참가할 스타트업을 모집합니다.', '관리자', 'VC route Team', '2026-01-10', '데모데이에 참가하여 투자자들 앞에서 피칭 기회를 얻으세요.');
