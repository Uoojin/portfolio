import { useId } from 'react'

// Each node uses its reference diagram's top-left coordinate and dimensions.
function FlowNode({ node }) {
  const [label, x, y, width = 108, height = 38, shape = 'function'] = node
  const filled = shape === 'screen' || shape === 'decision'
  return <g className={filled ? 'notomato-node is-filled' : 'notomato-node'} transform={`translate(${x} ${y})`}>
    {shape === 'input' ? (
      <polygon points={`24,0 ${width},0 ${width - 24},${height} 0,${height}`} />
    ) : shape === 'decision' || shape === 'login' ? (
      <polygon points={`${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`} />
    ) : (
      <rect width={width} height={height} rx={shape === 'terminal' ? height / 2 : 5} />
    )}
    <text x={width / 2} y={height / 2} dy=".04em" dominantBaseline="middle"
      textAnchor="middle" fontSize={label.length >= 9 && width <= 110 ? 13 : undefined}>{label}</text>
  </g>
}

const legendNodes = [
  ['시작/끝', 50, 23, 101, 36, 'terminal'],
  ['화면', 176, 23, 101, 36, 'screen'],
  ['기능', 296, 23, 101, 36],
  ['입력', 45, 89, 111, 31, 'input'],
  ['판단', 168, 78, 117, 52, 'decision'],
]

const loginNodes = [
  ['로그인', 47, 84, 164, 73, 'login'],
  ['회원가입', 277, 96, 142, 49],
  ['사용자 정보 입력', 474, 96, 205, 49, 'input'],
  ['회원가입 완료', 728, 96, 143, 49, 'terminal'],
  ['로그인 완료', 941, 96, 142, 49, 'terminal'],
]

const loginPaths = [
  ['M129 84V34Q129 17 146 17H994Q1012 17 1012 34V95', 'open'],
  ['M211 120.5H275', 'solid'],
  ['M419 120.5H487', 'solid'],
  ['M667 120.5H726', 'solid'],
  ['M871 120.5H939', 'solid'],
]

const serviceNodes = [
  ['서비스 진입', 44, 16, 108, 38, 'terminal'],
  ['Home', 200, 16, 108, 38, 'screen'],
  ['복약 상태', 316, 16],
  ['추천 식단', 431, 16],
  ['맞춤 피드', 546, 16],
  ['Diet', 200, 89, 108, 38, 'screen'],
  ['캘린더', 316, 89],
  ['복약 스케줄', 316, 162],
  ['식단', 431, 162],
  ['식단 상세', 431, 207, 108, 38, 'screen'],
  ['식단 수정 및 추가', 546, 209, 155, 34, 'input'],
  ['Feed', 200, 280, 108, 38, 'screen'],
  ['팔로잉 피드', 316, 280],
  ['추천 피드', 431, 280],
  ['피드 상세', 560, 280, 108, 38, 'screen'],
  ['저장된 피드', 316, 326],
  ['Report', 200, 422, 108, 38, 'screen'],
  ['내 정보', 316, 422],
  ['분석 리포트', 431, 422],
  ['병원 정보', 316, 471],
  ['식단 분석', 431, 471],
  ['질환 정보', 316, 520],
  ['영양 균형', 431, 520],
  ['내 목표', 316, 568],
  ['복약 실천율', 431, 568],
  ['수정 및 추가', 291, 616, 132, 34, 'input'],
  ['요약', 431, 616],
  ['리포트 상세', 431, 665],
  ['AI Camera', 200, 747, 108, 38, 'screen'],
  ['바코드 스캔', 316, 747],
  ['식단 촬영', 431, 747],
  ['AI 분석', 561, 747],
  ['안전한가?', 694, 738, 126, 56, 'decision'],
  ['안전', 852, 688],
  ['주의', 852, 747],
  ['위험', 852, 801],
  ['식단 추가', 1009, 747],
  ['회원정보 수정', 227, 917],
  ['커뮤니티', 342, 917],
  ['스크랩', 457, 917],
  ['설정', 572, 917],
  ['고객 지원', 687, 917],
  ['알림 설정', 572, 962],
  ['공지사항', 687, 962],
  ['서비스 이용 약관', 687, 1007],
  ['개인정보 처리 방침', 687, 1052],
]

