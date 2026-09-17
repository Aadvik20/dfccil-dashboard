export interface EmployeeInfo {
  employeeMasterAutoId: number;
  employeeCode: string;
  gender: string;
  userName: string;
  post: string;
  genericDesignation: string;
  positionGrade: string;
  deptDfccil: string;
  location: string;
  mobile: string;
  emailAddress: string;
  designation: string;
  photo: string;
  personalMobile: string;
  personalEmailAddress: string;
  reportingOfficer: string;
}

export interface RoleAssigned {
  pkUserRoles: number;
  roleAssigned: string;
  empCode: string;
  unitsAssigned: string | null;
}

export interface ProfileResponse {
  employeeInfo: EmployeeInfo;
  roleAssigned: RoleAssigned[];
}