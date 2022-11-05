import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Collection } from '@app/api/dynamoplus/mocks/system.api';
import { Dates } from '@app/constants/Dates';
import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
import * as S from './CollectionItem.styles';
import { Avatar, Group } from '@app/components/common/Avatar/Avatar';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { notificationController } from '@app/controllers/notificationController';
import { Button } from '@app/components/common/buttons/Button/Button.styles';
import { MinusCircleOutlined,SearchOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export const CollectionItemItem: React.FC<Collection> = ({ name,id_key, ordering_key,auto_generated_id,attributes }) => {
  const { t } = useTranslation();

  const currentStatus = activityStatuses.find((configStatus) => configStatus.name === status);

  return (
    
    <Row gutter={[10, 20]} align={'middle'}>
      <Col span={10}>
        <Button type='link' icon={<SearchOutlined />}>
        <Link to={'/dynamoplus/collections/'+name}>{name}</Link></Button>
        {/* <S.Title>{name}</S.Title> */}
      </Col>
      {/* <Col span={5}>
        <Button
              type='default'
              size='small'
              icon={<SearchOutlined />}
              onClick={() => {
                notificationController.info({ message: t('tables.inviteMessage', { name: name }) });
              }}
            />
            <Button type='primary' danger size='small'  icon={<MinusCircleOutlined />} />
      </Col> */}
      
    </Row>
  );
};
