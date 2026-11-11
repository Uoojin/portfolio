// 방 화면----------------------------------

const mainImg = document.querySelector(".main-img");
const room = document.querySelector(".room");
const door = document.querySelector(".door");
const desk = document.querySelector(".desk");
const bookcase = document.querySelector(".bookcase");
const roomWindow = document.querySelector(".window");
const bed = document.querySelector(".bed");
const back = document.querySelector(".back");

// 책상 화면----------------------------------

const deskView = document.querySelector(".desk-view");
const laptop = document.querySelector(".laptop");

// 시계 / 달력----------------------------------

const clock = document.querySelector(".clock");
const calendar = document.querySelector(".calendar");
const calendarLabel = document.querySelector(".calendar-label");
const clockFace = document.querySelector(".clock-face");
const calendarDate = document.querySelector(".calendar-date");
const dateLabel = document.querySelector(".date-label");
const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");

// 메시지----------------------------------

const messageText = document.querySelector(".message-text");
const messageBox = document.querySelector(".message-box");
const messageNext = document.querySelector(".message-next");
const noticeToast = document.querySelector(".notice-toast");

// 선택지----------------------------------

const choiceBox = document.querySelector(".choice-box");
const choices = document.querySelector(".choices");

// 작업창----------------------------------

const work = document.querySelector(".work");
const workScreen = document.querySelector(".work-screen");
const workText = document.querySelector(".work-text");

// 리포트----------------------------------

const report = document.querySelector(".report");
const reportBody = document.querySelector(".report-body");
const nextButton = document.querySelector(".next");

// 엔딩----------------------------------

const ending = document.querySelector(".ending");
const endingText = document.querySelector(".ending-text");
const endingRestart = document.querySelector(".ending-restart");

// 기타----------------------------------

const chapterScreen = document.querySelector(".chapter");
const chapterDay = document.querySelector(".chapter-day");
const chapterDate = document.querySelector(".chapter-date");
const blackout = document.querySelector(".blackout");
const sleepText = document.querySelector(".sleep-text");

// 데이터----------------------------------

const DAY_START = 8 * 60;

const reportDates = [
  "2026.03.02",
  "2026.03.08",
  "2026.06.26",
  "2026.07.28",
  "2026.09.29",
  "2026.10.15",
  "2027.01.30",
];

const reportStandards = [
  "토익 우대, 포트폴리오 권장, 자격증 우대",
  "토익 800 이상 우대, 포트폴리오 권장, 자격증 우대",
  "토익 850 이상 우대, 포트폴리오 필수, 실무 경험 우대",
  "토익 850 이상, 포트폴리오 필수, 직무 프로젝트 경험 우대",
  "토익 900 이상, 포트폴리오 필수, 실무 경험 필수, 인턴 경험 우대",
  "경력직 우대, 관련 프로젝트 경험 필수, 포트폴리오 제출 필수, 다수의 직무 역량 요구",
  "경력직 우대, 실무 경험 필수, 포트폴리오 제출 필수, 즉시 투입 가능자 우대",
];

const dayEndLines = [
  "창밖이 조금 어두워졌다.\n오늘은 생각보다 많은 걸 했다.",
  "시간이 꽤 지나 있었다.\n아직 할 일은 조금 남아 있었다.",
  "밖은 이미 어두워져 있었다.\n해야 할 일은 줄지 않은 것 같다.",
  "하루가 또 끝났다.\n무언가를 했는데 남은 건 별로 없다.",
  "시간이 어디로 갔는지 잘 모르겠다.\n책상 위에는 열어둔 것들만 남았다.",
  "오늘 뭘 했는지 잘 기억나지 않는다.\n모니터 불빛만 희미하게 남아 있었다.",
  "방은 조용했다.\n오늘이라는 말도 더는 또렷하지 않았다.",
];

const pressureNotifications = [
  [
    "새 공고가 등록되었습니다.",
    "지원 마감일 D-10 입니다.",
    "채용 설명회 일정을 확인해보세요.",
  ],
  [
    "지원 마감일 D-7 입니다",
    "서류 전형 결과 아쉽게도 불합격입니다.",
    "새 공고가 등록되었습니다.",
  ],
  [
    "평균 토익 850점 이상 우대.",
    "OO: 와 나 붙었어! 밥이나 한 번 먹자.",
    "서류 전형 결과 아쉽게도 불합격입니다.",
  ],
  ["포트폴리오 제출 필수", "관련 직무 경력자 우대.", "지원 마감일 D-4입니다."],
  [
    "읽지 않은 메일이 13개 입니다.",
    "지원 마감일 D-2입니다.",
    "경력직 수시 채용 안내.",
  ],
  [
    "OO: 요즘 어떻게 지내? 연락 좀 해.",
    "읽지 않은 메일이 17개가 있습니다.",
    "불합격 안내 메일이 도착했습니다.",
  ],
  [
    "읽지 않은 알림 25개",
    "귀하의 역량은 우수하나..",
    "답장하지 않은 메시지가 있습니다.",
  ],
];

