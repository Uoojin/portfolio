import mono01 from '../assets/project/detail/mono01.webp'
import mono02 from '../assets/project/detail/mono02.webp'
import mono03 from '../assets/project/detail/mono03.webp'
import notomato01 from '../assets/project/detail/notomato01.webp'
import notomato02 from '../assets/project/detail/notomato02.webp'
import notomato03 from '../assets/project/detail/notomato03.webp'
import game01 from '../assets/project/detail/game01.webp'
import game02 from '../assets/project/detail/game02.webp'
import sync01 from '../assets/project/detail/sync01.webp'
import sync02 from '../assets/project/detail/sync02.webp'

export const mainProjectOrder = ['ProjectName', 'project-02', 'project-03', 'lets-sync']

// Each project owns its copy, taxonomy and media sequence. These records do not
// change the portfolio cards or the independent poster detail experience.
export const projectDetails = {
  ProjectName: {
    title: 'MONO-LOG', color: '#4030ff', subtitle: '모노로그 · 서로 다른 언어 같은 감정의 기록',
    type: 'PERSONAL PROJECT', role: '같은 언어 안에서도 다른 표현을 탐구',
    media: 'WEB', subject: '언어', target: '일반 대중',
    intro: { src: mono01, width: 987, height: 825, alt: 'MONO-LOG 첫 화면을 보여주는 데스크톱 모니터 목업' },
    overview: {
      before: '모노로그는 ', highlight: '한국어·일본어·중국어·영어',
      after: ' 네 가지 언어의 단어와 표현, 문장과 화법을 비교하며 언어 속에 담긴 감정과 의미의 차이를 탐색합니다. 같은 마음이 언어마다 어떻게 다르게 전달되는지 살펴보며, 번역만으로는 전해지지 않는 언어의 결을 발견할 수 있습니다.',
      english: 'MONO-LOG explores differences in emotion and meaning across Korean, Japanese, Chinese, and English, revealing nuances that cannot always be conveyed through direct translation.',
    },
    visuals: [
      { src: mono02, width: 3119, height: 760, alt: 'MONO-LOG 언어별 그래픽과 Language, Flow, Nuance 탐색 구성', label: 'PROJECT STRUCTURE' },
      { src: mono03, width: 3425, height: 1080, alt: 'MONO-LOG 고유어, 소리, 문단과 활용 사례의 화면 구성', label: 'CONTENT & INTERACTION', description: '고유어에서 시작해 의성어·의태어, 문단과 문장, 실제 활용 사례로 이어지도록 탐색 순서를 구성했습니다.\n\n콘텐츠의 특징에 따라 레이아웃과 인터랙션을 다르게 설계하여 새로운 경험을 제공하면서도, 전체적으로 일관된 탐색 흐름을 유지할 수 있도록 했습니다.' },
    ],
  },
  'project-02': {
    title: 'NOTOMATO', color: '#ff58a5', subtitle: '의료용 식이 관리 플랫폼',
    type: 'TEAM PROJECT', role: '프로젝트 기획 및 개발',
    media: 'APP · WEB', subject: '의료', target: '일반 대중 · 시니어',
    intro: { src: notomato01, width: 993, height: 825, alt: 'NOTOMATO 의료용 식이 관리 플랫폼의 모니터 목업' },
    overview: {
      quote: '“보편적 건강 상식이 소외시킨 이들을 위한 단 하나의 서비스”',
      body: '식단 관리가 필요한 질환자를 위해 안전하고 편리한 식사를 지원하는 맞춤형 의료 식이 관리 플랫폼입니다.\n\n보편적 건강 상식의 한계를 넘어, NOTOMATO는 사용자의 질환 정보와 식단·식품·복약 데이터를 통합 분석하여 개인에게 최적화된 관리 환경을 제공하는 것을 목표로 합니다.',
    },
    visuals: [
      { src: notomato02, width: 2670, height: 1080, alt: 'NOTOMATO 서비스 정보 구조도', label: 'SERVICE STRUCTURE' },
      { src: notomato03, width: 1601, height: 1080, alt: 'NOTOMATO 모바일 식이 관리 서비스 화면', label: 'SERVICE DESIGN' },
    ],
  },
  'project-03': {
    title: '쉼표(拘束)', color: '#46b7d3', subtitle: '끝나지 않은 경쟁 속의 멈춤',
    type: 'PERSONAL PROJECT', role: '',
    media: 'WEB · GAME', subject: '사회', target: '대학생/청년',
    intro: { src: game01, width: 987, height: 820, alt: '쉼표(拘束) 게임 시작 화면을 보여주는 모니터 목업' },
    overview: {
      quote: '“끝없이 높아지는 기준 속에서 ‘쉼’을 경험하는 청년의 이야기”',
      body: '본 게임은 취업을 준비하는 청년이 능력을 키워나가는 과정 속에서, 자신의 의지와 관계없이 쉬는 상태에 놓이게 되는 과정을 다룹니다.\n\n플레이어는 공부, 경험 등을 통해 스스로를 성장시키지만, 동시에 사회가 요구하는 기준에 계속 순응하게 됩니다.',
    },
    visuals: [{ src: game02, width: 1617, height: 1080, alt: '쉼표(拘束)의 책상과 침대가 있는 방 및 게임 대화 화면', label: 'GAME SCREEN' }],
  },
  'lets-sync': {
    title: "LET'S SYNC!", color: '#ff0aab', subtitle: '디지털미디어디자인 졸업전시 브랜딩',
    type: 'PROJECT', role: '졸업전시 웹사이트 제작',
    media: 'WEB · 전시 · 브랜딩', subject: '문화/예술', target: '일반 대중',
    intro: { src: sync01, width: 987, height: 820, alt: 'LET’S SYNC! 졸업전시 브랜딩 모니터 목업' },
    visuals: [{ src: sync02, width: 1599, height: 1080, alt: 'LET’S SYNC! 컬러풀한 졸업전시 타이포그래피 그래픽', label: 'PROJECT VISUAL' }],
  },
}
