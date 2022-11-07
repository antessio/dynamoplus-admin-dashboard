import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { Row, Typography } from 'antd';
import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  & > * {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
`;

export const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;

    font-weight: ${FONT_WEIGHT.semibold};

    font-size: ${FONT_SIZE.xs};
  }
`;

export const ActivityRow = styled(Row)`
  overflow-y: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
`;
