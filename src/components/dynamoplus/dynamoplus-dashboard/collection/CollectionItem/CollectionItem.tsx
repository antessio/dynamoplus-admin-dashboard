import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Collection } from '@app/api/dynamoplus/mocks/system.api';
import { Button } from '@app/components/common/buttons/Button/Button.styles';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export const CollectionItemItem: React.FC<Collection> = ({ name }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={[10, 20]} align={'middle'}>
      <Col span={10}>
        <Button type="link" icon={<SearchOutlined />}>
          <Link to={'/dynamoplus/collections/' + name}>{name}</Link>
        </Button>
      </Col>
    </Row>
  );
};
