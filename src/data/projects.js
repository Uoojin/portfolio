const description = '프로젝트에 대한 상세 설명 내용이 들어가는 자리입니다. 프로젝트에 대한 상세 설명 내용이 들어가는 자리입니다. 프로젝트에 대한 상세 설명 내용이 들어가는 자리입니다.'

// Coordinates are measured from the 7902 x 1080 PDF, independent of viewport width.
export const detailLayout = {
  width: 7902,
  height: 1080,
  media: [
    { id: 'hero', kind: 'video', x: 732, y: 118, width: 1504, height: 845, fontSize: 49.090912 },
    { id: 'portrait', kind: 'image', x: 3160, y: 0, width: 730, height: 1081, fontSize: 49.090912 },
    { id: 'video-top', kind: 'video', x: 4566.469238, y: 0, width: 943.062195, height: 528.37323, fontSize: 63.418884 },
    { id: 'video-bottom', kind: 'video', x: 4566.469238, y: 551.626953, width: 943.062195, height: 528.37323, fontSize: 63.418884 },
    ...Array.from({ length: 5 }, (_, index) => ({
      id: `image-${index + 1}`, kind: 'image', x: 5534, y: index * 216,
      width: 385, height: 216, fontSize: 49.090912,
    })),
  ],
  overview: { x: 2419, y: 345, width: 571 },
  caption: { x: 3974, y: 894, width: 440 },
  subtitle: { x: 6109, y: 345, width: 571 },
  next: { x: 6911, y: 0, width: 991, height: 1080 },
}

const summaries = [
  { id: 'ProjectName', title: 'ProjectName', meta: 'WEB · INTERACTION · REACT' },
  { id: 'ProjectName', title: 'ProjectName', meta: 'UX/UI · TEAM · WEB' },
  { id: 'ProjectName', title: 'ProjectName', meta: 'WEB · EXHIBITION · TEAM' },
  { id: 'ProjectName', title: 'ProjectName', meta: 'INTERACTION · PERSONAL' },
]

// Edit each project's metadata and media sources here; frame geometry stays in detailLayout.
export const projects = summaries.map((project, index) => ({
  ...project,
  date: '20XX. XX. XX',
  type: '개인/ 팀 프로젝트',
  role: '(role 영역 추가)',
  category: '분야',
  tools: ['사용툴 및 스킬', '사용툴 및 스킬'],
  url: '',
  overview: [description, description],
  caption: '프로젝트 상세 페이지에 대한 설명 내용이 들어가는 영역입니다.',
  sections: [{ title: 'SUBTITLE', paragraphs: [description, description] }],
  media: Object.fromEntries(detailLayout.media.map((frame) => [frame.id, {
    src: '', alt: '', poster: '', objectFit: 'cover',
    label: frame.kind === 'video' ? 'Project WebM' : 'Project WebP',
  }])),
  nextPreview: { src: '', alt: '', objectFit: 'cover' },
  nextCaption: '프로젝트 사용 기능?',
  nextProject: summaries[(index + 1) % summaries.length].id,
}))

export const projectPath = (id) => `/projects/${id}`
export const findProject = (pathname) => projects.find((project) => projectPath(project.id) === pathname.replace(/\/$/, ''))
