import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../common/Card/Card';
import styled from 'styled-components';
import {
  getCollectionsCount,
  getIndexesCount,
  getClientAuthorizationCount,
} from '@app/api/dynamoplus/mocks/system.api';
import { Col, Row } from 'antd/lib/grid';
import { UsageCard } from './UsageCard/UsageCard';
import { DatabaseOutlined, FileSearchOutlined, LaptopOutlined } from '@ant-design/icons';
import { UsageChart } from './UsageChart';

export const Usage: React.FC = () => {
  // const [data,setData] = useState<ChartData>([0,0,0]);
  const [collectionCount, setCollectionCount] = useState(0);
  const [indexCount, setIndexCount] = useState(0);
  const [clientAuthorizationCount, setClientAuthorizationCount] = useState(0);
  useEffect(() => {
    getCollectionsCount().then((res) => setCollectionCount(res));
    getIndexesCount().then((res) => setIndexCount(res));
    getClientAuthorizationCount().then((res) => setClientAuthorizationCount(res));
  }, []);
  const { t } = useTranslation();

  return (
    <UsageCardStyled id="activity" title={t('dynamoplus.usage.title')} padding={100}>
      <Row gutter={[30, 30]}>
        <Col id={'collection-count'} xs={12} md={8}>
          <UsageCard
            name={t('dynamoplus.common.collection')}
            value={collectionCount}
            color={'success'}
            Icon={DatabaseOutlined}
          />
        </Col>
        <Col id={'index-count'} xs={12} md={8}>
          <UsageCard
            name={t('dynamoplus.common.index')}
            value={indexCount}
            color={'success'}
            Icon={FileSearchOutlined}
          />
        </Col>
        <Col id={'index-count'} xs={12} md={8}>
          <UsageCard
            name={t('dynamoplus.common.client_authorization')}
            value={clientAuthorizationCount}
            color={'success'}
            Icon={LaptopOutlined}
          />
        </Col>
      </Row>

      {/* <UsageChart data={[collectionCount,indexCount,clientAuthorizationCount]} /> */}
    </UsageCardStyled>
  );
};

const UsageCardStyled = styled(Card)``;
