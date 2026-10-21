import monologImage from '../assets/monolog.png'
import notomatoImage from '../assets/notomato.png'
import gameImage from '../assets/game.png'
import poster01Image from '../assets/poster01.png'
import poster02Image from '../assets/poster02.png'

// Keep existing IDs/URLs compatible. Add real detail images to contentImages;
// the supplied cover is also shown as the final result until more media exists.
export const projects = [
  {
    id: 'ProjectName', title: 'MONOLOG', meta: 'WEB · INTERACTION', category: 'Interactive website',
    thumbnail: monologImage, thumbnailAlt: 'MONOLOG — The Shape of Language', imageWidth: 1882, imageHeight: 1038,
    url: 'https://mono-log.onrender.com', year: '',
    summary: '한국어, 중국어, 일본어, 영어의 서로 다른 언어 표현을 비교하고 탐색하는 인터랙티브 웹사이트입니다.',
    overview: ['한국어, 중국어, 일본어, 영어의 서로 다른 언어 표현을 비교하고 탐색하는 인터랙티브 웹사이트입니다. 언어마다 달라지는 표현을 다양한 시각적 요소와 인터랙션으로 경험할 수 있도록 구성했습니다.'],
    caption: 'The Shape of Language — Exploring Meaning Beyond Translation', contentImages: [],
  },
  {
    id: 'project-02', title: 'NOTOMATO', meta: 'UX/UI · SERVICE DESIGN', category: 'Service design',
    thumbnail: notomatoImage, thumbnailAlt: 'NOTOMATO 서비스 대표 이미지', imageWidth: 1514, imageHeight: 1042,
    url: 'https://notomato.onrender.com', year: '',
    summary: '질환별 맞춤 식이 관리를 위해 식단, 식품, 복약 정보를 연결하는 서비스입니다.',
    // Planning PDF was not available. This text uses only the user's supplied brief.
    overview: ['질환별 맞춤 식이 관리를 위한 서비스입니다. 식단, 식품, 복약 정보를 연결하여 사용자에게 개인화된 식단 관리 경험을 제공하도록 기획했습니다.'],
    caption: '질환별 맞춤 식이 관리 서비스', contentImages: [],
  },
  {
    id: 'project-03', title: 'Serious Game', meta: 'GAME', category: 'Serious game',
    thumbnail: gameImage, thumbnailAlt: '책상과 침대가 있는 방을 보여주는 Serious Game 화면', imageWidth: 2048, imageHeight: 1167,
    url: '', year: '',
    summary: '게임 화면을 소개합니다. 기획 의도와 제작 과정은 추가 자료 확인 후 업데이트할 예정입니다.',
    overview: ['게임 프로젝트의 대표 화면입니다. 프로젝트의 주제, 기획 의도, 제작 과정은 추가 자료 확인 후 업데이트할 예정입니다.'],
    caption: 'Serious Game — 프로젝트 화면', contentImages: [],
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
]

export const projectPath = id => `${import.meta.env.BASE_URL}projects/${id}`
export const findProject = pathname => projects.find(project => projectPath(project.id) === pathname.replace(/\/$/, ''))