const chapters = [
  {
    date: "03.02",
    dayLabel: "DAY 1",
    label: "3월 2일",
    opening:
      "알람 소리에 기분 좋게 눈이 떠졌고 창밖 햇살도 딱 좋다.\n왠지 상반기 시작부터 느낌이 예사롭지 않다. 아직 의욕 넘치는 아침이다.",
    start: "08:00",
    end: "10:00",
    held: "자기소개서 지원 동기 작성",
    maxActions: 3,
    actionAfter: {
      cover:
        "막혔던 지원동기 첫 문장이 드디어 풀렸다.\n\n고개를 드니 아직 환한 낮이다. 시작이 아주 좋다.",
      book: "자격증 이론서를 펼치고 핵심 요약본을 정리했다.\n\n개념들이 머리에 쏙쏙 들어오는 게 시험 공부 진도도 아주 순조롭다.",
      bed: "잠깐 누워 기분 좋은 상상을 했다.\n\n합격 전화를 받고 기뻐하는 내 모습이 그려져 금방 다시 힘차게 일어났다.",
      walk: "가벼운 발걸음으로 동네를 한 바퀴 돌았다.\n\n바람이 시원해서 머릿속이 맑아졌고,\n방으로 돌아왔을 때의 아늑함이 오늘따라 참 좋게 느껴졌다.",
    },
    texts: {
      room: "화사한 아침 햇살이 가득하다.\n의욕이 넘쳐서 그런지 오늘따라 기분이 싱그럽다.",
      desk: "깔끔하게 정리된 책상.\n새 다이어리가 있어서 뭐든 새로 시작할 수 있을 것 같다.",
      bed: "침대가 너무 가까이 있어서 자꾸 눕고 싶어진다.",
      door: "당당하게 문을 열고 나갔다가,\n금방 기분 좋은 합격 소식을 들고 돌아올 수 있을 것만 같다.",
      window:
        "출근하는 바쁜 사람들이 보인다.\n멀지 않은 미래에 나도 저 틈에 섞여 출근하고 있겠지?",
      calendar:
        "3월 2일.\n본격적인 취준 시작일. 첫 단추를 아주 잘 끼운 것 같아 뿌듯하다.",
      clock:
        "시계 바늘이 이제 막 아침을 가리킨다.\n일찍 시작했다는 사실만으로도 한 걸음 앞서나간 기분이다.",
      book: "두꺼운 전공 수험서의 첫 장.\n개념들이 한눈에 쏙 들어오는 게 공부 집중이 아주 잘된다.",
      laptop:
        "노트북을 켜자 하얀 빈 문서가 나를 반긴다.\n여기에 내 멋진 스토리들을 채워 넣을 생각을 하니 조금 설렌다.",
    },
  },
  {
    date: "03.08",
    dayLabel: "DAY 2",
    label: "3월 8일",
    opening:
      "벌써 일주일이 지났다.\n시간이 왜 이렇게 빠르지? 그래도 처음보다는 실력이 조금 늘었거니 믿는다.",
    start: "08:00",
    end: "14:00",
    held: "자기소개서 첫 문단 수정",
    maxActions: 3,
    actionAfter: {
      cover:
        "지난주에 쓴 글을 다시 읽고 고쳤다.\n\n겨우 첫 문단 수정을 끝냈는데 벌써 오후다. 마음이 조금 조급해진다.",
      book: "자격증 문제집을 다시 펼쳤다.\n\n분명 아는 이론인데 오늘따라 오답률이 왜 이렇게 높은지 모르겠다.",
      bed: "집중이 안 돼서 잠깐 누웠는데 몸이 천근만근이다.\n\n책상 위에 남은 할 일들을 보니 한숨이 살짝 나온다.",
      walk: "답답해서 집 앞 편의점에 다녀왔다.\n\n벌써 해가 지고 있길래 돌아오는 발걸음이 나도 모르게 빨라졌다.",
    },
    texts: {
      room: "왠지 아침이 지난주보다 짧아진 느낌이다.\n먹다 남은 컵이 구석에 그대로 놓여 있다.",
      desk: "지난주에 쓴 자소서와 오늘 새로 뽑은 공고가 얽혀 있다.\n어디부터 손대야 할지 약간 고민된다.",
      bed: "침대가 너무 가까이 있어서 자꾸 눕고 싶어진다.\n유혹을 참으려고 애써 고개를 돌렸다.",
      door: "문고리를 잡았다가, 딱히 갈 곳도 없다는 생각이 들어 그냥 손을 뗐다.",
      window:
        "바깥 풍경을 보는데 나도 모르게 시계부터 확인하게 된다.\n시간이 왜 이렇게 빨리 가지?",
      calendar:
        "3월 8일.\n겨우 일주일 지났을 뿐인데, 자소서를 쓰다 지우다 하느라 벌써 조금 피곤하다.",
      clock:
        "시계 바늘이 쉴 새 없이 움직인다.\n잠깐 멍 때린 것 같은데 벌써 한 시간이 지나 있다.",
      book: "교재에 형광펜 줄이 가득 쳐져 있다.\n외워야 할 공식은 산더미인데 머릿속에 잘 안 들어온다.",
      laptop:
        "자소서 파일 이름 뒤에 '_수정', '_진짜수정'이 붙기 시작했다.\n시간을 쏟은 흔적들이다.",
    },
  },
  {
    date: "06.26",
    dayLabel: "DAY 3",
    label: "6월 26일",
    opening:
      "오늘이 벌써 6월 말?\n분명 매일 모니터 앞에 앉아 있었는데 날짜 감각이 점점 흐려지는 것 같다.",
    start: "08:00",
    end: "18:30",
    held: "같은 문장 여러 번 지우기",
    maxActions: 2,
    actionAfter: {
      cover:
        "온종일 같은 문장만 붙잡고 썼다 지웠다 했다.\n\n정신을 차려보니 밖은 이미 깜깜했고, 건진 문장은 하나도 없다.",
      book: "기출문제 풀이를 보는데 자꾸만 눈이 한 줄에 멈춘다.\n\n정답을 찾는 게 아니라, 자꾸 내 미래에 대한 불안감만 곱씹게 된다.",
      bed: "정말 딱 10분만 쉬려고 누웠는데 눈을 뜨니 저녁이다.\n\n개운함보다 시간만 날렸다는 죄책감이 온몸을 짓누른다.",
      walk: "머리가 터질 것 같아 밖으로 무작정 나왔다.\n\n걷는 내내 아까 지운 문장들이 맴돌아서 산책을 해도 전혀 기쁘지 않다.",
    },
    texts: {
      room: "물건들은 다 그대로인데, 내 마음만 점점 조급해지고 불안해진다.",
      desk: "같은 문장을 이리저리 꼬아놓은 고민의 흔적과 낙서들이 가득하다.",
      bed: "낮에 여기에 누우면 그대로 무너져 내릴 것 같아서, 애써 의자에 매달려 있다.",
      door: "문을 열고 나가기가 두렵다.\n밖에 나가면 다들 바쁘게 사는데 나만 멈춰 있는 걸 확인하게 되니까.",
      window:
        "세상은 바쁘게 돌아가는데,\n나만 이 좁은 구석에 갇혀 한 발짝도 못 나가는 기분이다.",
      calendar: "6월 말.\n벌써 상반기가 끝났다는 사실을 마주하기가 두렵다.",
      clock: "째깍거리는 시계 소리가 왜 이렇게 나를 자책하는 소리처럼 들릴까.",
      book: "두꺼운 전공 서적에 책갈피만 늘어간다.\n기본 개념조차 기억이 안 나서 어디서부터 복습해야 할지 모르겠다.",
      laptop:
        "노트북은 온종일 켜져 있는데 자소서는 진전이 없다.\n하얀 화면이 나를 압박하는 것 같다.",
    },
  },
  {
    date: "07.28",
    dayLabel: "DAY 4",
    label: "7월 28일",
    opening:
      "방 안의 공기가 부쩍 덥고 눅눅해졌다.\n\n오늘도 한숨을 쉬며 늘 보던 파일을 열었다.",
    start: "08:00",
    end: "22:00",
    held: "저장했지만 완성되지 않은 자기소개서",
    maxActions: 2,
    actionAfter: {
      cover:
        "결국 첫 문단에서 한 걸음도 못 나갔다.\n\n마감 시간은 다가오는데 완성된 건 없고, 창밖은 벌써 어둡다.",
      book: "가산점 자격증 교재를 다시 읽었지만 머리가 터질 것 같다.\n\n남들은 기본으로 따는 거라는데 난 왜 이해가 안 갈까. 마음만 무겁다.",
      bed: "머리가 아파서 아주 잠깐 누웠는데 깨어보니 밤이다.\n\n이불 밖으로 몸을 일으키기가 너무 싫고 무기력해진다.",
      walk: "더운 밤공기를 맞으며 동네를 터덜터덜 걸었다.\n\n내가 지금 뭘 하고 있는 건가 싶어 서글픈 마음만 안고 돌아왔다.",
    },
    texts: {
      room: "공기가 후덥지근하고 무겁다.\n사방이 막힌 좁은 공간에 갇힌 기분이다.",
      desk: "굴러다니는 에너지 드링크 캔과 영양제들이 지친 하루를 보여준다.",
      bed: "이불이 이리저리 헝클어져 있다.\n치울 기운도 없어서 그냥 그대로 둔다.",
      door: "문밖은 매미 소리로 시끄러운 여름인데,\n나가면 내 초라한 처지만 더 도드라져 보일 것 같다.",
      window:
        "창밖 나뭇잎들이 새파랗게 우거졌다.\n세상은 저렇게 푸르른데 내 미래는 왜 이렇게 시커먼지.",
      calendar:
        "7월 28일.\n날짜를 확인하는 것 자체가 이제는 엄청난 스트레스다.",
      clock:
        "분명 아침에 일어난 것 같은데,\n시계를 보면 야속하게도 자꾸 밤 10시, 11시로 가 있다.",
      book: "시험 범위를 펼칠 때마다 한숨만 나온다.\n외워도 돌아서면 까먹는데, 다음 달 시험을 볼 수나 있을까.",
      laptop:
        "자소서 파일 이름이 '최종_진짜최종_최종본2.docx'\n알맹이는 없는데 이름만 거창해진다.",
    },
  },
  {
    date: "09.29",
    dayLabel: "DAY 5",
    label: "9월 29일",
    opening:
      "휴대폰 알림은 울리지만, 이제는 무서워서 바로 보지 못하겠다.\n\n'하루를 시작한다'는 말이 이제는 너무 무섭다.",
    start: "08:00",
    end: "23:50",
    held: "오타 하나 수정",
    maxActions: 2,
    actionAfter: {
      cover:
        "자소서를 어디서부터 손대야 할지 전혀 모르겠다.\n\n겨우 오타 몇 개 고쳤을 뿐인데 하루가 다 가버렸다. 다 회피하고 싶다.",
      book: "인터넷 강의를 켜봐도 전문 용어들이 무의미한 소음처럼 흩어진다.\n\n아무리 들여다봐도 머리에 남는 게 전혀 없다.",
      bed: "침대에 누워 눈을 감았는데, 쉰다는 느낌은 전혀 안 들고\n심장만 불안하게 쿵쾅거려 괴로웠다.",
      walk: "바람이라도 쐬려고 무작정 나갔는데 발걸음이 너무 무거웠다.\n\n집에 돌아오는 길이 너무 멀고 아득하게만 느껴졌다.",
    },
    texts: {
      room: "날짜가 며칠인지 중요하지 않다. 그냥 어제 같은 오늘이 무한 반복되는 느낌이다.",
      desk: "책상 위는 잡동사니로 가득한데, 정작 완성해 놓은 이력서는 단 하나도 없다.",
      bed: "여기 누우면 영영 못 일어날 것 같고,\n그렇다고 안 눕자니 온몸이 부서질 것 같다.",
      door: "문밖에서 무슨 소리가 들려도 관심 없다.\n나를 찾는 건 차가운 불합격 알림음뿐이니까.",
      window:
        "낮에 해가 뜨고 밤에 해가 지는 걸\n전혀 인지하지 못한 채 하루를 보낸다.",
      calendar:
        "9월 29일.\n달력에 적힌 숫자들이 나를 재촉하는 시한부 시계 같다.",
      clock:
        "시간표는 이미 무너진 지 오래다.\n새벽에 깼다가 오후 늦게 인스턴트로 대충 때운다.",
      book: "교재 위에 먼지만 뽀얗게 쌓여 가고 있다.\n어차피 펴봤자 머리만 지치는데, 다시 펼칠 엄두가 안 난다.",
      laptop: "모니터 화면 한가운데에서 마우스 커서만 외롭게 깜빡, 깜빡거린다.",
    },
  },
  {
    date: "10.15",
    dayLabel: "DAY 6",
    label: "10월 15일",
    opening:
      "언제부터 이렇게 쌀쌀해졌는지는 전혀 모르겠다...\n\n시간은 가는데 노트북 화면만 멍하니 바라본다.",
    start: "08:00",
    end: "??:??",
    held: "자기소개서 창 바라보기",
    maxActions: 1,
    actionAfter: {
      cover:
        "깜빡이는 커서만 몇 시간 동안 쳐다봤다.\n\n언제 해가 지고 밤이 됐는지도 모르겠다. 내가 뭘 하려 했는지도.",
      book: "이론서를 펼치긴 했는데, 까만 건 글씨고 흰 건 종이라는 생각밖에 안 든다.\n\n글자를 읽는 기능 자체가 고장 나 버린 기분이다.",
      bed: "초점 없는 눈으로 천장을 바라보며 누워 있었다.\n\n얼마나 누워 있었는지 시간 확인조차 하지 않았다.",
      walk: "밖에 잠깐 나갔던 것 같기도 하다.\n\n정신을 차려보니 방 안에서 멍하니 신발장을 내려다보고 있었다.",
    },
    texts: {
      room: "방 안이 온통 어둡다.\n지금이 낮인지 밤인지 창문을 내다봐야 겨우 알 수 있다.",
      desk: "앞에 앉아 있으면 온몸의 에너지가 밑바닥으로 훅 꺼지는 것 같다.",
      bed: "이불이 너무 무거워서 몸을 일으킬 수가 없다.\n마음이 먼저 침대 밑으로 꺼진 것 같다.",
      door: "문이 너무 멀게 느껴진다. 이 문 밖으로 한 걸음도 나갈 수 없을 것 같다.",
      window:
        "창밖은 완연한 가을인 것 같은데.\n세상은 나만 쏙 빼놓고 저 멋리 흘러가 버렸다.",
      calendar:
        "10월 15일.\n달력에 날짜를 채워 넣는 행위 자체가 무의미하고 거짓말 같다.",
      clock: "시계 바늘을 보려고 해도 눈앞이 흐릿해서 숫자가 잘 안 읽힌다.",
      book: "책 속의 글자들이 도무지 읽히지 않고 뱅글뱅글 겉돈다.\n그냥 소리 없이 책을 덮어버렸다.",
      laptop:
        "자소서 프로그램은 켜져 있는데 제목만 겨우 읽을 수 있는 수준이다.",
    },
  },
  {
    date: "01.30",
    dayLabel: "DAY 7",
    label: "?",
    opening:
      "눈을 떠보니 노트북 화면이 환하게 켜져 있었다.\n\n이걸 언제 켰는지, 며칠 동안 이랬는지 생각나지 않는다.",
    start: "??:??",
    end: "??:??",
    held: "깜빡이는 커서",
    maxActions: 1,
    actionAfter: {
      cover:
        "무슨 말을 쓰려고 했는지 진짜 기억이 안 난다.\n\n커서 혼자 깜빡, 깜빡...\n내 하루도, 내 인생도 여기서 뚝 끊겨버린 것 같다.",
      book: "공부고 시험이고 책 표지를 열 힘조차 없다.\n\n이제 와서 펜을 붙잡는다고 내 삶이 달라질 것 같지 않다.",
      bed: "누워 있는 건지, 깨어 있는 건지 전혀 구분이 안 된다.\n\n사방이 지독하게 조용하다.",
      walk: "문밖으로 나가는 상상을 하려니 숨이 턱 막힌다.\n\n결국 이 지독한 공백 속에 나를 가둬버렸다.",
    },
    texts: {
      room: "공간이 너무 낯설다.\n이제 어디서부터 뭘 어떻게 시작해야 할지 아예 감도 안 잡힌다.",
      desk: "하얗게 빛나는 모니터 앞에 내 영혼이 묶여 있는 기분이다.",
      bed: "눕는 것도, 일어나는 것도 똑같이 무겁고 고통스럽다.",
      door: "문밖의 세상으로 나가는 게 너무 무서워서 손잡이를 잡을 수가 없다.",
      window: "창밖이 아침인지 밤인지, 해가 떴는지 전혀 알고 싶지 않다.",
      calendar: "날짜 자리에 그냥 거대한 물음표 하나가 박혀 있는 것 같다.",
      clock:
        "시계가 있는 쪽은 고개도 돌리지 않는다. 시간이 흐르는 게 끔찍하다.",
      book: "책 표지가 무겁게 굳어 닫혀 있다.",
      laptop: "하얀 화면 속에서 커서만 무심하게 계속 깜빡이고 있다.",
    },
  },
];

