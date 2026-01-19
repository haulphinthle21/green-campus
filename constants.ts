import { UserProfile, ClassSession, CampusEvent, TodoItem, LocketItem } from './types';

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
    location: 'B201',
    startTime: '07:00',
    endTime: '09:00',
    day: 'Today',
    type: 'Lecture',
    points: 18
  },
  {
    id: 'c2',
    courseCode: 'MKT201',
    name: 'Marketing Quốc Tế',
    location: 'B201',
    startTime: '09:10',
    endTime: '11:00',
    day: 'Today',
    type: 'Seminar',
    points: 14
  },
  {
    id: 'c3',
    courseCode: 'ENG301',
    name: 'Business English',
    location: 'D202',
    startTime: '13:00',
    endTime: '15:25',
    day: 'Tomorrow',
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
    text: 'Note bài',
    isCompleted: false,
    isGreenTask: false
  },
  {
    id: 't2',
    courseCode: 'DES101',
    text: 'Làm bài tập empathy',
    isCompleted: false,
    isGreenTask: false
  },
  {
    id: 't3',
    courseCode: 'DES101',
    text: 'Không mua đồ nhựa sau break',
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