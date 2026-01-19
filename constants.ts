import { UserProfile, ClassSession, CampusEvent, TodoItem, LocketItem } from './types';

export const FTU_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Logo_Truong_Dai_hoc_Ngoai_thuong.png/600px-Logo_Truong_Dai_hoc_Ngoai_thuong.png";

export const INITIAL_USER: UserProfile = {
  id: 'u123',
  name: 'Nguyen Van A',
  studentId: '2011110000',
  major: 'International Business Economics',
  cohort: 'K60',
  avatarUrl: 'https://picsum.photos/150/150'
};

export const INITIAL_CLASSES: ClassSession[] = [
  {
    id: 'c1',
    courseCode: 'DES101',
    name: 'Tư Duy Thiết Kế',
    location: 'CS2.A502',
    startTime: '06:45',
    endTime: '09:00',
    day: 'Today',
    type: 'Lecture',
    points: 20
  },
  {
    id: 'c2',
    courseCode: 'IBE201',
    name: 'Giao dịch TMQT',
    location: 'CS2.A206',
    startTime: '09:15',
    endTime: '11:30',
    day: 'Today',
    type: 'Lecture',
    points: 15
  },
  {
    id: 'c3',
    courseCode: 'IBE301',
    name: 'Chính sách TMQT',
    location: 'CS2.A305',
    startTime: '12:30',
    endTime: '14:45',
    day: 'Today',
    type: 'Lecture',
    points: 15
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'e1',
    title: 'Green Campus Cleanup',
    description: 'Dọn rác + phân loại, check-in realtime để nhận thưởng.',
    organizer: 'Sân trước tòa A • CLB Môi trường FTU',
    time: '10:00 – 11:30',
    date: 'Today',
    points: 80,
    isGreen: true,
    joined: false,
    imageUrl: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 'e2',
    title: 'Workshop: Refill & Zero Plastic',
    description: 'Hướng dẫn thói quen xanh + cam kết không nhựa 7 ngày.',
    organizer: 'Hội trường B • Đoàn Thanh Niên',
    time: '15:00 – 17:00',
    date: 'Today',
    points: 120,
    isGreen: true,
    joined: false,
    imageUrl: 'https://picsum.photos/400/200?random=2'
  }
];

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: 't1',
    courseCode: 'DES101',
    text: 'Nghe giảng của thầy Kelvin đẹp trai, dấu iu',
    isCompleted: false,
    isGreenTask: false
  },
  {
    id: 't2',
    courseCode: 'IBE201',
    text: 'Đọc chương 4: Incoterms 2020',
    isCompleted: false,
    isGreenTask: false
  },
  {
    id: 't3',
    courseCode: 'DES101',
    text: 'Không sử dụng ống hút nhựa',
    isCompleted: false,
    isGreenTask: true
  }
];

export const INITIAL_LOCKET_ITEMS: LocketItem[] = [
  { id: 'l1', user: 'Minh', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80', type: 'self', timestamp: Date.now() - 3600000 },
  { id: 'l2', user: 'Lan', img: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=400&q=80', type: 'friend', timestamp: Date.now() - 7200000 },
  { id: 'l3', user: 'Hùng', img: 'https://images.unsplash.com/photo-1605600659908-482e864c4d9e?w=400&q=80', type: 'friend', timestamp: Date.now() - 10800000 },
  { id: 'l4', user: 'You', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=80', type: 'self', timestamp: Date.now() - 86400000 },
];

export const GREEN_NUDGES = {
  'Lecture': "Tắt đèn và quạt khi rời khỏi phòng học nhé!",
  'Lab': "Nhớ tắt máy tính đúng cách để tiết kiệm điện.",
  'Seminar': "Sử dụng tài liệu số thay vì in giấy để bảo vệ rừng!",
  'General': "Lấy thêm nước tại trạm tầng 2 thay vì mua chai nhựa."
};