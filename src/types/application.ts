export type ApplicationStatus =
  | "Operational"
  | "Warning"
  | "Maintenance";

export type RecordStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export interface ApplicationStats {
  totalUsers: number;
  totalRequests: number;

  total: number;

  approved: number;
  pending: number;
  rejected: number;
}

export interface TrendItem {
  month: string;
  value: number;
}

export interface ApplicationRecord {
  id: number;
  applicationId: number;

  referenceNo: string;

  applicantName: string;

  department: string;

  submittedDate: string;

  month: string;

  status: RecordStatus;
}

export interface Application {
  id: number;

  name: string;

  hindi: string;

  icon: string;

  description: string;

  status: ApplicationStatus;

  color: string;

  stats: ApplicationStats;

  monthlyTrends: TrendItem[];

  records: ApplicationRecord[];
}