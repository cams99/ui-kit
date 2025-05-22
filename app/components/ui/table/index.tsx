'use client';
import {
  Table as AntdTable,
  Select,
  Pagination,
  TableProps,
  Row,
  Space,
  Typography,
  Col,
  Grid,
} from 'antd';

const { Text } = Typography;
const { useBreakpoint } = Grid;

type TableComponentProps<T> = {
  columns: TableProps<T>['columns'];
  dataSource: T[];
  rowKey?: string;
  pageSize: number;
  current: number;
  total: number;
  onPageSizeChange: (value: number) => void;
  onPaginationChange: (page: number, pageSize?: number) => void;
  onTableChange: TableProps<T>['onChange'];
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
};

function Table<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  pageSize,
  current,
  total,
  onPageSizeChange,
  onPaginationChange,
  onTableChange,
  sortField,
  sortOrder,
}: TableComponentProps<T>) {
  const screens = useBreakpoint();
  const columnsWithSort = columns?.map(col => {
    if (!col || typeof col !== 'object' || !('dataIndex' in col)) return col;
    if (['id', 'name', 'email', 'status'].includes(col.dataIndex as string)) {
      return {
        ...col,
        sorter: true,
        sortOrder: sortField === col.dataIndex ? sortOrder : undefined,
      };
    }
    return col;
  });

  return (
    <>
      <AntdTable
        columns={columnsWithSort}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={false}
        size="small"
        onChange={onTableChange}
      />
      <Row
        align="middle"
        justify="space-between"
        gutter={[16, 16]}
        style={{ margin: '24px 12px 0' }}
      >
        <Col xs={24} md={12}>
          <Space size="middle">
            <Text strong>Resultados por página</Text>
            <Select
              size="large"
              style={{ width: 100 }}
              value={pageSize}
              onChange={onPageSizeChange}
              options={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
            />
          </Space>
        </Col>
        <Col xs={24} md={10} offset={screens.md ? 2 : 0}>
          <Space align="end">
            <Pagination
              total={total}
              current={current}
              pageSize={pageSize}
              showTotal={(total, range) =>
                screens.md && `${range[0]}-${range[1]} de ${total} resultados`
              }
              onChange={onPaginationChange}
              showSizeChanger={false}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default Table;
