import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collection, Index } from '@app/api/dynamoplus/mocks/system.api';
import * as S from '../../dynamoplus-dashboard/collection/CollectionsCard.styles';
import { Descriptions } from 'antd';
import { Space } from '@app/pages/DashboardPages/DashboardPage.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import { CreateIndexForm } from '../CreateIndexForm/CreateIndexForm';

interface CollectionsIndexesProps {
  indexes: Index[];
  collection: Collection;
}
export const CollectionsIndexes: React.FC<CollectionsIndexesProps> = (props) => {
  const indexes = props.indexes;
  const collection = props.collection;
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      {collection && (
        <CreateIndexForm
          isVisible={isCreateModalVisible}
          onSubmitted={() => {
            setIsCreateModalVisible(false);
          }}
          collectionName={collection.name}
          collectionAttributes={
            collection.attributes?.map((a) => {
              return {
                attributeName: a.name,
                attributeType: a.type,
              };
            }) || []
          }
          onCanceled={() => setIsCreateModalVisible(false)}
        />
      )}
      <S.ButtonGroup>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => {
            setIsCreateModalVisible(true);
          }}
        >
          {t('dynamoplus.index.create')}
        </Button>
      </S.ButtonGroup>
      {indexes.map((i) => {
        return (
          <Descriptions key={i.name} title={i.name} bordered layout="vertical" size="small">
            <Descriptions.Item
              label={t('dynamoplus.index.index_configuration')}
              style={{ backgroundColor: 'transparent' }}
            >
              <S.Title>{i.configuration}</S.Title>
            </Descriptions.Item>
            <Descriptions.Item
              label={t('dynamoplus.index.index_configuration')}
              style={{ backgroundColor: 'transparent' }}
            >
              <S.Title>{i.configuration}</S.Title>
            </Descriptions.Item>
            <Descriptions.Item label={t('dynamoplus.index.ordering_key')} style={{ backgroundColor: 'transparent' }}>
              <S.Title>{i.orderingKey}</S.Title>
            </Descriptions.Item>
            <Descriptions.Item label={t('dynamoplus.index.conditions')} style={{ backgroundColor: 'transparent' }}>
              {i.conditions.map((c) => (
                <S.Title key={c}>{c}</S.Title>
              ))}
            </Descriptions.Item>
          </Descriptions>
        );
      })}
      <Space />
    </>
  );
};
