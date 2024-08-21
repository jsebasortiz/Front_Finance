import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import './CRUDGeneral.css';

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
  title: string;
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
  title,
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
        const value = filters[key as keyof T];
        if (value !== undefined && value !== null && value !== '') {
          activeFilters[key as keyof T] = value;
        }
      });

      const hasFilters = Object.keys(activeFilters).length > 0;

      const fetchedItems = hasFilters
        ? await searchItem!(page, pageSize, activeFilters, sortOrderParam, sortFieldParam as keyof T)
        : await fetchItems(page, pageSize, {}, sortOrderParam, sortFieldParam as keyof T);

      setItems(fetchedItems);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
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
      } else if (currentItem.id !== undefined) {
        await updateItem(currentItem.id, currentItem);
      }
      fetchAndSetData();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (id) {
      if (window.confirm('¿Estás seguro de que deseas eliminar?')) {
        try {
          await deleteItem(id);
          fetchAndSetData();
        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    } else {
      console.error('ID no válido para eliminar');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentItem) {
      setCurrentItem({ ...currentItem, [name]: value } as T);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value || undefined }; 
    setFilters(newFilters);
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
            <h1 className='title'>{title}</h1>
            <div className='button-container'>
              <Button
                className='custom-button add-button'
                onClick={() => handleShowModal('add')}
                aria-label="Añadir Nuevo Elemento"
              >
                <i className='fa-solid fa-circle-plus'></i>
              </Button>
              <Button
                className='custom-button filter-button'
                onClick={() => setShowFilters(!showFilters)}
                aria-label={showFilters ? 'Ocultar Filtro' : 'Mostrar Filtro'}
              >
                <i className={`fa-solid fa-${showFilters ? 'eye-slash' : 'eye'}`}></i>
              </Button>
            </div>
          </div>

          <div className='table-responsive'>
            <Table bordered hover>
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={String(col.key)} onClick={() => handleSortChange(col.key)}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{col.label}</span>
                        <span>
                          {sortField === col.key ? (
                            sortOrder === "ASC" ? <i className="fa-solid fa-sort-up"></i> :
                            sortOrder === "DESC" ? <i className="fa-solid fa-sort-down"></i> :
                            <i className="fa-solid fa-sort"></i>
                          ) : <i className="fa-solid fa-sort"></i>}
                        </span>
                      </div>
                      {showFilters && (
                        <Form.Control
                          type='text'
                          name={String(col.key)}
                          placeholder={`Filtrar por ${col.label}`}
                          onChange={handleFilterChange}
                          className='filter-input mt-1'
                        />
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
                className={`pagination-item pagination-prev ${page === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </Button>
              {page > 1 && (
                <Button
                  className={`pagination-item ${page === 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </Button>
              )}
              {page > 2 && (
                <Button
                  className={`pagination-item ${page === page - 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(page - 1)}
                >
                  {page - 1}
                </Button>
              )}
              <Button className='pagination-item active'>
                {page}
              </Button>
              {items.length === pageSize && (
                <Button
                  className={`pagination-item ${page === page + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Button>
              )}
              <Button
                className={`pagination-item pagination-next ${items.length < pageSize ? 'disabled' : ''}`}
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
              <div className='d-grid col-6 mx-auto'>
                <Button className='btn btn-success' onClick={handleSave}>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
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
