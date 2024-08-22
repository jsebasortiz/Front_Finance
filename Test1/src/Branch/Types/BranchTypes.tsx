export interface BranchTypes {
  id: number;
  mainBranch: string;
  branchName: string;
  department: string;
  municipality: string;
  status: 'ACTIVE' | 'INACTIVE';
}
