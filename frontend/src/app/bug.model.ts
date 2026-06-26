export type BugStatus = 'Open' | 'WorkInProgress' | 'Hold' | 'Closed' | 'Rejected';

export interface BugItem {
  id: number;
  title: string;
  description: string;
  status: BugStatus;
  assignee?: string;
  priority: string;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type BugForm = Omit<BugItem, 'id' | 'createdAtUtc' | 'updatedAtUtc'>;

export interface BugSummary {
  status: BugStatus;
  count: number;
}
