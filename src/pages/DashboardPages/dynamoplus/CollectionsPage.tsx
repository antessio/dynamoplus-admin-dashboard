import React from 'react';
import { Col, Row } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useResponsive } from '@app/hooks/useResponsive';


import { CollectionsView } from '@app/components/dynamoplus/Collections/CollectionsView';

const DynamoplusDashboardPage: React.FC = () => {
  const { isDesktop } = useResponsive();

  const desktopLayout = (
    
            <CollectionsView />
  );

  const mobileAndTabletLayout = (
    <Row gutter={[20, 24]}>
    
      <Col span={24}>
        <CollectionsView />
      </Col>

    

    </Row>
  );

  return (
    <>
      <PageTitle>Collections</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default DynamoplusDashboardPage;