// 상태----------------------------------

const state = {
  chapter: 0,
  time: DAY_START,
  todayActions: [],
  messageIndex: 0,
  dayClosing: false,
};

let typingTimer = null;
let messageContinue = null;

// 기본 기능----------------------------------

function currentChapter() {
  return chapters[state.chapter];
}

function currentChapterIndex() {
  return Math.min(state.chapter, chapters.length - 1);
}

function parseTime(text) {
  if (!text || text.includes("?")) return null;
  const [hour, minute] = text.split(":").map(Number);
  return hour * 60 + minute;
}

function getTimeSlot() {
  const count = state.todayActions.length;
  const max = currentChapter().maxActions;

  if (state.dayClosing) return "evening";
  if (count <= 0) return "morning";
  if (max <= 1) return "afternoon";
  if (max === 2) return count === 1 ? "afternoon" : "evening";
  if (count === 1) return "morning";
  if (count === 2) return "afternoon";
  return "evening";
}

function getRoomImage() {
  const slot = getTimeSlot();
  if (slot === "afternoon") return "img/main_afternoon.png";
  if (slot === "evening") return "img/main_evening.png";
  return "img/main.png";
}

function getFocusImage(kind) {
  if (kind === "desk")
    return currentChapterIndex() >= 3
      ? "img/deskView_2.png"
      : "img/deskView.png";
  return getRoomImage();
}

