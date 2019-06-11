export interface IBatch {
  count:number;
  isChecked:boolean;
  identifier: string;
  createdFor: string[];
  courseAdditionalInfo: CourseAdditionalInfo;
  endDate: string;
  countIncrementDate: string;
  description: string;
  countDecrementDate: string;
  updatedDate: string;
  countIncrementStatus: boolean;
  createdDate: string;
  createdBy: string;
  courseCreator: string;
  hashTagId: string;
  mentors: string[];
  countDecrementStatus: boolean;
  name: string;
  id: string;
  enrollmentType: string;
  courseId: string;
  startDate: string;
  status: number;
  participant: any;
}
export interface CourseAdditionalInfo {
  courseName: string;
  leafNodesCount: string;
  description: string;
  courseLogoUrl: string;
  tocUrl: string;
  status: string;
}
