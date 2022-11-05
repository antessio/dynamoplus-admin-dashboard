// import React, { useEffect, useState } from 'react';
// import { Col, Row } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { NFTCard } from '@app/components/nft-dashboard/common/NFTCard/NFTCard';
// import { useAppSelector } from '@app/hooks/reduxHooks';
// import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
// import { getBalance } from '@app/api/earnings.api';
// import {getCollectionsCount, getIndexesCount} from '@app/api/dynamoplus/mocks/system.api'
// import * as S from './Usage.styles';
// import { StatisticsCard } from '@app/components/medical-dashboard/statisticsCards/statisticsCard/StatisticsCard/StatisticsCard';
// import { DatabaseOutlined, NodeIndexOutlined } from '@ant-design/icons';

// export const Usage: React.FC = () => {
//   const [balance, setBalance] = useState({
//     usd_balance: 0,
//     eth_balance: 0,
//     btc_balance: 0,
//   });

//   const [collectionCount, setCollectionCount] = useState(0);
//   const [indexCount, setIndexCount] = useState(0);

//   const userId = useAppSelector((state) => state.user.user?.id);
//   const { theme } = useAppSelector((state) => state.theme);

//   useEffect(() => {
//     getCollectionsCount().then((res) => setCollectionCount(res));
//     getIndexesCount().then((res) => setIndexCount(res));
//   }, []);

//   const { t } = useTranslation();

//   return (
//     <Row>
//       <Col span={24}>
//         <S.TitleText level={2}>{t('dynamoplus.usage.title')}</S.TitleText>
//       </Col>

//       <Col span={24}>
//       <S.SubtitleBalanceText>{t('dynamoplus.usage.collection_count')} : {collectionCount}</S.SubtitleBalanceText>
//       </Col>
//         <Col span={24}>
//         <S.SubtitleBalanceText>{t('dynamoplus.usage.index_count')} : {indexCount}</S.SubtitleBalanceText>
//       </Col>
//     </Row>
//   );
// };


import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../common/Card/Card';
import { UsageChart } from './UsageChart';
import { ChartData } from 'interfaces/interfaces';
import styled from 'styled-components';
import {getCollectionsCount, getIndexesCount, getClientAuthorizationCount} from '@app/api/dynamoplus/mocks/system.api'
import { Col, Row } from 'antd/lib/grid';
import { UsageCard } from './UsageCard/UsageCard';
import { DatabaseOutlined, FileSearchOutlined, LaptopOutlined } from '@ant-design/icons';

export const Usage: React.FC = () => {
  // const [data,setData] = useState<ChartData>([0,0,0]);
  const [collectionCount, setCollectionCount] = useState(0);
  const [indexCount, setIndexCount] = useState(0);
  const [clientAuthorizationCount, setClientAuthorizationCount]  = useState(0);
  useEffect(() => {
    getCollectionsCount().then((res) => setCollectionCount(res));
    getIndexesCount().then((res) => setIndexCount(res));
    getClientAuthorizationCount().then((res)=>setClientAuthorizationCount(res))
  }, []);
  const { t } = useTranslation();

  return (
    <UsageCardStyled id="activity" title={t('dynamoplus.usage.title')} padding={0}>
      <Row gutter={[30, 30]}>
        <Col
              id={"collection-count"}
              xs={12}
              md={8}
            >
        <UsageCard name={t('dynamoplus.common.collection')}
          value={collectionCount} color={'success'} Icon={DatabaseOutlined} />
            </Col>
            <Col
              id={"index-count"}
              xs={12}
              md={8}
            >
        
        
        <UsageCard name={t('dynamoplus.common.index')}
          value={indexCount} color={'success'} Icon={FileSearchOutlined} />
            </Col>
            <Col
              id={"index-count"}
              xs={12}
              md={8}
            >
        <UsageCard name={t('dynamoplus.common.client_authorization')}
          value={clientAuthorizationCount} color={'success'} Icon={LaptopOutlined} />
            </Col>
            </Row>
            
      {/* <UsageChart data={[collectionCount,indexCount,clientAuthorizationCount]} /> */}
    </UsageCardStyled>
  );
};

const UsageCardStyled = styled(Card)`
  
`;
