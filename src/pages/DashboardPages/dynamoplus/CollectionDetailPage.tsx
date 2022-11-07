import React, { useEffect, useState } from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

import { useParams } from 'react-router-dom';
import { CollectionsDetails } from '@app/components/dynamoplus/Collections/detail/CollectionDetails';
import { useTranslation } from 'react-i18next';
import {
  getCollection,
  getDocumentsByCollection,
  Collection as CollectionData,
  getIndexesByCollection,
  Index,
} from '@app/api/dynamoplus/mocks/system.api';
import { Col, Row } from 'antd';
import * as S from './DynamoPlusPages.style';
import { CollectionsIndexes } from '@app/components/dynamoplus/Collections/detail/CollectionIndexes';
import { useResponsive } from '@app/hooks/useResponsive';
import { CollectionDocuments } from '@app/components/dynamoplus/Collections/detail/CollectionDocuments';
import { Space } from '../DashboardPage.styles';
import { Card } from '@app/components/common/Card/Card';
const CollectionDetailPage: React.FC = () => {
  const { name } = useParams();
  const [collection, setCollection] = useState<CollectionData>();
  const [indexes, setIndexes] = useState<Index[]>();
  const [documents, setDocuments] = useState<any[]>([]);

  const { isDesktop } = useResponsive();
  const { t } = useTranslation();

  useEffect(() => {
    if (name) {
      getCollection(name).then((res) => {
        setCollection(res);
        getIndexesByCollection(name).then((indexesRes) => {
          setIndexes(indexesRes);
        });
        getDocumentsByCollection(name).then((docRes) => {
          setDocuments(docRes);
        });
      });
    }
  }, []);

  const desktopLayout = (
    <Row gutter={[30, 0]}>
      <Col span={16}>
        <Card title={t('dynamoplus.collection.description')}>
          <S.ScrollWrapper id="collection-metadata">
            {/* <S.Title>{t('dynamoplus.collection.description')}</S.Title> */}
            {collection && <CollectionsDetails collection={collection} />}
          </S.ScrollWrapper>
        </Card>
      </Col>
      <Col span={8}>
        <Card title={t('dynamoplus.collection.indexes_description')}>
          <S.ScrollWrapper id="index-metadata">
            {/* <S.Title>{t('dynamoplus.collection.indexes_description')}</S.Title> */}
            {indexes && <CollectionsIndexes indexes={indexes} />}
          </S.ScrollWrapper>
        </Card>
      </Col>
      <Col span={24}>
        <Space />
        <Card title={t('dynamoplus.collection.documents')}>
          <S.ScrollWrapper id="documents">
            {documents && collection && collection.id_key && (
              <CollectionDocuments collectionIdKey={collection.id_key} documents={documents} />
            )}
          </S.ScrollWrapper>
        </Card>
      </Col>
    </Row>
  );

  const mobileAndTabletLayout = (
    <Row gutter={[20, 24]}>
      <Col span={24}></Col>
      <Col span={24}></Col>
    </Row>
  );

  return (
    <>
      <PageTitle>{name}</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );

  // return (
  //   <>
  //     <PageTitle>Collections</PageTitle>
  //     {name && <CollectionsDetailView collectionName={name} />}
  //   </>
  // );
};

export default CollectionDetailPage;
