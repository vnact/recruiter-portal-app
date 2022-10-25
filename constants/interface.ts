export interface baseEntity {
  createdAt: string
  updatedAt: string
}
export interface IEducation {
  id: number
  school: string
  isCompleted?: boolean
  degree?: string
  grade?: string
  description?: string
  startTime: string
  endTime?: string
  filedOfStudy: string
}
export interface IEducationResponse extends baseEntity {}
export interface IUser {}
