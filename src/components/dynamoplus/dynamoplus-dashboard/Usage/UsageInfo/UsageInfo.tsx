import React from 'react';
import { Space } from 'antd';
import * as S from './UsageInfo.styles';

interface UsageInfoProps {
  name: string;
  value: number;
}

export const UsageInfo: React.FC<UsageInfoProps> = ({ name, value }) => {
  return (
    <Space direction="vertical" size={6}>
      <S.Title>{name}</S.Title>
      <S.Text>{value}</S.Text>
    </Space>
  );
};
