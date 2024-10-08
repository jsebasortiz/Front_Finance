import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AddIcon, FilterIcon } from '../Icons/Icons';
import './CRUDGeneral.css';

const MySwal = withReactContent(Swal);
type Orders = "ASC" | "DESC" | "neutral";

interface CRUDFormProps<T> {
  fetchItems: (page: number, size: number, filters: Partial<T>, sortOrder?: string, sortBy?: keyof T) => Promise<T[]>;
  searchItem?: (page: number, size: number, filters: Partial<T>, sortOrder?: string, sortBy?: keyof T) => Promise<T[]>;
  createItem: (item: T) => Promise<void>;
  updateItem: (id: number, item: T) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  itemTemplate: () => T;
  columns: { key: keyof T; label: string }[];
  actions: (item: T, handleEdit: (item: T) => void, handleDelete: (id: number) => void) => React.ReactNode;
  sortFieldMap: Record<string, string>;
}

const CRUDForm = <T extends { id: number }>({
  fetchItems,
  searchItem,
  createItem,
  updateItem,
  deleteItem,
  itemTemplate,
  columns,
  actions,
  sortFieldMap,
}: CRUDFormProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [operation, setOperation] = useState<'add' | 'edit'>('add');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filters, setFilters] = useState<Partial<T>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<Orders>("neutral");

  useEffect(() => {
    fetchAndSetData();
  }, [page, filters, sortField, sortOrder]);

  const fetchAndSetData = async () => {
    try {
      const sortFieldParam = sortField !== null ? (sortFieldMap[sortField as string] || String(sortField)) : undefined;
      const sortOrderParam = sortOrder !== "neutral" ? sortOrder : undefined;
      const activeFilters: Partial<T> = {};
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof T]) {
          activeFilters[key as keyof T] = filters[key as keyof T];
        }
      });
      const hasFilters = Object.keys(activeFilters).length > 0;
      const fetchedItems = hasFilters
        ? await searchItem!(page - 1, pageSize, activeFilters, sortOrderParam, sortFieldParam as keyof T)
        : await fetchItems(page - 1, pageSize, {}, sortOrderParam, sortFieldParam as keyof T);
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      MySwal.fire('Error', 'Error al obtener los datos', 'error');
    }
  };

  const handleShowModal = (operation: 'add' | 'edit', item: T | null = null) => {
    setOperation(operation);
    setCurrentItem(item || itemTemplate());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleSave = async () => {
    if (!currentItem) return;
    try {
      if (operation === 'add') {
        await createItem(currentItem);
        MySwal.fire('Hecho!', 'Elemento añadido con éxito.', 'success');
      } else {
        await updateItem(currentItem.id, currentItem);
        MySwal.fire('Actualizado!', 'Elemento actualizado con éxito.', 'success');
      }
      fetchAndSetData();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar:', error);
      MySwal.fire('Error', 'No se pudo guardar el elemento.', 'error');
    }
  };

  const handleDelete = (id: number) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "Estas seguro de eliminarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success', 
        cancelButton: 'btn btn-danger'
      }
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        deleteItem(id).then(() => {
          MySwal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
          fetchAndSetData();
        }).catch(error => {
          console.error('Error al eliminar:', error);
          MySwal.fire('Error', 'No se pudo eliminar el elemento.', 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire('Cancelado', 'Tu elemento está seguro :)', 'error');
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentItem) {
      setCurrentItem({ ...currentItem, [name]: value } as T);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value || undefined });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortChange = (key: keyof T) => {
    if (sortField === key) {
      setSortOrder(prevOrder => prevOrder === "ASC" ? "DESC" : prevOrder === "DESC" ? "neutral" : "ASC");
    } else {
      setSortField(key);
      setSortOrder("ASC");
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-12'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
      <div className='button-container'>
        <Button
          className='btn btn-primary btn-small me-2'
          onClick={() => handleShowModal('add')}
          aria-label="Añadir Nuevo Elemento"
        >
          <AddIcon />
        </Button>
        <Button
          className='btn btn-primary btn-small2 me-2'
          onClick={() => setShowFilters(!showFilters)}
          aria-label={showFilters ? 'Ocultar Filtro' : 'Mostrar Filtro'}
        >
          <FilterIcon />
          {showFilters}
        </Button>
      </div>
    </div>

          <div className='table-responsive'>
          <Table bordered hover className="table">
    <thead>
      <tr>
        {columns.map(col => (
          <th key={String(col.key)} onClick={() => handleSortChange(col.key)} style={{ cursor: 'pointer' }}>
            <div className="d-flex justify-content-between align-items-center">
              <span>{col.label}</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-arrow-down-up ${sortField === col.key ? (sortOrder === 'ASC' ? 'asc' : 'desc') : ''}`}
                  viewBox="0 0 16 16"
                >
                  <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </span>
            </div>
            {showFilters && (
              <div className="filter-container">
                <Form.Control
                  type='text'
                  name={String(col.key)}
                  placeholder={`Filtrar por ${col.label}`}
                  onChange={handleFilterChange}
                  className='filter-input'
                />
              </div>
            )}
          </th>
        ))}
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id ?? 'unknown'}>
          {columns.map(col => (
            <td key={String(col.key)}>
              {item[col.key] !== undefined && item[col.key] !== null
                ? String(item[col.key])
                : 'N/A'}
            </td>
          ))}
          <td>
            {actions(item, handleShowModal.bind(null, 'edit'), handleDelete)}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

            <div className='pagination-container'>
              <Button
                className='btn btn-outline-primary me-2'
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </Button>
              {page > 1 && (
                <Button
                  className={`btn ${page === 1 ? 'btn-primary' : 'btn-outline-primary'} me-1`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </Button>
              )}
              {page > 2 && (
                <Button
                  className={`btn ${page === page - 1 ? 'btn-primary' : 'btn-outline-primary'} me-1`}
                  onClick={() => handlePageChange(page - 1)}
                >
                  {page - 1}
                </Button>
              )}
              <Button className='btn btn-primary me-1'>
                {page}
              </Button>
              {items.length === pageSize && (
                <Button
                  className={`btn ${page === page + 1 ? 'btn-primary' : 'btn-outline-primary'} me-1`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Button>
              )}
              <Button
                className='btn btn-outline-primary ms-2'
                onClick={() => handlePageChange(page + 1)}
                disabled={items.length < pageSize}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{operation === 'add' ? 'Añadir' : 'Editar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <Form>
              {columns.map(col => (
                <Form.Group className='mb-3' key={String(col.key)}>
                  <Form.Label>{col.label}</Form.Label>
                  <Form.Control
                    type='text'
                    name={String(col.key)}
                    placeholder={col.label}
                    value={String(currentItem[col.key]) || ''}
                    onChange={handleChange}
                    aria-label={col.label}
                  />
                </Form.Group>
              ))}
              <div className='d-grid'>
                <Button className='btn btn-success' onClick={handleSave}>
                  <i className='fa-solid fa-floppy-disk me-1'></i> Guardar
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CRUDForm;
