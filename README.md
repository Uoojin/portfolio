# UOOJIN Portfolio

React + Vite 포트폴리오입니다.

배포 주소: https://uoojin.github.io/portfolio/

## 로컬 실행

```sh
npm ci
npm run dev
```

빌드 검증과 로컬 빌드 미리보기:

```sh
npm run build
npm run preview
```

## GitHub Pages 자동 배포

`.github/workflows/deploy.yml`이 `main` push 또는 `main`에서의 수동 실행으로 동작합니다.

1. Node.js 22 환경에서 `npm ci`로 잠금 파일에 맞춰 의존성을 설치합니다.
2. `npm run build`로 `dist`를 생성합니다.
3. `dist`를 Pages 아티팩트로 업로드합니다.
4. 빌드 성공 후 `github-pages` 환경에 직접 배포합니다.

`vite.config.js`의 `base: '/portfolio/'`는 유지합니다. 배포에 개인 토큰이나
`gh-pages` 브랜치는 필요하지 않습니다. 이전 `predeploy` / `deploy` 스크립트와
`gh-pages` 패키지는 제거했습니다. `dist`를 Git에 추가할 필요도 없습니다.

### 저장소 설정: 최초 전환 시 한 번

1. [Settings → Pages](https://github.com/Uoojin/portfolio/settings/pages)에서
   **Build and deployment → Source → GitHub Actions**를 선택합니다.
   `Deploy from a branch` 또는 `gh-pages` 브랜치 배포를 선택하지 않습니다.
2. 저장소의 Actions 실행이 비활성화되어 있다면 활성화합니다. 액션 허용 목록을
   사용하는 경우 워크플로우에서 사용하는 GitHub 공식 `actions/*`를 허용합니다.
3. **Settings → Environments → github-pages**에 배포 브랜치 제한이 설정되어
   있다면 `main`을 허용합니다. 기존 `gh-pages`만 허용하는 규칙은 변경해야 합니다.
4. 이 변경을 `main`에 커밋하고 push합니다. 이미 push했다면 저장소의 Actions에서
   **Deploy portfolio to GitHub Pages → Run workflow → main**으로 다시 실행합니다.

기존 `gh-pages` 브랜치는 남아 있어도 괜찮습니다. Source를 GitHub Actions로
전환한 뒤에는 해당 브랜치를 배포 소스로 사용하지 않습니다.

### 배포 확인

- [Actions](https://github.com/Uoojin/portfolio/actions)에서
  **Deploy portfolio to GitHub Pages**의 최신 실행을 엽니다.
- `build`와 `deploy` 작업이 모두 성공했는지 확인합니다.
- `deploy` 작업의 `github-pages` 환경 링크 또는
  https://uoojin.github.io/portfolio/ 에서 결과를 확인합니다.
- 이미지, PDF 링크, 프로젝트 모달과 상세 URL 새로고침도 확인합니다.
  기존 `public/404.html`은 빌드에 그대로 포함됩니다.

설정 참고: [Vite GitHub Pages 배포 안내](https://vite.dev/guide/static-deploy.html#github-pages),
[GitHub Pages 사용자 지정 워크플로우](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
