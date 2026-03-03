export interface ResumeData {
  resume_text: string;
  skills: string[];
  experience: number;
}

export interface ATSLineFeedback {
  line: string;
  issues: string[];
  improved_example: string;
}

export interface ATSResult {
  ats_score: number;
  suggestions: string[];
  line_feedback: ATSLineFeedback[];
}

export interface Job {
  title: string;
  job_type: "INTERNSHIP" | "FRESHER";
  experience_level: string;
  skills: string[];
  final_score: number;
  linkedin_link: string;
  naukri_link: string;
}

export interface CareerStep {
  current_role: string;
  next_role: string;
  missing_skills: string[];
  learning_resources: Record<string, any>;
}

export interface CareerPathData {
  primary: CareerStep;
  alternate: CareerStep;
}
