import CRUDForm from "../../GeneralComponents/GeneralCrud/CRUDForm";
import { Button } from 'react-bootstrap';
import { BranchTypes } from '../Types/BranchTypes';
import {
  GetBranch,
  CreateBranch,
  UpdateBranch,
  DeleteBranch,
  GetSearchBranch,
} from '../API/BranchAPI';
import { branchSortFieldMap } from '../Types/MapeoBranch';
import React from "react";

const BranchCRUD = () => {
  const itemTemplate = (): BranchTypes => ({
    id: 0,
    mainBranch: '',
    branchName: '',
    department: '',
    municipality: '',
    status: 'ACTIVE'
  });

  const columns: { key: keyof BranchTypes; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'mainBranch', label: 'Sucursal principal' },
    { key: 'branchName', label: 'Nombre' },
    { key: 'department', label: 'Departamento' },
    { key: 'municipality', label: 'Municipio' },
    { key: 'status', label: 'Estado' }
  ];

  const actions = (item: BranchTypes, handleEdit: (item: BranchTypes) => void, handleDelete: (id: number) => void) => (
    <>
      <Button
        style={{ backgroundColor: 'blue', color: 'white', border: 'none', marginRight: '5px' }}
        onClick={() => handleEdit(item)}
      >
        <i className='fa-solid fa-edit'></i>
      </Button>
      <Button
        variant='danger'
        onClick={() => handleDelete(item.id)}
      >
        <i className='fa-solid fa-trash'></i>
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
          <p>Administre las sucursales mediante la creación, edición o eliminación de registros.</p>

          {/* CRUD Form Section */}
          <div className="card">
            <div className="card-datatable table-responsive">
              <CRUDForm<BranchTypes>
                fetchItems={GetBranch}
                searchItem={GetSearchBranch}
                createItem={CreateBranch}
                updateItem={UpdateBranch}
                deleteItem={DeleteBranch}
                itemTemplate={itemTemplate}
                columns={columns}
                actions={actions}
                title='Sucursal'
                sortFieldMap={branchSortFieldMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCRUD;
