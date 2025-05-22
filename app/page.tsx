'use client';
import { App as AntdApp } from 'antd';
import { useEffect, useState } from 'react';

import { User } from './types';
import { generateUsers } from './helpers';
import { UiLayout, UserTable, UserModal, type UserFormValues } from './components';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const { message } = AntdApp.useApp();

  useEffect(() => {
    const TOTAL_USERS = 10000;
    setUsers(generateUsers(TOTAL_USERS));
  }, []);

  const handleModalSubmit = (values: UserFormValues) => {
    if (editUser) {
      setUsers(prev => prev.map(u => (u.id === editUser.id ? { ...u, ...values } : u)));
      message.success('Usuario actualizado');
    } else {
      const newId = (users.length + 1).toString().padStart(5, '0');
      setUsers(prev => [{ id: newId, ...values }, ...prev]);
      message.success('Usuario agregado');
    }
    setModalOpen(false);
    setEditUser(null);
  };

  return (
    <UiLayout>
      <UserTable
        users={users}
        setUsers={setUsers}
        onEdit={user => {
          setEditUser(user);
          setModalOpen(true);
        }}
        onAdd={() => {
          setEditUser(null);
          setModalOpen(true);
        }}
      />

      <UserModal
        open={modalOpen}
        onCancel={() => {
          console.log('onCancel');
          setModalOpen(false);
          setEditUser(null);
        }}
        onSubmit={handleModalSubmit}
        initialValues={
          editUser
            ? { name: editUser.name, email: editUser.email, status: editUser.status }
            : undefined
        }
        isEdit={!!editUser}
      />
    </UiLayout>
  );
}
