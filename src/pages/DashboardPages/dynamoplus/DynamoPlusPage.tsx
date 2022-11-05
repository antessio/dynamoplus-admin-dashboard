import React from 'react';
import { Col, Row } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';

import { Usage } from '@app/components/dynamoplus/dynamoplus-dashboard/Usage/Usage';

import * as S from './DynamoPlusPages.style'
import { CollectionsCard } from '@app/components/dynamoplus/dynamoplus-dashboard/collection/CollectionsCard';

const DynamoplusDashboardPage: React.FC = () => {
  const { isDesktop } = useResponsive();

  const desktopLayout = (
    <Row gutter={[10,10]}>
      
          <Col span={24}>
            <Usage />
          
          </Col>
          <Col span={24}>
          <S.ScrollWrapper id="collection">
            <CollectionsCard />
          </S.ScrollWrapper>
          </Col>
        </Row>
      
  );

  const mobileAndTabletLayout = (
    <Row gutter={[20, 24]}>
      <Col span={24}>
        <Usage />
      </Col>
      <Col span={24}>
        <CollectionsCard />
      </Col>

    

    </Row>
  );

  return (
    <>
      <PageTitle>DynamoPlus</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default DynamoplusDashboardPage;