function updateRoomObjects() {
  mainImg.src = getRoomImage();
}

function cleanText(text) {
  return text.replace(/\n{2,}/g, "\n");
}

function updateDayTone() {
  document.body.classList.remove("day-middle");
  document.body.classList.remove("day-late");

  if (currentChapterIndex() >= 5) {
    document.body.classList.add("day-late");
    return;
  }
  if (currentChapterIndex() >= 3) {
    document.body.classList.add("day-middle");
  }
}

function updateCalendar() {
  calendarDate.textContent = "2026";
  dateLabel.textContent = currentChapter().date;
}

function updateClock() {
  if (currentChapterIndex() >= 5) {
    hourHand.style.transform = "translateX(-50%) rotate(35deg)";
    minuteHand.style.transform = "translateX(-50%) rotate(205deg)";
    return;
  }
  const hour = Math.floor(state.time / 60);
  const minute = state.time % 60;
  hourHand.style.transform = `translateX(-50%) rotate(${(hour % 12) * 30 + minute * 0.5}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minute * 6}deg)`;
}

function canTakeAction() {
  return (
    !state.dayClosing && state.todayActions.length < currentChapter().maxActions
  );
}

function blockIfDayClosed() {
  if (canTakeAction()) return false;
  
  showMessage(
    currentChapterIndex() >= 5
      ? "몸이 안 움직인다... 오늘은 진짜 아무것도 못 하겠다."
      : "머리가 안 돌아간다. 오늘은 여기까지만 붙잡고 있어야겠다.",
  );
  return true;
}

function rememberAction(label) {
  state.todayActions.push(label);
}

function seedNotifications() {
  state.notifications = pressureNotifications[currentChapterIndex()];
  state.messageIndex = 0;
}

// 화면 전환----------------------------------

