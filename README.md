# 커머스 UI 패턴 쇼케이스 (Commerce UI Showcase)

9가지 쇼핑 앱 화면 & 콘텐츠 배치 패턴을 모바일 실기기 프리뷰에서 직접 조작하고, **React + Tailwind CSS** 및 **순수 HTML + CSS + JS** 코드를 즉시 복사할 수 있는 인터랙티브 라이브러리입니다.

## 주요 기능

- **전체 한눈에 보기 (3×3 갤러리)**: 9가지 커머스 UI 패턴(`01 리스트` ~ `09 무한 스크롤`)을 한 화면에서 탐색
- **모바일 실기기 인터랙티브 데모**: 각 패턴별 클릭·스크롤·정렬·아코디언·무한 스크롤 등 실시간 동작 및 상태 초기화
- **실무 UX 설계 가이드**: 패턴별 사용 시점, 핵심 구현 포인트, 주의사항 제공
- **원클릭 코드 복사**: 외부 무거운 라이브러리 없는 순수 React + Tailwind / HTML+CSS+JS 스니펫 제공

## 로컬 실행 방법

```bash
npm install
npm run dev:shop-showcase
```

브라우저에서 `http://localhost:3014` 로 접속합니다.

## 프로덕션 빌드 검증

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## GitHub 업로드 및 Render Static Site 호스팅 가이드

### 1. GitHub 저장소 연결 및 푸시

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

### 2. Render 배포 방법 (택 1)

* **방법 A: Blueprint 자동 배포 (`render.yaml` 포함)**
  1. Render 대시보드에서 **New + → Blueprint** 선택
  2. 연결한 GitHub 저장소 선택 (`render.yaml` 자동 인식)
  3. **Apply** 클릭 후 자동 빌드 및 배포 완료

* **방법 B: Static Site 수동 생성**
  1. Render 대시보드에서 **New + → Static Site** 선택
  2. GitHub 저장소 연결 후 아래 값 입력:
     - **Build Command**: `npm ci && npm run build`
     - **Publish Directory**: `dist`
  3. (선택) Redirects/Rewrites에 `/* -> /index.html (Rewrite)` 추가
