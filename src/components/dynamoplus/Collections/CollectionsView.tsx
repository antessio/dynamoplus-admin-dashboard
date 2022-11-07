import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Collection, getCollections } from '@app/api/dynamoplus/mocks/system.api';
import * as S from '../dynamoplus-dashboard/collection/CollectionsCard.styles';
import { Table } from 'components/common/Table/Table';
import { Col, Row, Space, Tooltip } from 'antd';
import { BasicTableRow, CollectionTableRow } from 'api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import { Button } from 'components/common/buttons/Button/Button';
import {
  CheckOutlined,
  CloseOutlined,
  MenuOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Modal } from '@app/components/common/Modal/Modal';
import { Card } from '@app/components/common/Card/Card';

export const CollectionsView: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: CollectionTableRow[]; hasMore: boolean; loading: boolean }>({
    data: [],
    hasMore: true,
    loading: false,
  });

  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);

  const { t } = useTranslation();
  const { isMounted } = useMounted();
  const fetch = useCallback(() => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getCollections(3).then((res) => {
      if (isMounted.current) {
        const hasMore = res.length > 2;
        setTableData({
          data: res.splice(0, 2).map((c: Collection): CollectionTableRow => {
            return {
              id_key: c.id_key || '',
              name: c.name,
              auto_generated_id: c.auto_generated_id,
              attributes: c.attributes?.map((a) => a.name + ' (' + a.type + ')') || [],
            };
          }),
          hasMore: hasMore,
          loading: false,
        });
      }
    });
  }, [isMounted]);

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('common.name'),
      dataIndex: 'name',
    },
    {
      title: 'id_key',
      dataIndex: 'id_key',
    },
    {
      title: t('dynamoplus.collection.auto_generated_id'),
      dataIndex: 'auto_generated_id',
      render: (auto_generated_id: boolean) => {
        return auto_generated_id ? <CheckOutlined /> : <CloseOutlined />;
      },
    },
    {
      title: t('dynamoplus.collection.attributes'),
      key: 'attributes',
      dataIndex: 'attributes',
      render: (attributes: string[]) => (
        <Row gutter={[10, 10]}>
          {attributes.map((a: string) => {
            return <Col key={a.trim()}>{a}</Col>;
          })}
        </Row>
      ),
    },
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      render: (text: string, record: { name: string; key: number }) => {
        return (
          <Space>
            <Tooltip title={t('dynamoplus.collection.documents')}>
              <Link to={'/dynamoplus/collections/' + record.name}>
                <Button type="ghost" icon={<SearchOutlined />} />
              </Link>
            </Tooltip>

            {/* <Button
              type="ghost"
              onClick={() => {
                notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {t('tables.invite')}
            </Button> */}
            {/* <Button type="default" danger onClick={() => handleDeleteRow(record.key)}>
              {t('tables.delete')}
            </Button> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetch();
  }, [fetch]);

  // const handleTableChange = (pagination: InfinitePagination) => {
  //   fetch(pagination);
  // };

  return (
    <>
      <Modal
        title={t('modals.largeTitle')}
        centered
        visible={isCreateModalVisible}
        onOk={() => setIsCreateModalVisible(false)}
        onCancel={() => setIsCreateModalVisible(false)}
        size="large"
      >
        <p>Insert collection</p>
      </Modal>
      <Card title={t('dynamoplus.collection.title')}>
        <S.Wrapper>
          {/* <S.Title level={2}>{t('dynamoplus.collection.title')}</S.Title> */}
          <S.ButtonGroup>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                setIsCreateModalVisible(true);
              }}
            >
              {t('dynamoplus.collection.create')}
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} size="small">
              {t('dynamoplus.collection.refresh')}
            </Button>
          </S.ButtonGroup>

          <Table
            scroll={{ x: 800 }}
            bordered
            size="small"
            columns={columns}
            dataSource={tableData.data}
            pagination={false}
          />
          <S.ButtonGroup>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              disabled={!tableData.hasMore}
              onClick={(e) => {
                getCollections(3, tableData.data[tableData.data.length - 1].name).then((res) => {
                  const hasMore = res.length > 2;
                  const newTableData = res.splice(0, 2).map((c: Collection): CollectionTableRow => {
                    return {
                      id_key: c.id_key || '',
                      name: c.name,
                      auto_generated_id: c.auto_generated_id,
                      attributes: c.attributes?.map((a) => a.name + ' (' + a.type + ')') || [],
                    };
                  });
                  setTableData({ data: [...tableData.data, ...newTableData], hasMore: hasMore, loading: false });
                });
              }}
            >
              {t('dynamoplus.collection.show_more')}
            </Button>
          </S.ButtonGroup>
        </S.Wrapper>
      </Card>
    </>
  );
};
