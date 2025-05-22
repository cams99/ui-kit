import { ColumnsType } from 'antd/es/table';
import { Dispatch, SetStateAction, useState } from 'react';
import { Input, Select, Button, Divider, Row, Col, Tag, App as AntdApp, Space, Image } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table } from '../ui';
import { User } from '@/app/types';
import styles from './index.module.css';
import type { TableProps } from 'antd';

interface UserTableProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  onEdit: (user: User) => void;
  onAdd: () => void;
}

export default function UserTable({ users, setUsers, onEdit, onAdd }: UserTableProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<boolean>();
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [sortField, setSortField] = useState<string>();
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>();
  const { message, modal } = AntdApp.useApp();

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === undefined ? true : user.status === status;
    return matchesSearch && matchesStatus;
  });

  const sortedUsers = [...filteredUsers];
  if (sortField && sortOrder) {
    sortedUsers.sort((a, b) => {
      let result = 0;
      if (['id', 'name', 'email'].includes(sortField)) {
        result = String(a[sortField]).localeCompare(String(b[sortField]));
      } else if (sortField === 'status') {
        result = Number(a.status) - Number(b.status);
      }
      return sortOrder === 'ascend' ? result : -result;
    });
  }

  const total = sortedUsers.length;
  const paginatedUsers = sortedUsers.slice((current - 1) * pageSize, current * pageSize);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrent(1);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleTableChange: TableProps<User>['onChange'] = (_pagination, _filters, sorter) => {
    if (!Array.isArray(sorter)) {
      setSortField(sorter.field as string);
      setSortOrder(sorter.order as 'ascend' | 'descend' | undefined);
      setCurrent(1);
    }
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '¿Estás seguro de querer eliminar este usuario?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        setUsers(prev => prev.filter(u => u.id !== id));
        message.success('Usuario eliminado');
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      responsive: ['md'],
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (name: User['name']) => (
        <Space>
          <Image src="/Avatars.png" alt={name} width={24} height={24} />
          {name}
        </Space>
      ),
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      responsive: ['md'],
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: User['status']) => (
        <Tag
          className={styles['user-table__status-tag']}
          icon={
            <div
              className={
                `${styles['user-table__status-dot']} ` +
                (status
                  ? styles['user-table__status-dot--active']
                  : styles['user-table__status-dot--inactive'])
              }
            />
          }
          color={status ? 'success' : 'default'}
        >
          {status ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
      sorter: true,
      onFilter: (value: boolean | React.Key, record: User) => record.status === value,
      responsive: ['md'],
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<DeleteOutlined />}
            type="text"
            danger
            aria-label="Delete user"
            onClick={() => handleDelete(record.id)}
          />
          <Button
            icon={<EditOutlined />}
            type="text"
            aria-label="Edit user"
            onClick={() => onEdit(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between" gutter={[8, 16]} wrap>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            prefix={<SearchOutlined style={{ fontSize: 20, color: '#C1C9D7' }} />}
            size="large"
            placeholder="Buscador por usuarios"
            allowClear
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={3}>
          <Select
            style={{ minWidth: 170, width: '100%' }}
            size="large"
            allowClear
            placeholder="Filtro por estado"
            value={status}
            onChange={value => setStatus(value)}
            options={[
              { value: true, label: 'Activo' },
              { value: false, label: 'Inactivo' },
            ]}
          />
        </Col>
        <Col xs={24} md={8} lg={15} className={styles['user-table__add-btn']}>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={onAdd}>
            Agregar usuario
          </Button>
        </Col>
      </Row>
      <Divider size="middle" />

      <Table
        columns={columns}
        dataSource={paginatedUsers}
        pageSize={pageSize}
        current={current}
        total={total}
        onPageSizeChange={handlePageSizeChange}
        onPaginationChange={handlePaginationChange}
        onTableChange={handleTableChange}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </>
  );
}
