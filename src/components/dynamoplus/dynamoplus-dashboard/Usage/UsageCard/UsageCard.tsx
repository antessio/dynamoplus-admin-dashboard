import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { UsageInfo } from '../UsageInfo/UsageInfo';
import { StatisticsProgress } from '../UsageProgress/UsageProgress';
import { useResponsive } from '@app/hooks/useResponsive';
import { StatisticColor } from '@app/constants/config/statistics';
import * as S from './UsageCard.styles';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface DynamoPlusUsageCardProps {
  name: string;
  value: number;
  color: StatisticColor;
  Icon: React.FC;
}

export const UsageCard: React.FC<DynamoPlusUsageCardProps> = ({ name, value, color, Icon }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { isTablet: isTabletOrHigher } = useResponsive();

  const { t } = useTranslation();

  return (
    <S.StatisticCard padding="0.5rem" $color={color}>
      <Row wrap={false} gutter={[isTabletOrHigher ? 10 : 5, 0]}>
        <Col>
          <S.IconWrapper>
            <S.Icon component={Icon} />
          </S.IconWrapper>
        </Col>

        <Col flex={1}>
          <Row justify="space-between" align="middle" wrap={false}>
            <Col>
              <UsageInfo name={t(name)} value={value} />
            </Col>
          </Row>
        </Col>
      </Row>
    </S.StatisticCard>
  );
};
