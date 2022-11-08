import React from 'react';
import { useTranslation } from 'react-i18next';
import { Collection as CollectionData } from '@app/api/dynamoplus/mocks/system.api';
import * as S from '../../dynamoplus-dashboard/collection/CollectionsCard.styles';
import { Descriptions } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface CollectionDetaisProps {
  collection: CollectionData;
}
export const CollectionsDetails: React.FC<CollectionDetaisProps> = (props) => {
  const collection = props.collection;

  const { t } = useTranslation();

  return (
    <Descriptions title={collection.name} bordered layout="vertical" size="small">
      <Descriptions.Item label={t('dynamoplus.collection.id_key')} style={{ backgroundColor: 'transparent' }}>
        <S.Title>{collection?.idKey}</S.Title>
      </Descriptions.Item>
      <Descriptions.Item
        label={t('dynamoplus.collection.auto_generated_id')}
        style={{ backgroundColor: 'transparent' }}
      >
        {collection?.autoGeneratedId ? <CheckOutlined /> : <CloseOutlined />}
      </Descriptions.Item>
      <Descriptions.Item label={t('dynamoplus.collection.ordering_key')} style={{ backgroundColor: 'transparent' }}>
        <S.Title>{collection?.orderingKey}</S.Title>
      </Descriptions.Item>
      <Descriptions.Item label={t('dynamoplus.collection.attributes')} style={{ backgroundColor: 'transparent' }}>
        <Descriptions layout="vertical" size="small" bordered>
          {collection?.attributes?.map((a) => (
            <Descriptions.Item key={a.name} label={a.name} style={{ backgroundColor: 'transparent' }}>
              <S.Title>{a.type}</S.Title>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Descriptions.Item>
    </Descriptions>
  );
};
