import NotomatoFlowCharts from './NotomatoFlowCharts.jsx'
import '../styles/notomato-content.css'

const features = [
  'AI 식품 분석으로 약물·식단 위험 사전 예방',
  '바코드·사진 촬영으로 간편한 식사 및 복약 관리',
  '신체 데이터 피드백을 통한 개인 맞춤형 식단',
]

const problems = [
  ['식품 선택의 불확실성', <>복잡한 영양 성분표와 질환별로 <em>상이한 제한 수치</em> 때문에 매번 선택의 기로에서 불안감을 느낍니다. 단순한 칼로리 계산을 넘어선 메디컬 기준의 <em>명확한 가이드</em>가 부재합니다.</>],
  ['복약과 식단의 위험한 상호작용', <>약과 음식이 만나면 때로는 독이 될 수 있습니다. 하지만 일반인은 어떤 약이 특정 음식과 충돌하는지 알기 어렵고, 기존 서비스들은 복약과 식단을 <em>통합하여 분석</em>해주지 못하고 있습니다.</>],
  ['관리의 높은 심리적 허들', <>식이 관리는 '평생' 지속되어야 하지만, 매 끼니 기록하고 계산하는 과정은 큰 피로감을 줍니다. 보호자의 <em>관리 부담이 가중</em>되면서 시간이 흐를수록 관리가 느슨해지거나 포기하게 되는 <em>구조적 한계가 존재</em>합니다.</>],
]

const solutions = [
  ['식품 정보 해석의 어려움', '자신의 질환에 적합한 식품인지 판단하기 어렵습니다.', '질환 맞춤 식품 분석', '바코드 스캔으로 질환 기준에 맞는 식품인지 확인할 수 있습니다.'],
  ['맞춤형 식단 가이드의 한계', '개개인의 건강 상태에 맞는 식사 피드백을 받기 어렵습니다.', 'AI 기반 식사 피드백', '촬영된 식단을 분석해 건강 상태에 맞는 맞춤형 피드백을 제공합니다.'],
  ['복약과 식단의 위험한 상호작용', '약물-식품 간 주의사항을 지속적으로 관리하기 어렵습니다.', '복약·식단 통합 관리', '복용 중인 약과 음식 간 상호작용을 분석해 안전한 식사를 돕습니다.'],
]

export default function NotomatoContent() {
  return <div className="notomato-content" lang="en">
    <section className="notomato-overview" aria-label="NOTOMATO Overview">
      <h2 className="notomato-kicker">NOTOMATO</h2>
      <p className="notomato-quote" lang="ko">“보편적 건강 상식이 소외시킨 이들을 위한 단 하나의 서비스”</p>
      <div className="notomato-intro" lang="ko">
        <p>식단 관리가 필요한 질환자를 위해 안전하고 편리한 식사를 지원하는 <em>맞춤형 의료 식이 관리</em> 플랫폼입니다.</p>
        <p>보편적 건강 상식의 한계를 넘어, NOTOMATO는 사용자의 질환 정보와 식단·식품·복약<br className="notomato-wide-break" /> 데이터를 통합 분석하여 <em>개인에게 최적화된 식단 관리 환경을 제공</em>하는 것을 목표로 합니다.</p>
      </div>
      <span className="notomato-connector" aria-hidden="true" />
      <ul className="notomato-features" lang="ko">
        {features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
      <p className="notomato-overview-summary" lang="ko">질환 데이터 기반 분석으로 식단, 식품, 복약까지 통합 관리하는 초개인화 식이 플랫폼입니다.</p>
    </section>

    <section className="notomato-problem">
      <h2 className="notomato-kicker">Problem</h2>
      <p className="notomato-quote" lang="ko">“매일 반복되는 식단 관리의 어려움”</p>
      <p className="notomato-problem-summary" lang="ko">질환 관리는 단순한 식단 조절을 넘어 복약과 건강 상태까지 고려한 정교한 관리가 필요합니다.<br className="notomato-wide-break" /> 하지만 복잡한 정보와 반복되는 관리 과정은 환자와 보호자 모두에게 큰 부담으로 작용하며, 안전한 식사를 어렵게 만듭니다.</p>
      <div className="notomato-problem-cards" lang="ko">
        {problems.map(([title, description]) => <div key={title}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>)}
      </div>
    </section>

    <section className="notomato-solution">
      <span className="notomato-connector" aria-hidden="true" />
      <h2 className="notomato-kicker">Solution</h2>
      <p className="notomato-quote" lang="ko"><span>데이터를 통해 불안을 확신으로 바꾸는 안심 식사 솔루션</span></p>
      <div className="notomato-solution-cards" lang="ko">
        {solutions.map(([issue, issueCopy, solution, solutionCopy]) => <div key={issue} className="notomato-solution-pair">
          <div className="notomato-issue-card"><h3>{issue}</h3><p>{issueCopy}</p></div>
          <span className="notomato-connector" aria-hidden="true" />
          <div className="notomato-answer-card"><h3>{solution}</h3><p>{solutionCopy}</p></div>
        </div>)}
      </div>
    </section>

    <NotomatoFlowCharts />
  </div>
}
