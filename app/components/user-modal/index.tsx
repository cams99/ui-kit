'use client';
import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Typography } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '@/app/context/theme-context';

const { Title } = Typography;

export interface UserFormValues {
  name: string;
  email: string;
  status: boolean;
}

interface UserModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => void;
  initialValues?: UserFormValues;
  isEdit?: boolean;
}

export default function UserModal({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEdit,
}: UserModalProps) {
  const [form] = Form.useForm<UserFormValues>();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { name: '', email: '', status: true });
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={<Title level={2}>{isEdit ? 'Editar usuario' : 'Agregar usuario'}</Title>}
      footer={[
        <Button size="large" type="default" key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          size="large"
          icon={<SaveOutlined />}
          key="submit"
          type="primary"
          onClick={() => form.submit()}
        >
          Guardar Usuario
        </Button>,
      ]}
      closeIcon={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? 'unset' : '#EFF1F5',
            borderRadius: 999,
            width: 32,
            height: 32,
          }}
          onClick={onCancel}
        >
          <CloseOutlined />
        </div>
      }
      styles={{
        header: {
          marginBottom: 24,
        },
        content: {
          padding: 48,
        },
        footer: {
          marginTop: 24,
        },
      }}
      width={644}
      height={462}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues || { name: '', email: '', status: true }}
      >
        <Form.Item
          label="Nombre y apellido"
          name="name"
          rules={[{ required: true, message: 'Por favor ingrese el nombre y apellido' }]}
        >
          <Input size="large" placeholder="Nombre y apellido" autoFocus />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingrese el email' },
            { type: 'email', message: 'Por favor ingrese un email válido' },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
        >
          <Select
            options={[
              { value: true, label: 'Activo' },
              { value: false, label: 'Inactivo' },
            ]}
            placeholder="Seleccionar estado"
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
