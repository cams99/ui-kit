'use client';
import esES from 'antd/locale/es_ES';
import enUS from 'antd/locale/en_US';
import ptBR from 'antd/locale/pt_BR';
import { MoonOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Switch, Row, Col, Typography, theme, Space, Select } from 'antd';

import styles from './index.module.css';
import { useTheme } from '@/app/context/theme-context';
import { useLanguage } from '@/app/context/language-context';
import { DARK_MODE_TOKEN, LIGHT_MODE_TOKEN } from './constants';

const { Title } = Typography;

const localeMap = {
  es: esES,
  en: enUS,
  pt: ptBR,
};

export default function UiLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...(isDarkMode ? DARK_MODE_TOKEN : LIGHT_MODE_TOKEN),
      }}
      locale={localeMap[language]}
    >
      <Layout className={styles['ui-layout__root']}>
        <Layout.Header>
          <Row align="middle" justify="space-between" wrap={false}>
            <Col>
              <Title level={3}>Gestión de usuarios</Title>
            </Col>
            <Col>
              <Space>
                <Select
                  value={language}
                  onChange={setLanguage}
                  style={{ width: 120 }}
                  options={[
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                    { value: 'pt', label: 'Português' },
                  ]}
                  aria-label="Seleccionar idioma"
                />
                <MoonOutlined style={{ fontSize: 18 }} />
                <Switch checked={isDarkMode} onChange={setIsDarkMode} />
              </Space>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content
          className={styles['ui-layout__content']}
          style={{ background: isDarkMode ? '#1F2937' : '#FFFFFF' }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