function showScene(targetView) {
  room.classList.add("hidden");
  deskView.classList.add("hidden");
  choiceBox.classList.add("hidden");
  document.body.classList.remove("choice-open");

  calendarLabel.classList.toggle("is-hidden", targetView !== "room");
  clockFace.classList.toggle("is-hidden", targetView !== "room");
  back.classList.toggle("hidden", targetView === "room");

  if (targetView === "room") {
    mainImg.src = getRoomImage();
    updateRoomObjects();
    room.classList.remove("hidden");
  } else if (targetView === "desk") {
    mainImg.src = getFocusImage("desk");
    deskView.classList.remove("hidden");
  }
}

function showChoicePrompt(title, items) {
  choiceBox.classList.add("hidden");
  document.body.classList.remove("choice-open");
  choices.innerHTML = "";
  typeChoiceQuestion(title, () => {
    choices.innerHTML = "";
    items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = item.label;
      button.disabled = Boolean(item.disabled);
      button.addEventListener("click", item.onClick);
      choices.appendChild(button);
    });
    choiceBox.classList.remove("hidden");
    document.body.classList.add("choice-open");
  });
}

function hideChoiceBox() {
  choiceBox.classList.add("hidden");
  document.body.classList.remove("choice-open");
  choices.innerHTML = "";
}

function returnToRoomText() {
  hideChoiceBox();
  showMessage(getRoomReturnText());
}

function hideMessageBox() {
  messageBox.classList.add("hidden");
  messageNext.classList.add("hidden");
  messageContinue = null;
  document.body.classList.remove("message-lock");
}

function clearSpriteClasses() {
  workScreen.classList.remove("sprite-scene");
  workScreen.classList.remove("sprite-5");
  workScreen.classList.remove("sprite-8");
  workScreen.classList.remove("sprite-fast");
  workScreen.classList.remove("sprite-middle");
  workScreen.classList.remove("sprite-slow");
  workScreen.classList.remove("sprite-repeat-3");
  workScreen.classList.remove("sprite-repeat-4");
}

function resetWorkWindow(options = {}) {
  hideMessageBox();
  hideChoiceBox();
  clearSpriteClasses();
  workScreen.classList.toggle("has-image", Boolean(options.image));
  workScreen.style.backgroundImage = options.image
    ? `url("${options.image}")`
    : "";
  work.classList.remove("hidden");
  workText.textContent = options.caption || "";
  return workScreen;
}

function closeWorkWindow() {
  work.classList.add("hidden");
  workScreen.classList.remove("has-image");
  clearSpriteClasses();
  workScreen.innerHTML = "";
  workScreen.style.backgroundImage = "";
}

// 타이핑----------------------------------

function typeMessage(text, done) {
  clearInterval(typingTimer);
  messageBox.classList.remove("hidden");
  messageNext.classList.add("hidden");
  messageText.textContent = "";
  const message = cleanText(text);
  const delay =
    currentChapterIndex() >= 5 ? 42 : currentChapterIndex() >= 3 ? 30 : 20;
  let i = 0;
  typingTimer = setInterval(() => {
    messageText.textContent += message[i] || "";
    i += 1;
    if (i > message.length) {
      clearInterval(typingTimer);
      if (done) done();
    }
  }, delay);
}

function typeChoiceQuestion(text, done) {
  clearInterval(typingTimer);
  messageBox.classList.remove("hidden");
  messageNext.classList.add("hidden");
  messageText.innerHTML = "";

  const parts = cleanText(text).split("\n");
  const question = parts.pop();
  const body = parts.join("\n").trim();
  const bodyText = document.createElement("span");
  const questionText = document.createElement("span");
  const delay =
    currentChapterIndex() >= 5 ? 42 : currentChapterIndex() >= 3 ? 30 : 20;

  bodyText.className = "dialog-text";
  questionText.className = "dialog-question";
  messageText.appendChild(bodyText);
  messageText.appendChild(questionText);

  const fullText = body ? `${body}\n${question}` : question;
  let i = 0;

  typingTimer = setInterval(() => {
    const currentText = fullText.slice(0, i + 1);

    if (body && currentText.length > body.length + 1) {
      bodyText.textContent = body;
      questionText.textContent = currentText.slice(body.length + 1);
    } else if (body) {
      bodyText.textContent = currentText;
      questionText.textContent = "";
    } else {
      questionText.textContent = currentText;
    }

    i += 1;
    if (i > fullText.length) {
      clearInterval(typingTimer);
      if (done) done();
    }
  }, delay);
}

function showMessage(text, done) {
  if (!done) hideChoiceBox();
  messageContinue = null;
  if (!done) document.body.classList.remove("message-lock");
  typeMessage(text, done);
}

function showResultMessage(text, done) {
  document.body.classList.add("message-lock");
  typeMessage(text, () => {
    messageContinue = done;
    messageNext.classList.remove("hidden");
  });
}
function getRoomReturnText() {
  const hasActionLeft = canTakeAction();
  const slot = getTimeSlot();

  if (!hasActionLeft && currentChapterIndex() >= 5) {
    return "더 뭘 하려고 해도\n몸이 움직이지 않는다.";
  }
  if (!hasActionLeft) {
    return "오늘은 여기까지인 것 같다.";
  }
  if (slot === "morning") {
    return "아직 방 안은 밝다.\n다음 할 일을 고를 수 있을 것 같다.";
  }
  if (slot === "afternoon") {
    return "햇빛이 조금 기울었다.\n아직 한 가지 정도는 더 할 수 있을 것 같다.";
  }
  if (currentChapterIndex() >= 5) {
    return "방 안에 모니터 불빛만 남았다.\n무언가를 더 붙잡을 수는 있을 것 같다.";
  }
  return "밖이 어두워지기 시작했다.\n그래도 아직 완전히 끝난 건 아니다.";
}

function showRoomReturnText(done) {
  messageNext.classList.add("hidden");
  typeMessage(getRoomReturnText(), () => {
    document.body.classList.remove("message-lock");
    if (done) done();
  });
}

function showActionNotification(done) {
  const message = state.notifications[state.messageIndex];
  if (!message) {
    done();
    return;
  }

  state.messageIndex += 1;
  noticeToast.textContent = message;
  noticeToast.classList.add("is-visible");
  setTimeout(
    () => noticeToast.classList.remove("is-visible"),
    currentChapterIndex() >= 4 ? 2200 : 1700,
  );
  done();
}

