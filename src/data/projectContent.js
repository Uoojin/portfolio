import { projects } from './projects.js'

const newDetailsById = {
  ProjectName: {
    subtitle: 'A Record of Shared\nExperiences Across Languages',
    description: 'MONOLOG is a language exploration service that allows users to compare and experience how the same meaning can be expressed differently across languages. Focusing on Korean, Japanese, Chinese, and English, it is designed to help users explore how each language expresses emotions and situations in its own unique way.',
    media: 'UIUX · WEB',
    subject: 'Language & Culture',
    target: 'General Public',
    type: 'Personal Project',
    tools: ['Figma', 'React', 'Framer Motion'],
    award: '전공 연합 PT 프론트엔드 개발 부문 우수작',
  },
  'lets-sync': {
    subtitle: '디지털미디어디자인 졸업전시 브랜딩',
    description: '타이포그래피와 그래픽을 연결한 웹 및 브랜딩 프로젝트입니다.',
    media: 'WEB · 전시 · 브랜딩',
    subject: '문화/예술',
    target: '일반 대중',
    type: 'PROJECT',
  },
  'project-02': {
    subtitle: '의료용 식이 관리 플랫폼',
    description: '질환별 맞춤 식이 관리를 위해 식단, 식품, 복약 정보를 연결하는 서비스입니다.',
    media: 'APP · WEB',
    subject: '의료',
    target: '일반 대중 · 시니어',
    type: 'TEAM PROJECT',
  },
  'project-03': {
    subtitle: '끝나지 않은 경쟁 속의 멈춤',
    description: '본 게임은 취업을 준비하는 청년이 능력을 키워나가는 과정 속에서, 자신의 의지와 관계없이 쉬는 상태에 놓이게 되는 과정을 다룹니다.',
    media: 'WEB · GAME',
    subject: '사회',
    target: '대학생/청년',
    type: 'PERSONAL PROJECT',
  },
  'project-04': {
    description: '영어 표현을 글자 그대로 시각화한 일러스트와 타이포그래피를 담은 개인 포스터 작품입니다.',
    type: 'Personal poster',
  },
  'poster-02': {
    description: '다양한 표정과 인물을 레드와 청록색 라인 드로잉으로 담은 개인 포스터 작품입니다.',
    type: 'Personal poster',
  },
  'blah-blah': {
    description: '캐릭터와 타이포그래피를 구성한 개인 포스터 작품입니다.',
    type: 'Personal poster',
  },
  'poster-04': {
    subtitle: 'なんか',
    description: '타이포그래피와 일러스트를 구성한 개인 포스터 작품입니다.',
    type: 'Personal poster',
  },
}

export const projectContent = Object.fromEntries(projects.map(project => [project.id, {
  title: project.name,
  url: project.url,
  heroImage: project.cover,
  heroWidth: 1200,
  heroHeight: 900,
  subtitle: '',
  description: '',
  media: '',
  subject: '',
  target: '',
  detailSections: [],
  ...newDetailsById[project.id],
}]))
