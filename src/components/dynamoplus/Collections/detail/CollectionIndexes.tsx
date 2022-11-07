import React from 'react';
import { useTranslation } from 'react-i18next';
import { Index } from '@app/api/dynamoplus/mocks/system.api';
import * as S from '../../dynamoplus-dashboard/collection/CollectionsCard.styles';
import { Descriptions } from 'antd';
import { Space } from '@app/pages/DashboardPages/DashboardPage.styles';

interface CollectionsIndexesProps {
  indexes: Index[];
}
export const CollectionsIndexes: React.FC<CollectionsIndexesProps> = (props) => {
  const indexes = props.indexes;

  const { t } = useTranslation();
  return (
    <>
      {indexes.map((i) => {
        return (
          <>
            <Descriptions title={i.name} bordered layout="vertical" size="small">
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
                <S.Title>{i.ordering_key}</S.Title>
              </Descriptions.Item>
              <Descriptions.Item label={t('dynamoplus.index.conditions')} style={{ backgroundColor: 'transparent' }}>
                {i.conditions.map((c) => (
                  <S.Title key={c}>{c}</S.Title>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Space />
          </>
        );
      })}
      <Space />
    </>
  );
};