function runPauseSequence(sequence, next) {
  setTimeout(() => {
    next();
  }, sequence.pause);
}

function runDeleteSequence(target, sequence, next) {
  let count = 0;
  const timer = setInterval(() => {
    target.textContent = target.textContent.slice(0, -1);
    count += 1;
    if (count < sequence.delete) return;
    clearInterval(timer);
    next();
  }, sequence.speed || 45);
}

function runTextSequence(target, sequence, next) {
  let index = 0;
  const timer = setInterval(() => {
    target.textContent += sequence.text[index] || "";
    index += 1;
    if (index <= sequence.text.length) return;
    clearInterval(timer);
    next();
  }, sequence.speed || 35);
}

function runTypingSequences(target, sequences, done, index = 0) {
  const sequence = sequences[index];
  const next = () => runTypingSequences(target, sequences, done, index + 1);

  if (!sequence) {
    done();
    return;
  }
  if (sequence.pause) {
    runPauseSequence(sequence, next);
    return;
  }
  if (sequence.delete) {
    runDeleteSequence(target, sequence, next);
    return;
  }
  runTextSequence(target, sequence, next);
}

function getSpriteSpeed() {
  if (currentChapterIndex() >= 5) return "sprite-slow";
  if (currentChapterIndex() >= 3) return "sprite-middle";
  return "sprite-fast";
}

function playSpriteScene(imagePath, speedClass, repeatCount, frameCount, done) {
  const caption = imagePath.includes("walking")
    ? "잠깐 바깥 공기 마시는 중..."
    : "공부하는 중...";
  resetWorkWindow({ caption });
  workScreen.classList.add("sprite-scene");
  workScreen.classList.add(`sprite-${frameCount}`);
  workScreen.classList.add(speedClass);
  workScreen.classList.add(`sprite-repeat-${repeatCount}`);
  workScreen.style.backgroundImage = `url("${imagePath}")`;

  const finishSprite = () => {
    workScreen.removeEventListener("animationend", finishSprite);
    setTimeout(done, 350);
  };

  workScreen.addEventListener("animationend", finishSprite);
}

function coverLetterSequence() {
  const stage = currentChapterIndex();
  if (stage === 0) {
    return [
      { text: "지원 동기\n\n", speed: 32 },
      { text: "대학교에서 프로젝트를 진행하며\n", speed: 34 },
      { text: "사용자의 불편을 해결하는 과정에\n", speed: 34 },
      { text: "큰 흥미를 느끼게 되었습니다.\n\n", speed: 36 },
      { text: "귀사에서도 사용자 중심의 서비스를 만드는 데\n", speed: 36 },
      { text: "기여하고 싶습니다.", speed: 38 },
    ];
  }
  if (stage === 1) {
    return [
      { text: "지원 동기\n\n", speed: 42 },
      { text: "다양한 사람들과 협업하며\n", speed: 44 },
      { text: "문제를 분석하고 해결하는 경험은\n", speed: 46 },
      { text: "저에게 큰 성취감을 주었습니다.\n\n", speed: 48 },
      {
        text: "이 경험을 바탕으로 service 개선에 기여하고 싶습니다.",
        speed: 50,
      },
    ];
  }
  if (stage === 2) {
    return [
      { text: "저는 프로젝트에서 사용자의 의견을 듣고", speed: 54 },
      { pause: 900 },
      { delete: 6, speed: 62 },
      { text: "\n문제의 원인을 정리하는 역할을 맡았습니다.\n", speed: 64 },
      { pause: 1300 },
      { text: "부족한 부분은 빠르게 배우고\n", speed: 72 },
      { text: "팀의 목표에 맞춰 끝까지 책임지겠습니다.", speed: 76 },
    ];
  }
  if (stage === 3) {
    return [
      { text: "입사 후에는 맡은 업무를 정확히 이해하고", speed: 88 },
      { pause: 900 },
      { text: "\n사용자가 겪는 불편을 줄이는 방향으로", speed: 94 },
      { pause: 1200 },
      { text: "\n꾸준히 개선점을 찾겠습니다.", speed: 104 },
    ];
  }
  if (stage === 4) {
    return [
      { text: "저의 강점은 문제를 끝까지 붙잡는 태도입니다.", speed: 120 },
      { pause: 900 },
      { text: "\n작은 오류도 그냥 넘기지 않고", speed: 140 },
      { pause: 1500 },
      { text: "\n다시 확인하는 습관을 가지고 있습니다.", speed: 150 },
    ];
  }
  if (stage === 5) {
    return [
      { pause: 1800 },
      { text: "저는", speed: 240 },
      { pause: 1800 },
      { text: " 사용자", speed: 280 },
      { pause: 2200 },
      { text: "에게", speed: 300 },
      { pause: 2600 },
      { delete: 2, speed: 160 },
      { text: "필요한 서비스를.. \n ", speed: 160 },
    ];
  }
  return [
    { pause: 2600 },
    { text: "저는 사용자", speed: 420 },
    { pause: 2600 },
    { delete: 4, speed: 220 },
    { pause: 3200 },
    { text: "", speed: 600 },
    { pause: 3600 },
  ];
}

// 행동----------------------------------

function openDesk() {
  showScene("desk");
  showMessage(currentChapter().texts.desk);
}

function openBookcasePrompt() {
  if (blockIfDayClosed()) return;
  
  confirmAction(
    `${currentChapter().texts.book}\n\n전공 서적이나 자격증 교재를 좀 볼까?`,
    "공부한다",
    startBookcaseStudy,
  );
}

function openWritingPrompt() {
  if (blockIfDayClosed()) return;
  writeCoverLetter();
}

function confirmAction(question, yesLabel, onYes) {
  showChoicePrompt(question, [
    { label: yesLabel, onClick: onYes },
    { label: "돌아간다", onClick: returnToRoomText },
  ]);
}

function writeCoverLetter() {
  
  confirmAction(
    `${currentChapter().texts.laptop}\n\n자소서랑 포트폴리오를 준비해볼까?`,
    "자소서를 쓴다",
    showCoverLetterWork,
  );
}

