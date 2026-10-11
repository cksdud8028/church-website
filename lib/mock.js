export const siteInfo = {
  name: "산울킹",
  verse: "여호와는 나의 목자시니 내가 부족함이 없으리로다 — 시편 23:1",
  intro:
    "푸른 초장 같은 쉼과 사랑이 있는 공동체입니다. 예배와 교제, 나들이와 수련회를 통해 함께 자라가는 청년들의 이야기를 이곳에 나눕니다.",
  worship: [
    { name: "청년부 예배", time: "주일 오후 2:00", place: "본당 2층" },
    { name: "주일 대예배", time: "주일 오전 11:00", place: "본당" },
    { name: "금요 기도회", time: "금요일 저녁 8:00", place: "소예배실" },
  ],
};

export const users = [
  { email: "member@test.com", password: "1234", name: "김청년", role: "MEMBER" },
  { email: "admin@test.com", password: "1234", name: "박관리", role: "ADMIN" },
];

export const members = [
  { name: "서연", birth: "10-14" },
  { name: "민준", birth: "10-30" },
  { name: "하은", birth: "11-05" },
  { name: "지호", birth: "03-02" },
];

export const notices = [
  { id: 1, public: true, pinned: true, date: "2026-10-08", title: "10월 청년부 가을 나들이 안내",
    body: "10월 18일(주일) 청년부 가을 나들이를 남한산성으로 갑니다.\n오전 9시 교회 앞 집합, 오후 5시경 귀가 예정입니다.\n도시락과 물, 편한 신발을 준비해 주세요. 참가 신청은 이번 주 금요일까지 부서 단톡방에 남겨 주세요." },
  { id: 2, public: false, pinned: false, date: "2026-10-05", title: "신입 청년 환영회를 엽니다",
    body: "새로 오신 청년들을 환영하는 자리를 10월 25일(주일) 예배 후 교육관에서 갖습니다.\n함께 식사하고 서로 인사 나누는 시간이니 기존 청년들도 많이 참석해 주세요." },
  { id: 3, public: false, pinned: false, date: "2026-09-29", title: "겨울 수련회 조사 설문 부탁드려요",
    body: "12월 26~28일 겨울 수련회를 준비하고 있습니다.\n일정과 장소 선정을 위해 설문을 진행하니 이번 달 말까지 꼭 참여해 주세요." },
  { id: 4, public: false, pinned: false, date: "2026-09-21", title: "찬양팀 새 멤버를 모집합니다",
    body: "주일 예배 찬양을 함께 섬길 새 멤버를 모집합니다.\n보컬, 건반, 기타, 드럼 모두 환영하며 초보자도 괜찮습니다. 관심 있는 분은 찬양팀장에게 연락해 주세요." },
];

export const events = [
  { id: 1, title: "청년부 가을 나들이", date: "2026-10-18", end: "2026-10-18", place: "남한산성", category: "나들이", desc: "도시락과 함께하는 가을 산책. 오전 9시 교회 앞 집합.", yes: 12 },
  { id: 2, title: "신입 환영회", date: "2026-10-25", end: "2026-10-25", place: "교육관", category: "모임", desc: "새로 온 친구들과 함께하는 저녁 식사.", yes: 8 },
  { id: 3, title: "중보기도 모임", date: "2026-10-11", end: "2026-10-11", place: "소예배실", category: "모임", desc: "예배 후 함께 기도합니다.", yes: 5 },
  { id: 4, title: "겨울 수련회", date: "2026-12-26", end: "2026-12-28", place: "가평 수양관", category: "수련회", desc: "2박 3일 겨울 수련회. 말씀과 찬양, 교제의 시간.", yes: 15 },
  { id: 5, title: "성탄 찬양의 밤", date: "2026-12-24", end: "2026-12-24", place: "본당", category: "행사", desc: "청년부가 준비한 성탄 찬양.", yes: 10 },
  { id: 6, title: "추수감사 나눔", date: "2026-11-15", end: "2026-11-15", place: "교육관", category: "행사", desc: "감사 제목을 나누는 시간.", yes: 9 },
];

export const categoryColor = {
  나들이: "#43a047",
  수련회: "#0288d1",
  모임: "#8d6e63",
  행사: "#f9a825",
};

const palette = [
  ["#a5d6a7", "#66bb6a"], ["#81d4fa", "#4fc3f7"], ["#c5e1a5", "#9ccc65"],
  ["#b2dfdb", "#4db6ac"], ["#dcedc8", "#aed581"], ["#b3e5fc", "#81d4fa"],
];
const items = [
  ["가을 나들이", "가을 나들이"], ["찬양의 밤", "예배·찬양"], ["수련회 단체사진", "수련회"], ["환영회", "모임"],
  ["중보기도", "모임"], ["청년부 예배", "예배·찬양"], ["소풍 도시락", "가을 나들이"], ["성탄 준비", "모임"],
  ["야외 예배", "예배·찬양"], ["친교 시간", "수련회"], ["봉사 활동", "가을 나들이"], ["새벽 산책", "가을 나들이"],
];
export const photos = items.map(([caption, album], i) => ({
  id: i + 1,
  caption,
  album,
  likes: (i * 3) % 7 + 1,
  uploader: ["민준", "서연", "지호", "하은"][i % 4],
  date: `2026-0${(i % 9) + 1}-1${i % 9}`,
  colors: palette[i % palette.length],
}));
