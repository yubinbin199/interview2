export enum InterviewType {
  VIDEO = 'video',
  IN_PERSON = 'inperson'
}

export type Region = 'Shanghai' | 'Taipei' | 'Japan';

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  weekday: string;
  available: boolean;
}

export interface Interviewer {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  region: Region;
  position: string;
}

export interface InterviewInvitation {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  interviewType: InterviewType;
  timeSlot: TimeSlot | null;
  status: 'draft' | 'sent' | 'scheduled' | 'completed' | 'cancelled';
  interviewers: Interviewer[];
} 