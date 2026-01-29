# VC Route - 스타트업 투자 매칭 플랫폼

스타트업과 투자자를 연결하는 올인원 투자 플랫폼입니다.

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Authentication**: JWT + bcrypt

## 주요 기능

- 스타트업-투자자 매칭
- 투자펀드 정보 탐색
- 기업가치 산정 (DCF Calculator)
- 대시보드 및 활동 관리

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`env.example` 파일을 `.env.local`로 복사하고 값을 입력하세요:

```bash
cp env.example .env.local
```

필요한 환경 변수:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anonymous Key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key
- `JWT_SECRET`: JWT 서명용 시크릿 키

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. `supabase/schema.sql` 파일의 내용을 SQL Editor에서 실행
3. Project Settings > API에서 키 복사

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 배포 (Vercel)

### 1. GitHub에 코드 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Vercel 연결

1. [Vercel](https://vercel.com)에서 Import Project
2. GitHub 레포지토리 선택
3. Environment Variables 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
4. Deploy 클릭

### 3. 도메인 연결 (가비아)

1. Vercel Dashboard > Settings > Domains
2. 커스텀 도메인 추가
3. 가비아 DNS 설정에서 CNAME 레코드 추가:
   - 호스트: www (또는 @)
   - 값: cname.vercel-dns.com

## 프로젝트 구조

```
vc-route-next/
├── src/
│   ├── app/
│   │   ├── api/          # API Routes
│   │   ├── dashboard/    # 대시보드 페이지
│   │   ├── dcf/          # DCF 계산기
│   │   ├── fund/         # 펀드 목록
│   │   ├── investors/    # 투자자 목록
│   │   ├── legal/        # 법적 고지
│   │   ├── login/        # 로그인
│   │   ├── notice/       # 공지사항
│   │   ├── register/     # 회원가입
│   │   └── startups/     # 스타트업 목록
│   ├── components/       # 공통 컴포넌트
│   └── lib/              # 유틸리티
├── supabase/
│   └── schema.sql        # DB 스키마
└── public/               # 정적 파일
```

## 라이선스

© 2026 VC Route. All rights reserved.