const servicePaths = [
  ['M152 35H200'],
  ['M255 54V747', '', 'menu'],
  ['M368 127V161', 'solid'],
  ['M485 54V161', 'solid'],
  ['M539 226H558'],
  ['M423 299H431M539 299H559', 'solid'],
  ['M551 491H721Q728 491 728 484V180', '', 'cross'],
  ['M1136 766H1150Q1158 766 1158 758V188Q1158 180 1150 180H551', 'solid', 'cross'],
  ['M423 766H431M539 766H560', 'solid'],
  ['M669 766H692', 'solid'],
  ['M820 766H852M827 766V707H852M827 766V820H852'],
  ['M960 707H984V820H960M960 766H1009'],
]

function FlowDiagram({ label, viewBox, nodes, paths, children, description, className }) {
  const id = useId()
  return <svg className={className} viewBox={viewBox} role="img" aria-label={label}>
    {description && <desc>{description}</desc>}
    <defs>
      <marker id={`${id}-solid`} viewBox="0 0 8 8" refX="7" refY="4"
        markerWidth="7" markerHeight="7" orient="auto">
        <path className="notomato-arrow-fill" d="M0 0L8 4 0 8Z" />
      </marker>
      <marker id={`${id}-open`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="9" markerHeight="9" orient="auto">
        <path className="notomato-line" d="m3 1 5 4-5 4" />
      </marker>
    </defs>
    {children}
    {paths.map(([d, arrow, kind]) => <path key={d} className={`notomato-line ${kind || ''}`} d={d}
      markerEnd={arrow ? `url(#${id}-${arrow})` : undefined} />)}
    {nodes.map(node => <FlowNode key={`${node[1]}-${node[2]}`} node={node} />)}
  </svg>
}

export default function NotomatoFlowCharts() {
  return <>
    <section className="notomato-flow-legend">
      <h2>Flow Chart Component</h2>
      <FlowDiagram label="시작/끝, 화면, 기능, 입력, 판단, 흐름 범례" viewBox="0 0 442 148"
        nodes={legendNodes} paths={[[ 'M309 96H387', 'open' ]]}>
        <rect className="notomato-legend-bg" width="442" height="148" rx="14" />
        <text className="notomato-legend-caption" x="347" y="117" textAnchor="middle">흐름</text>
      </FlowDiagram>
    </section>

    <section className="notomato-login">
      <h2>Login &amp; Sign-Up Flow</h2>
      <div className="notomato-diagram-scroll" tabIndex={0} role="region" aria-label="로그인 플로우 다이어그램">
        <FlowDiagram label="로그인 및 회원가입" description="로그인에서 바로 로그인 완료로 이동하거나, 회원가입과 사용자 정보 입력, 회원가입 완료를 거쳐 로그인합니다."
          viewBox="0 0 1154 207" nodes={loginNodes} paths={loginPaths}>
          <rect className="notomato-group" x="239" y="52" width="664" height="137" rx="15" />
          <text className="notomato-group-label" x="569" y="58" textAnchor="middle">Sign-up</text>
        </FlowDiagram>
      </div>
    </section>

    <section className="notomato-service">
      <h2>Service Flow</h2>
      <div className="notomato-diagram-scroll" tabIndex={0} role="region" aria-label="서비스 플로우 다이어그램">
        <FlowDiagram label="Home, Diet, Feed, Report, AI Camera 및 서비스 메뉴의 전체 흐름"
          description="Report의 식단 분석과 AI Camera의 식단 추가는 Diet의 식단으로 연결됩니다. AI 분석 결과는 안전, 주의, 위험으로 분기한 뒤 식단 추가로 합쳐집니다."
          viewBox="0 0 1222 1144" nodes={serviceNodes} paths={servicePaths}>
          <rect className="notomato-group" x="200" y="887" width="620" height="231" rx="10" />
          <text className="notomato-group-label" x="224" y="892">서비스 메뉴</text>
          <circle className="notomato-arrow-fill" cx="551" cy="491" r="3" />
          <circle className="notomato-arrow-fill" cx="728" cy="180" r="3" />
          <circle className="notomato-arrow-fill" cx="1136" cy="766" r="3" />
        </FlowDiagram>
      </div>
    </section>
  </>
}
