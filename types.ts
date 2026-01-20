
export interface CoursePlan {
  id: string;
  time: string;
  endTime: string;
  title: string;
  status: 'pending' | 'ongoing' | 'completed';
  subject: string;
  grade: string;
  type: string;
  mode: string;
  location: string;
  classroom: string;
  teacherCount: number;
  studentCount: number;
  materialCount: number;
  homeworkCount: number;
  videoCount: number;
  commentCount: number;
}

export type MaterialCategory = 'PPT' | 'Word' | 'TestPaper' | 'Homework' | 'Video' | 'Audio' | 'Image' | 'Other';

export interface MaterialItem {
  id: string;
  title: string;
  date: string;
  size?: string;
  type: MaterialCategory;
  thumbnail?: string;
  duration?: string;
  source?: string;
}

export interface TeachingFolder {
  id: string;
  name: string;
  count: number;
  type: 'discipline' | 'course' | 'lesson';
}
