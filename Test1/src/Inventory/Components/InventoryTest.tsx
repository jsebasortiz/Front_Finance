import CRUDForm from "../../GeneralComponents/GeneralCrud/CRUDForm";
import { inventorySortFieldMap } from '../Types/MapeoInventory'; 
import { Button } from 'react-bootstrap';
import { InventoryTypes } from '../Types/Inventory';
import { EditIcon, DeleteIcon } from '../Icons/Icons';
import React from "react";
import {
  GetInventory,
  CreateInventory,
  UpdateInventory,
  DeleteInventory,
  GetSearchInventory,
} from '../API/InventoryAPI';

const InventoryCRUD = () => {
  const itemTemplate = (): InventoryTypes => ({
    id: 0,
    nombreEquipo: '', 
    numeroSerie: '',
    numeroInventario: 0,
    comentario: '',
    status: '',
    idUsuario: 0,
    idFabricante: 0,
    idEstadosDispositivo: 0,
  });

  const columns: { key: keyof InventoryTypes; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'nombreEquipo', label: 'Nombre del Equipo' },
    { key: 'numeroSerie', label: 'Número de Serie' },
    { key: 'numeroInventario', label: 'Número de Inventario' },
    { key: 'comentario', label: 'Comentario' },
    { key: 'status', label: 'Estado del Dispositivo' }
  ];

  const actions = (item: InventoryTypes,handleEdit: (item: InventoryTypes) => void,handleDelete: (id: number) => void) => (
    <>
      <Button
        style={{ backgroundColor: 'blue', color: 'white', border: 'none', marginRight: '5px' }}
        onClick={() => handleEdit(item)}
      >
        <EditIcon />
      </Button>
      <Button
        variant='danger'
        onClick={() => handleDelete(item.id)}
      >
        <DeleteIcon />
      </Button>
    </>
  );
  
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow"></div>
      <div className="content-wrapper container-xxl p-0">
        <div className="content-header row"></div>
        <div className="content-body">
          <h3>Gestión de Sucursales</h3>
          <p>Administre el inventario mediante la creación, edición o eliminación de registros.</p>

          {/* CRUD Form Section */}
          <div className="card">
            <div className="card-datatable table-responsive">
              <CRUDForm<InventoryTypes>
                fetchItems={GetInventory}
                createItem={CreateInventory}
                updateItem={UpdateInventory}
                deleteItem={DeleteInventory}
                searchItem={GetSearchInventory}
                itemTemplate={itemTemplate}
                columns={columns}
                actions={actions}
                sortFieldMap={inventorySortFieldMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InventoryCRUD;
