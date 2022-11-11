import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

import { Usage } from '@app/components/dynamoplus/dynamoplus-dashboard/Usage/Usage';

const DynamoplusDashboardPage: React.FC = () => {
  // const { isDesktop } = useResponsive();

  return (
    <>
      <PageTitle>DynamoPlus</PageTitle>
      {/* {isDesktop ? desktopLayout : mobileAndTabletLayout} */}
      <Usage />
    </>
  );
};

export default DynamoplusDashboardPage;
