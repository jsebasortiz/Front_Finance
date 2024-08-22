
export interface CompanyType {   
  companyId: number,
  companyName: string,
  nit: number,
  address: string,
  email: string,
  phone: number,
  economicActivity: string,
  ciiuCode: string,
  status?: string;
  
  }

  export interface CompanyTableProps {
    company: CompanyType;
  }
  