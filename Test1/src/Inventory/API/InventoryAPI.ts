import { ObjectResponse } from "../Types/TypesDTO/ObjectResponse";
import { InventoryTypes } from "../Types/Inventory";

const URL = 'http://localhost:8080/api/inventory';

export async function GetInventoryById(id: number): Promise<ObjectResponse<InventoryTypes> | null> {
    try {
        const response = await fetch(`${URL}/get/${id}`);
        if (response.ok) {
            const data: ObjectResponse<InventoryTypes> = await response.json();
            return data;
        } else {
            throw new Error(`La solicitud a la API falló ${response.status}`);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
        return null;
    }
}

export const GetInventory = async (
  page: number,
  size: number,
  filters: Partial<InventoryTypes>,
  sortOrder: string = '',  
  sortBy?: keyof InventoryTypes
): Promise<InventoryTypes[]> => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', String(page));
  queryParams.append('size', String(size));

  const validSortOrder = sortOrder === 'ASC' || sortOrder === 'DESC' ? sortOrder : 'ASC';
  queryParams.append('orders', validSortOrder);

  if (sortBy) {
    queryParams.append('sortBy', String(sortBy)); 
  }

  Object.keys(filters).forEach(key => {
    const value = filters[key as keyof InventoryTypes];
    if (value) {
      queryParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(`${URL}?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    const data = await response.json();
    return data.content; 
  } catch (error) {
    console.error('Error al obtener los elementos:', error);
    return [];
  }
};


export async function CreateInventory(inventoryDto: InventoryTypes): Promise<void> {
    try {
        const response = await fetch(`${URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inventoryDto),
        });
        if (!response.ok) {
            throw new Error(`La solicitud a la API falló ${response.status}`);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
    }
}

export const GetSearchInventory = async (
  page: number,
  size: number,
  filters: Partial<InventoryTypes>,
  sortOrder: string = 'ASC',  
  sortBy?: keyof InventoryTypes 
): Promise<InventoryTypes[]> => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', String(page));
  queryParams.append('size', String(size));


  const validSortOrder = sortOrder === 'ASC' || sortOrder === 'DESC' ? sortOrder : 'ASC';
  queryParams.append('orders', validSortOrder);

  if (sortBy) {
    queryParams.append('sortBy', String(sortBy));
  }

  
  Object.keys(filters).forEach(key => {
    const value = filters[key as keyof InventoryTypes];
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(`${URL}/search?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error al obtener los elementos:', error);
    return [];
  }
};

export async function UpdateInventory(id: number, inventoryDto: InventoryTypes): Promise<void> {
    try {
        const response = await fetch(`${URL}/update/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inventoryDto),
        });
        if (!response.ok) {
            throw new Error(`La solicitud a la API falló ${response.status}`);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
    }
}

export async function DeleteInventory(id: number): Promise<void> {
    try {
        const response = await fetch(`${URL}/delete/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`La solicitud a la API falló ${response.status}`);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
    }
}

export async function GetAllInventoriesNoPage(): Promise<ObjectResponse<InventoryTypes[]> | null> {
    try {
        const response = await fetch(`${URL}/no-page/getAllInventory`);
        if (response.ok) {
            const data: ObjectResponse<InventoryTypes[]> = await response.json();
            return data;
        } else {
            throw new Error(`La solicitud a la API falló ${response.status}`);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
        return null;
    }
}
