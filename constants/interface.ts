export declare enum ExpLevel {
  NoExp = 'no_exp',
  LessThanOne = 'less_than_one',
  OnePlus = 'one_plus',
  TwoPlus = 'two_plus',
  ThreePlus = 'three_plus',
  FourPlus = 'four_plus',
  FivePlus = 'five_plus',
}
export declare enum EmploymentType {
  FullTime = 'full_time',
  PartTime = 'part_time',
  SelfEmployed = 'self_employed',
  Freelance = 'freelance',
  Constract = 'constract',
  Internship = 'internship',
  Apprenticeship = 'apprenticeship',
  Seasonal = 'seasonal',
}
export declare enum CompanySize {
  OnePlus = 'one_plus',
  NinePlus = 'nine_plus',
  TwentyFivePlus = 'twenty_five_plus',
  OneHundredPlus = 'one_hundred_plus',
  FiveHundredPlus = 'five_hundred_plus',
  OneThoudsandPlus = 'one_thousand_plus',
  TenThoudsandPlus = 'ten_thousand_plus',
}
export interface baseEntity {
  createdAt: string
  updatedAt: string
}

export interface IEducation {
  id?: number
  school: string
  isCompleted?: boolean
  degree?: string
  grade?: string
  description?: string
  startTime: string
  endTime?: string | null
  fieldOfStudy: string
}
export interface IEducationResponse extends baseEntity {}
export interface IUser {
  id: number
  email: string
  name: string
  role: string
  gender?: string
  birthday?: string
  height?: number
  wieght?: number
  level?: ExpLevel
  highSchool?: string
  familyRegisterNumber?: string
  identityCardNumber?: string
  hobby?: string
  character?: string
  placeOfOrigin?: string
  description?: string
  educations: IEducation[]
  skills: IUserSkill[]
}
export interface ICompany {
  name: string

  phone: string

  email: string

  taxNumber: string

  website?: string

  size?: CompanySize

  description?: string

  address?: string

  gpsLat: number

  gpsLng: number

  provinceId: number

  industry?: IIndustry

  jobs: IJob[]
}
export interface IJob {}
export interface ICareer {
  id: number
  name: string
  parent?: ICareer
  industry: IIndustry
}
export interface IIndustry {
  id: number
  name: string
}
export interface IUserSkill {
  certificate?: string
  skill: ISkill
}
export interface ISkill {
  id: number
  name: string
  description?: string
}
export interface IExperience {
  id: number
  company?: ICompany
  career?: ICareer
  employmentType: EmploymentType
  startDate: string
  endDate?: string
  description?: string
  companyName?: string
}
