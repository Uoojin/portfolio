import monologImage from '../assets/project/monolog.webp'
import notomatoImage from '../assets/project/notomato.webp'
import gameImage from '../assets/project/game.webp'
import syncImage from '../assets/project/letssync.webp'
import blahImage from '../assets/project/poster01.webp'
import poster01Image from '../assets/project/poster02.webp'
import poster02Image from '../assets/project/poster03.webp'
import poster04Image from '../assets/project/poster04.webp'

// Keep existing IDs/URLs compatible. Add real detail images to contentImages;
// the supplied cover is also shown as the final result until more media exists.
export const projects = [
  {
    id: 'ProjectName', title: 'MONO-LOG', meta: 'Web', category: 'Interactive website',
    thumbnail: monologImage, thumbnailAlt: 'MONOLOG — The Shape of Language', imageWidth: 861, imageHeight: 585,
    url: 'https://mono-log.onrender.com', year: '',
    summary: '한국어, 중국어, 일본어, 영어의 서로 다른 언어 표현을 비교하고 탐색하는 인터랙티브 웹사이트입니다.',
    overview: ['한국어, 중국어, 일본어, 영어의 서로 다른 언어 표현을 비교하고 탐색하는 인터랙티브 웹사이트입니다. 언어마다 달라지는 표현을 다양한 시각적 요소와 인터랙션으로 경험할 수 있도록 구성했습니다.'],
    caption: 'The Shape of Language — Exploring Meaning Beyond Translation', contentImages: [],
  },
  {
    id: 'project-02', title: 'NOTOMATO', meta: 'APP · Web', category: 'Service design',
    thumbnail: notomatoImage, thumbnailAlt: 'NOTOMATO 서비스 대표 이미지', imageWidth: 869, imageHeight: 586,
    url: 'https://notomato.onrender.com', year: '',
    summary: '질환별 맞춤 식이 관리를 위해 식단, 식품, 복약 정보를 연결하는 서비스입니다.',
    // Planning PDF was not available. This text uses only the user's supplied brief.
    overview: ['질환별 맞춤 식이 관리를 위한 서비스입니다. 식단, 식품, 복약 정보를 연결하여 사용자에게 개인화된 식단 관리 경험을 제공하도록 기획했습니다.'],
    caption: '질환별 맞춤 식이 관리 서비스', contentImages: [],
  },
  {
    id: 'project-03', title: '쉼표(拘束)', meta: 'Web · Game', category: 'Serious game',
    thumbnail: gameImage, thumbnailAlt: '책상과 침대가 있는 방을 보여주는 Serious Game 화면', imageWidth: 860, imageHeight: 586,
    url: '', year: '',
    summary: '게임 화면을 소개합니다. 기획 의도와 제작 과정은 추가 자료 확인 후 업데이트할 예정입니다.',
    overview: ['게임 프로젝트의 대표 화면입니다. 프로젝트의 주제, 기획 의도, 제작 과정은 추가 자료 확인 후 업데이트할 예정입니다.'],
    caption: 'Serious Game — 프로젝트 화면', contentImages: [],
  },
  {
    id: 'lets-sync', title: "LET’S SYNC!", meta: 'Web · Branding', category: 'Web · Branding',
    thumbnail: syncImage, thumbnailAlt: 'LET’S SYNC! — 컬러풀한 타이포그래피 브랜딩', imageWidth: 859, imageHeight: 585,
    url: '', year: '', summary: '타이포그래피와 그래픽을 연결한 웹 및 브랜딩 프로젝트입니다.',
    overview: ['타이포그래피와 그래픽을 연결한 웹 및 브랜딩 프로젝트입니다.'],
    caption: 'LET’S SYNC! — Web · Branding', contentImages: [],
  },
  {
    id: 'blah-blah', title: 'BLAH BLAH BLAH', meta: 'PERSONAL · POSTER', category: 'Personal poster',
    thumbnail: blahImage, thumbnailAlt: 'BLAH BLAH BLAH — 컬러풀한 개인 포스터', imageWidth: 480, imageHeight: 599,
    url: '', year: '', summary: '캐릭터와 타이포그래피를 구성한 개인 포스터 작품입니다.',
    overview: ['캐릭터와 타이포그래피를 구성한 개인 포스터 작품입니다.'],
    caption: 'BLAH BLAH BLAH', contentImages: [],
  },
  {
    id: 'project-04', title: 'Poster 01', subtitle: 'TAKE IT LITERALLY!', meta: 'PERSONAL · POSTER', category: 'Personal poster',
    thumbnail: poster01Image, thumbnailAlt: 'TAKE IT LITERALLY! — 영어 표현을 그림으로 풀어낸 포스터', imageWidth: 2186, imageHeight: 1546,
    url: '', year: '',
    summary: '영어 표현을 글자 그대로 시각화한 일러스트와 타이포그래피를 담은 개인 포스터 작품입니다.',
    overview: ['영어 표현을 글자 그대로 시각화한 일러스트와 타이포그래피를 담은 개인 포스터 작품입니다. 여러 표현을 캐릭터로 풀어낸 구성과 HEADLINE을 소재로 한 이미지를 함께 담았습니다.'],
    caption: 'TAKE IT LITERALLY! — A User’s Manual', contentImages: [],
  },
  {
    id: 'poster-02', title: 'Poster 02', subtitle: '本日の観察記録', meta: 'PERSONAL · POSTER', category: 'Personal poster',
    thumbnail: poster02Image, thumbnailAlt: '本日の観察記録 — 다양한 표정과 인물을 담은 세로형 포스터', imageWidth: 1360, imageHeight: 1916,
    url: '', year: '',
    summary: '다양한 표정과 인물을 레드와 청록색 라인 드로잉으로 담은 개인 포스터 작품입니다.',
    overview: ['다양한 표정과 인물을 레드와 청록색 라인 드로잉으로 담은 개인 포스터 작품입니다. 30개의 인물 드로잉과 일본어 타이포그래피를 세로형 화면에 구성했습니다.'],
    caption: '本日の観察記録', contentImages: [],
  },
  {
    id: 'poster-04', title: 'Poster 04', subtitle: 'なんか', meta: 'PERSONAL · POSTER', category: 'Personal poster',
    thumbnail: poster04Image, thumbnailAlt: 'なんか — 레드 컬러의 개인 포스터', imageWidth: 294, imageHeight: 559,
    url: '', year: '', summary: '타이포그래피와 일러스트를 구성한 개인 포스터 작품입니다.',
    overview: ['타이포그래피와 일러스트를 구성한 개인 포스터 작품입니다.'],
    caption: 'なんか', contentImages: [],
  },
]

export const projectPath = id => `${import.meta.env.BASE_URL}projects/${id}`
export const findProject = pathname => projects.find(project => projectPath(project.id) === pathname.replace(/\/$/, ''))
