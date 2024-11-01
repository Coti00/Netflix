# Netflix Clone

넷플릭스를 클론 코딩한 웹 애플리케이션으로, React를 사용하여 제작되었습니다. 이 프로젝트는 넷플릭스의 주요 기능을 클론하여 웹 개발 경험을 쌓고, 사용자에게 익숙한 인터페이스를 제공합니다.

## 📋 프로젝트 기본 정보

- **프로젝트명**: Netflix Clone
- **목적**: 넷플릭스의 주요 UI와 기능을 클론하여 React를 활용한 웹 개발 스킬 향상
- **주요 기능**:
  - 사용자 로그인 / 회원가입 기능
  - 영화 및 시리즈 목록 조회
  - 장르 및 평점에 따른 필터링 기능
  - 위시리스트 추가 / 제거 기능
  - 검색 기능
  
## 🛠 기술 스택

- **프론트엔드**: React, JavaScript, CSS-in-JS (styled-components)
- **라우팅**: React Router
- **API**: [TMDb API](https://www.themoviedb.org/documentation/api) (영화 데이터)
- **기타**: Axios (HTTP 요청)

## 🚀 설치 및 실행 가이드

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1. **레포지토리 클론**
   git clone https://github.com/username/netflix-clone.git
   cd netflix-clone
2. **패키지 설치**
    npm install
    (package.json을 확인해주세요)
3. **TMDB API키**
    자신의 API키를 비밀번호로 사용하세요
4. **프로젝트 실행**
    npm start
        or
    npm run build(배포할때 사용)

## 📂 프로젝트 주요구조 설명
netflix-clone/
├── src
│   ├── approutes
│   │   └── AppRoutes.jsx          # 애플리케이션 라우트 설정
│   ├── components
│   │   ├── Header                 # 헤더 컴포넌트
│   │   ├── Loading                # 로딩 스피너 컴포넌트
│   │   ├── MainHeader             # 메인 페이지 상단 헤더
│   │   ├── MainSection            # 메인 페이지 주요 섹션
│   │   ├── Menu                   # 네비게이션 메뉴
│   │   └── TableView              # 테이블 형식 콘텐츠 뷰어
│   ├── img                        # 이미지 파일
│   └── pages
│       ├── Main                   # 메인 페이지
│       ├── Popular                # 인기 콘텐츠 페이지
│       ├── Search                 # 콘텐츠 검색 페이지
│       ├── Signin                 # 로그인 페이지
│       └── Whishlist              # 위시리스트 페이지         
└── README.md                       # 프로젝트 설명 파일

## 📝 참고 사항
이 프로젝트는 교육 목적으로 만들어졌으며 상업적 용도로 사용되지 않습니다.
디자인 및 기능은 넷플릭스를 참고하여 유사하게 구현되었지만, 모든 기능이 완벽히 동일하진 않습니다.