import React, { useEffect, useState } from 'react';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import { Outlet, useLocation } from 'react-router-dom';

import { useResponsive } from '@app/hooks/useResponsive';
import { References } from '@app/components/common/References/References';

const MainLayout: React.FC = () => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop } = useResponsive();
  const location = useLocation();

  useEffect(() => {
    setIsTwoColumnsLayout(['/'].includes(location.pathname) && isDesktop);
  }, [location.pathname, isDesktop]);

  return (
    <S.LayoutMaster>
      <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
      <S.LayoutMain>
        <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}></MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>
            <Outlet />
          </div>
          {!isTwoColumnsLayout && <References />}
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
