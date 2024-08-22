import CRUDForm from "../../GeneralComponents/GeneralCrud/CRUDForm";
import { Button } from 'react-bootstrap';
import { EconomicActivityTypes } from '../Types/EconomicActivityTypes';
import { EconomicActivitySortFieldMap } from '../Types/MapeoEconomicActivity'; 
import { EditIcon, DeleteIcon } from '../Icons/Icons';
import React from "react";
import {
  GetEconomicActivity,
  CreateEconomicActivity,
  UpdateEconomicActivity,
  DeleteEconomicActivity,
  GetSearchEconomicActivity,
} from '../API/EconomicActivity';

const EconomicActivityCRUD = () => {
  const itemTemplate = (): EconomicActivityTypes => ({
    id: 0,
    ciiuCode: 0, 
    description: '',
    status: '',
  });

  const columns: { key: keyof EconomicActivityTypes; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'ciiuCode', label: 'Codigo CIIU' },
    { key: 'description', label: 'Descripcion' },
    { key: 'status', label: 'Estados' },
  ];

  const actions = (item: EconomicActivityTypes,handleEdit: (item: EconomicActivityTypes) => void,handleDelete: (id: number) => void) => (
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
          <h3>Gestión de actividades economicas</h3>
          <p>Administre las actividades economicas mediante la creación, edición o eliminación de registros.</p>

          {/* CRUD Form Section */}
          <div className="card">
            <div className="card-datatable table-responsive">
              <CRUDForm<EconomicActivityTypes>
                fetchItems={GetEconomicActivity}
                searchItem={GetSearchEconomicActivity}
                createItem={CreateEconomicActivity}
                updateItem={UpdateEconomicActivity}
                deleteItem={DeleteEconomicActivity}
                itemTemplate={itemTemplate}
                columns={columns}
                actions={actions}
                sortFieldMap={EconomicActivitySortFieldMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EconomicActivityCRUD;
