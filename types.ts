
export enum Tab {
  SCHEDULE = 'Schedule',
  TODO = 'Actions',
  IMPACT = 'Impact',
  PROFILE = 'Profile'
}

export interface UserProfile {
  id: string;
  name: string;
  studentId: string;
  major: string;
  cohort: string;
  avatarUrl: string;
}

export interface ClassSession {
  id: string;
  courseCode: string; // Used to link todos
  name: string;
  location: string;
  startTime: string; // HH:mm format for simplicity in this demo
  endTime: string;
  day: string; // 'Today', 'Tomorrow'
  type: 'Lecture' | 'Lab' | 'Seminar';
  points?: number; // Added for gamification display
}

export interface TodoItem {
  id: string;
  courseCode: string; // 'GLOBAL' for general tasks, or specific course code
  text: string;
  isCompleted: boolean;
  isGreenTask: boolean; // Special styling for eco-tasks
  dueDate?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  organizer: string; // e.g., "FTU Green Club"
  time: string;
  date: string;
  points: number;
  isGreen: boolean;
  joined: boolean;
  imageUrl?: string;
}

export interface CheckIn {
  id: string;
  timestamp: number;
  photoUrl: string; // Data URL
  co2Saved: number; // kg
  pointsEarned: number;
}

export interface LocketItem {
  id: string;
  user: string;
  img: string;
  type: 'self' | 'friend';
  timestamp: number;
  caption?: string;
}

export interface ApprovalItem {
  id: string;
  img: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

export interface AppState {
  user: UserProfile;
  stats: {
    points: number;
    streak: number;
    co2Saved: number;
  };
  selectedClassId: string | null;
  history: CheckIn[];
  todos: TodoItem[];
  events: CampusEvent[];
  locketItems: LocketItem[];
  approvalQueue: ApprovalItem[];
}