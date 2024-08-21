import { CompanyType } from "../Types/Company";

const API_URL = 'http://localhost:8080/api/company';

export const GetCompany = async (id: number): Promise<CompanyType> => {
  const response = await fetch(`${API_URL}/company/all`);
  if (!response.ok) {
    throw new Error(`La solicitud a la API fallo: ${response.statusText}`);
  }
  const data: CompanyType = await response.json(); 
  return data;
};


export async function GetCompanyById(id: number): Promise<CompanyType | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error al cargar el ID de company ${id}: ${response.status} - ${await response.text()}`);
      return null;  
    }
  } catch (error) {
    console.error(`Error en el ID ${id}:`, error);
    return null;  
  }
}

export async function CreateCompany(company: CompanyType): Promise<CompanyType> {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error al crear company: ${response.status} - ${await response.text()}`);
      throw new Error('Error creando company');  
    }
  } catch (error) {
    console.error("Error creando company:", error);
    throw error; 
  }
}

export const UpdateCompany = async (company: CompanyType): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/update/${company.companyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });

    return response.ok; 
  } catch (error) {
    console.error("Error al actualizar company:", error);
    return false; 
  }
};

export async function DeleteCompany(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return true;
    } else {
      console.error(`Error al eliminar el ID de company  ${id}: ${response.status} - ${await response.text()}`);
      return false;
    }
  } catch (error) {
    console.error(`Error eliminado el ID de company ${id}:`, error);
    return false;
  }
}

export async function UpdateCompanyStatus(id: number, status: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
    if (response.ok) {
      return true;
    } else {
      console.error(`Error al actualizar el estado  ${id}: ${response.status} - ${await response.text()}`);
      return false;
    }
  } catch (error) {
    console.error(`Error actualizando el estado ${id}:`, error);
    return false;
  }
}