function showCoverLetterWork() {
  if (blockIfDayClosed()) return;
  hideChoiceBox();
  rememberAction(currentChapter().held);

  const workScreen = resetWorkWindow({
    image: "img/writing.png",
    caption:
      currentChapterIndex() >= 3
        ? "지원 동기를 다시 쓰는 중..."
        : "자기소개서를 고치는 중...",
  });
  workScreen.innerHTML = `
    <pre class="typing-text"></pre>
  `;
  const typingDoc = workScreen.querySelector(".typing-text");
  const sequences = coverLetterSequence();

  runTypingSequences(typingDoc, sequences, () => {
    setTimeout(() => {
      closeWorkWindow();
      if (state.chapter === chapters.length - 1) {
        showEnding();
        return;
      }
      completeAction("cover");
    }, 900);
  });
}

function completeAction(kind, fallbackText) {
  advanceChapterTime();
  showScene("room");
  document.body.classList.add("message-lock");
  showActionNotification(() => {
    showResultMessage(
      fallbackText || currentChapter().actionAfter[kind],
      () => {
        if (state.todayActions.length >= currentChapter().maxActions) {
          showRoomReturnText(() => setTimeout(closeDay, 1200));
          return;
        }
        showRoomReturnText();
      },
    );
  });
}

function startBookcaseStudy() {
  if (blockIfDayClosed()) return;
  hideChoiceBox();
  rememberAction("책장에서 자료 보기");
  playSpriteScene("img/bookScene.png", getSpriteSpeed(), 3, 8, () => {
    closeWorkWindow();
    completeAction(null, currentChapter().actionAfter.book);
  });
}

function startRestAction() {
  if (blockIfDayClosed()) return;
  if (currentChapterIndex() >= 5) {
    showMessage(currentChapter().texts.bed);
    return;
  }
  
  showChoicePrompt(
    `${currentChapter().texts.bed}\n\n좀 지치는데, 쉴까..?`,
    [
      { label: "잠깐 눕는다", onClick: startShortRest },
      { label: "그냥 잔다", onClick: startSleepAction },
      { label: "참아본다", onClick: returnToRoomText },
    ],
  );
}

function startShortRest() {
  hideChoiceBox();
  rememberAction("잠깐 쉬기");
  completeAction(
    null,
    "잠깐 누워 있었다.\n눈을 감았다 뜨니 시간이 허무하게 지나 있었다.",
  );
}

function startSleepAction() {
  hideChoiceBox();
  rememberAction("잠든다");
  state.dayClosing = true;
  setChapterTimeToEnd();
  playSleepScene();
}

function startWalkAction() {
  if (blockIfDayClosed()) return;
  if (currentChapterIndex() >= 5) {
    showMessage(currentChapter().texts.door);
    return;
  }
  
  confirmAction(
    `${currentChapter().texts.door}\n\n답답한데 동네 한 바퀴만 걷고 올까?`,
    "밖으로 나간다",
    () => {
      hideChoiceBox();
      rememberAction("산책");
      playSpriteScene("img/walking.png", getSpriteSpeed(), 4, 5, () => {
        closeWorkWindow();
        completeAction(null, currentChapter().actionAfter.walk);
      });
    },
  );
}

// 하루 정산----------------------------------

function setChapterTimeToEnd() {
  const end = parseTime(currentChapter().end);
  if (end !== null) state.time = end;
  updateClock();
  updateRoomObjects();
}

function advanceChapterTime() {
  const start = parseTime(currentChapter().start);
  const end = parseTime(currentChapter().end);
  if (start === null || end === null) {
    updateClock();
    updateRoomObjects();
    return;
  }

  const max = Math.max(1, currentChapter().maxActions);
  const progress = Math.min(state.todayActions.length, max) / max;
  state.time = Math.round(start + (end - start) * progress);
  updateClock();
  updateRoomObjects();
}

function closeDay() {
  state.dayClosing = true;
  setChapterTimeToEnd();
  showScene("room");
  document.body.classList.add("message-lock");
  typeMessage(dayEndLines[currentChapterIndex()], () => {
    setTimeout(() => {
      blackout.classList.remove("hidden");
      requestAnimationFrame(() => blackout.classList.add("is-visible"));
    }, 900);
    setTimeout(() => {
      renderReport();
      blackout.classList.remove("is-visible");
      setTimeout(() => blackout.classList.add("hidden"), 900);
    }, 2400);
  });
}

function playSleepScene() {
  document.body.classList.add("message-lock");
  hideMessageBox();
  showScene("room");
  blackout.classList.remove("hidden");
  sleepText.classList.remove("hidden");
  requestAnimationFrame(() => blackout.classList.add("is-visible"));
  setTimeout(() => {
    sleepText.classList.add("hidden");
    renderReport();
    blackout.classList.remove("is-visible");
    setTimeout(() => blackout.classList.add("hidden"), 900);
  }, 2700);
}

function reportActionText() {
  const actions = state.todayActions.filter((action) => action !== "잠든다");
  const lastAction = actions[actions.length - 1] || "";

  if (
    lastAction.includes("자기소개서") ||
    lastAction === currentChapter().held
  ) {
    return "하루 종일 문장만 고쳤다.\n생각보다 시간이 너무 훌쩍 가버렸다.";
  }
  if (lastAction.includes("책장") || lastAction.includes("자료")) {
    return "전공 서적과 시험 이론들을 정독했다.\n분명 아는 내용인데도 자꾸 글자가 눈에서 튕겨 나갔다.";
  }
  if (lastAction.includes("산책")) {
    return "잠깐 바깥 공기를 쐬었다.\n아주 잠시 머리가 식는 기분이 들었다.";
  }
  if (lastAction.includes("쉬기")) {
    return "너무 답답해서 침대에 누워 있었다.\n시간이 허무하게 지나갔다.";
  }
  return "오늘 하루도 어영부영 지나갔다.\n시간은 멈추지 않고 빠르게 지난다.";
}

function reportStandardText() {
  return reportStandards[currentChapterIndex()];
}

function reportFeelingText() {
  if (currentChapterIndex() <= 1) {
    return "조금 부족하긴 해도\n차근차근 다 채워 넣을 수 있을 것 같았다.";
  }
  if (currentChapterIndex() <= 4) {
    return "요구 사항은 계속 늘어만 가는데\n내 스펙은 제자리에서 멈춰 있는 기분이다.";
  }
  return "기업들의 기준은 또 높아졌다.\n하나를 억지로 메우면 다른 구멍이 뚫렸다.";
}

