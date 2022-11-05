import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { CollectionItemItem } from './CollectionItem/CollectionItem';
import { Collection as CollectionData, getCollections } from '@app/api/dynamoplus/mocks/system.api';
import * as S from './CollectionsCard.styles';
import { DatabaseOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/buttons/Button/Button.styles';
import { Link } from 'react-router-dom';
import { Card } from '@app/components/common/Card/Card';

export const CollectionsCard: React.FC = () => {
  const [collections, setCollections] = useState<CollectionData[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    getCollections(10).then((res) => setCollections(res));
  }, []);

  const activityStory = useMemo(
    () =>
      collections
      .map((item, index) => (
        <Col key={index} span={24}>
          <CollectionItemItem {...item} />
        </Col>
      )),
    [collections],
  );

  return (
    <Card title={t('dynamoplus.collection.title')}>
    <S.Wrapper>
      <S.ActivityRow gutter={[26, 26]} align="middle">
        {activityStory}
      </S.ActivityRow>
      
    </S.Wrapper>
    <Button
    type='link'>
      <Link to={'/dynamoplus/collections/'}>{t('dynamoplus.collection.show_more')}</Link></Button>
    </Card>
  );
};



// import React, { useEffect, useMemo, useState,useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { CollectionItemItem } from './CollectionItem/CollectionItem';
// import { Collection, Collection as CollectionData, getCollections } from '@app/api/dynamoplus/mocks/system.api';
// import * as S from './Collection.styles';
// import { Table } from 'components/common/Table/Table';
// import { Col, Row, Space, TablePaginationConfig } from 'antd';
// import { BasicTableRow,CollectionTableRow,InfinitePagination, Tag } from 'api/table.api';
// import { useMounted } from '@app/hooks/useMounted';
// import { Button } from 'components/common/buttons/Button/Button';
// import { notificationController } from 'controllers/notificationController';
// import { Avatar, Group } from '@app/components/common/Avatar/Avatar';
// import { ColumnsType } from 'antd/es/table';
// import { BASE_COLORS } from '@app/styles/themes/constants';

// const initialPagination: InfinitePagination = {
//   has_more: true,
//   limit: 20
// }
// export const CollectionView: React.FC = () => {
//   const [story, setStory] = useState<CollectionData[]>([]);
//   const [tableData, setTableData] = useState<{ data: CollectionTableRow[]; pagination: InfinitePagination; loading: boolean }>({
//     data: [],
//     pagination: initialPagination,
//     loading: false,
//   });

//   const { t } = useTranslation();
//   const { isMounted } = useMounted();
//   const fetch = useCallback(
//     (pagination: InfinitePagination) => {
//       setTableData((tableData) => ({ ...tableData, loading: true }));
//       getCollections(pagination.lastKey,pagination.limit)
//       .then((res) => {
//         if (isMounted.current) {
          
//           setTableData({ data: res.map((c: Collection):CollectionTableRow=>{
//             return {
//               id_key: c.id_key,
//               name: c.name,
//               autogenerated_id: c.auto_generated_id,
//               attributes: c.attributes.map(a=>a.name+" ("+a.type+")")
//             }
              

            
//           }), pagination: {
//             has_more: res.length==pagination.limit
//           }, loading: false });
//         }
//       });
//     },
//     [isMounted],
//   );
  

//   const columns: ColumnsType<BasicTableRow> = [
//     {
//       dataIndex: 'avatar',
//       render: (text: string, record: BasicTableRow) => {
//         return  <Avatar size={"large"} style={{ backgroundColor: BASE_COLORS.skyblue }}>{record.name.charAt(0).toUpperCase()}</Avatar>

//       }
//     },
//     {
//       title: t('common.name'),
//       dataIndex: 'name'
//     },
//     {
//       title: t('dynamoplus.collection.id_key'),
//       dataIndex: 'id_key',
//     },
//     {
//       title: t('dynamoplus.collection.auto_generated_id'),
//       dataIndex: 'auto_generated_id',
//       render: (auto_generated_id)=>{
//         return auto_generated_id?"X":"-"
//       }
//     },
//     {
//       title: t('dynamoplus.collection.attributes'),
//       key: 'attributes',
//       dataIndex: 'attributes',
//       render: (attributes: String[]) => (
//         <Row gutter={[10, 10]}>
//           {attributes.map((a: String) => {
//             return (
//               <Col key={a.trim()}>
//                 {a}
//               </Col>
//             );
//           })}
//         </Row>
//       ),
//     },
//     {
//       title: t('tables.actions'),
//       dataIndex: 'actions',
//       width: '15%',
//       render: (text: string, record: { name: string; key: number }) => {
//         return (
//           <Space>
//             <Button
//               type="ghost"
//               onClick={() => {
//                 notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
//               }}
//             >
//               {t('tables.invite')}
//             </Button>
//             {/* <Button type="default" danger onClick={() => handleDeleteRow(record.key)}>
//               {t('tables.delete')}
//             </Button> */}
//           </Space>
//         );
//       },
//     },
//   ];

//   useEffect(() => {
//     fetch(initialPagination);
//   }, [fetch]);

//   const handleTableChange = (pagination: InfinitePagination) => {
//     fetch(pagination);
//   };

//     return (
//     <S.Wrapper>
//       <S.Title level={2}>{t('dynamoplus.collections')}</S.Title>
//       <Table 
//       scroll={{ x: 800 }}
//       bordered
//       size='small'
//       pagination={false}
//       tableLayout="fixed"
//       columns={columns}
//       dataSource={tableData.data}
//       />
      

//     </S.Wrapper>
//   );
// };