function renderReport() {
  showScene("room");
  mainImg.src = "img/main_evening.png";
  hideMessageBox();
  nextButton.textContent = "▼";
  report.querySelector(".report-title").textContent =
    reportDates[currentChapterIndex()];
  reportBody.innerHTML = `
    <p class="report-text">${reportActionText().replaceAll("\n", "<br>")}</p>
    <p class="report-text report-standard">${reportStandardText().replaceAll("\n", "<br>")}</p>
    <p class="report-text">${reportFeelingText().replaceAll("\n", "<br>")}</p>
  `;
  report.classList.remove("hidden");
}

// day----------------------------------

function showChapterOverlay() {
  chapterDay.textContent = currentChapter().dayLabel;
  chapterDate.textContent = currentChapter().label;
  chapterScreen.classList.remove("hidden");
}

function startChapter() {
  chapterScreen.classList.add("hidden");
  state.time = parseTime(currentChapter().start) || DAY_START;
  state.todayActions = [];
  state.dayClosing = false;
  document.body.classList.remove("message-lock");
  document.body.classList.remove("choice-open");
  blackout.classList.add("hidden");
  blackout.classList.remove("is-visible");
  seedNotifications();
  updateDayTone();
  updateCalendar();
  updateClock();
  showScene("room");
  showMessage(currentChapter().opening);
}

function goToNextChapter() {
  report.classList.add("hidden");
  if (state.chapter >= chapters.length - 1) {
    showEnding();
    return;
  }
  state.chapter += 1;
  showChapterOverlay();
}

// 엔딩----------------------------------

function endingSequence() {
  return [
    {
      hold: 1900,
      parts: [{ text: "아무것도 달라진 게 없었다." }],
    },
    {
      hold: 2150,
      parts: [
        {
          text: "계절은 창밖에서 몇 번이나 뒤바뀌었고,\n달력의 숫자는 무정하게 계속 넘어갔다.",
        },
      ],
    },
    {
      hold: 2500,
      parts: [
        { text: "그런데 나는 아직도\n이 좁은 방, 같은 자리에 앉아 있다." },
      ],
    },
    {
      hold: 2850,
      parts: [
        { text: "사회가 내미는 합격의 기준선은\n갈수록 저 멀리 높아져만 가는데.\n\n" },
        { text: "어학 성적, 직무 포트폴리오, 실무 경험", accent: true },
      ],
    },
    {
      hold: 2750,
      parts: [
        {
          text: "겨우 하나를 쫓아 채우고 나면\n또 다른 결격 사유가 나를 밀어낸다.",
        },
      ],
    },
    {
      hold: 3300,
      parts: [{ text: "그만 멈추고 싶었다.", accent: true }],
    },
    {
      hold: 3200,
      parts: [
        { text: "하지만 눈을 감는 순간에도\n" },
        { text: "나만 뒤처지고 있다는 불안감", accent: true },
        { text: "은 나를 가만히 놔두지 않았다." },
      ],
    },
    {
      hold: 4550,
      parts: [
        {
          text: "모니터 속 커서만 홀로 깜빡인다.\n나의 문장은 더 이상 이어지지 못했다.",
        },
      ],
    },
  ];
}

function typeEndingParagraph(paragraphs, paragraphIndex = 0) {
  const paragraph = paragraphs[paragraphIndex];

  if (!paragraph) {
    endingText.classList.remove("is-visible");
    setTimeout(() => {
      ending.classList.add("is-done");
      setTimeout(showEndingTitle, 3100);
    }, 760);
    return;
  }

  endingText.classList.remove("is-visible");
  endingText.classList.remove("is-title");
  endingText.textContent = "";

  setTimeout(() => {
    endingText.classList.add("is-visible");
    typeEndingPart(paragraphs, paragraphIndex, 0, paragraph.hold);
  }, 430);
}

function typeEndingPart(paragraphs, paragraphIndex, partIndex, holdTime) {
  const paragraph = paragraphs[paragraphIndex];
  const part = paragraph.parts[partIndex];

  if (!part) {
    setTimeout(() => {
      endingText.classList.remove("is-visible");
      setTimeout(() => typeEndingParagraph(paragraphs, paragraphIndex + 1), 740);
    }, holdTime);
    return;
  }

  const span = document.createElement("span");
  if (part.accent) span.className = "ending-accent";
  endingText.appendChild(span);

  let i = 0;
  const speed = part.accent ? 42 : 34;
  const timer = setInterval(() => {
    span.textContent += part.text[i] || "";
    i += 1;

    if (i <= part.text.length) return;
    clearInterval(timer);
    typeEndingPart(paragraphs, paragraphIndex, partIndex + 1, holdTime);
  }, speed);
}

function showEndingTitle() {
  endingText.innerHTML =
    "<span class=\"ending-title-main\">쉼표</span><span class=\"ending-title-sub\">拘束</span>";
  endingText.classList.add("is-title");
  setTimeout(() => endingText.classList.add("is-visible"), 100);
  setTimeout(() => {
    endingRestart.classList.remove("hidden");
    requestAnimationFrame(() => endingRestart.classList.add("is-visible"));
  }, 2600);
}

function showEnding() {
  showScene("room");
  mainImg.src = "img/main_evening.png";
  hideMessageBox();
  hideChoiceBox();
  report.classList.add("hidden");
  ending.classList.remove("is-done");
  endingText.classList.remove("is-title");
  endingText.classList.remove("is-visible");
  endingRestart.classList.add("hidden");
  endingRestart.classList.remove("is-visible");
  endingText.textContent = "";
  ending.classList.remove("hidden");
  typeEndingParagraph(endingSequence());
}

function clickMessageNext() {
  if (!messageContinue) return;
  const next = messageContinue;
  messageContinue = null;
  next();
}

// 이벤트----------------------------------

desk.addEventListener("click", openDesk);
bookcase.addEventListener("click", openBookcasePrompt);
bed.addEventListener("click", startRestAction);
door.addEventListener("click", startWalkAction);
back.addEventListener("click", () => showScene("room"));
chapterScreen.addEventListener("click", startChapter);
messageNext.addEventListener("click", clickMessageNext);
endingRestart.addEventListener("click", () => {
  window.location.reload();
});

roomWindow.addEventListener("click", () =>
  showMessage(currentChapter().texts.window),
);
clock.addEventListener("click", () =>
  showMessage(currentChapter().texts.clock),
);
calendar.addEventListener("click", () =>
  showMessage(currentChapter().texts.calendar),
);

laptop.addEventListener("click", openWritingPrompt);



nextButton.addEventListener("click", goToNextChapter);


updateCalendar();
updateClock();
updateDayTone();
showScene("room");
showChapterOverlay();
