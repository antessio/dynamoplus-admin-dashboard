import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collection as CollectionData, getCollection, getDocumentsByCollection } from '@app/api/dynamoplus/mocks/system.api';
import * as S from '../../dynamoplus-dashboard/collection/CollectionsCard.styles';
import { Tree, Descriptions } from 'antd';
import { CheckOutlined, CloseOutlined, DatabaseOutlined, SwitcherOutlined } from '@ant-design/icons';

import { TreeNode } from 'antd/lib/tree-select';
import { DataNode } from 'antd/lib/tree';
import {BASE_COLORS} from '@app/styles/themes/constants';

interface CollectionDetailViewProps {
  collectionName: string
}
export const CollectionsDetailView: React.FC<CollectionDetailViewProps> = (props) => {

  const [collection, setCollection] = useState<CollectionData>()
  const [documents, setDocuments] = useState<object[]>([])
  

  const { t } = useTranslation();
  
  useEffect(() => {
    
        getCollection(props.collectionName)
        .then((res)=>{
          setCollection(res)
          getDocumentsByCollection(props.collectionName).then((docRes=>{
            console.log(docRes)
            setDocuments(docRes)
          }))
  
      })
  }, []);
  const collectionIdKey = collection?.id_key || ''
  const treeData: DataNode[] = documents
  .map(d=>Object(d))
                .map(d=>{
                  const children = Object.keys(d).filter(k=>k!=collectionIdKey).map(k=>renderDocumentFieldsAsDataNode(k,d[k],d[collectionIdKey]))
                  return {
                    title: "id: "+d[collectionIdKey],
                    key: d[collectionIdKey],
                    icon: <DatabaseOutlined />,
                    children: children
                  }
                  
                })
  
  
    return (
    <S.Wrapper>
      <S.Title level={2}>{props.collectionName}</S.Title>
      <Descriptions title={t('dynamoplus.collection.description')}  bordered layout='vertical' size='small' >
        <Descriptions.Item label={t('dynamoplus.collection.id_key')} style={{backgroundColor: 'transparent'}}>
          <S.Title>{collection?.id_key}</S.Title>
        </Descriptions.Item>
        <Descriptions.Item label={t('dynamoplus.collection.auto_generated_id')} style={{backgroundColor: 'transparent'}}>
          {collection?.auto_generated_id?<CheckOutlined />:<CloseOutlined />}
        </Descriptions.Item>
        <Descriptions.Item label={t('dynamoplus.collection.ordering_key')} style={{backgroundColor: 'transparent'}}>
          <S.Title>{collection?.ordering_key}</S.Title>
        </Descriptions.Item>
        <Descriptions.Item label={t('dynamoplus.collection.attributes')} style={{backgroundColor: 'transparent'}}>
          <Descriptions layout='vertical' size='small' bordered>
            {collection?.attributes?.map(a=><Descriptions.Item label={a.name} style={{backgroundColor: 'transparent'}}><S.Title>{a.type}</S.Title></Descriptions.Item>)}
          </Descriptions>
        </Descriptions.Item>
      </Descriptions>
      {/* <p>{collection && JSON.stringify(collection)}</p> */}
    
      
      <Tree  showIcon
                treeData={treeData} />
      

    </S.Wrapper>
  );
};
const renderDocumentFieldsAsDataNode = (fieldKey: string, fieldValue:object, parentKey:string):DataNode =>{
  if(fieldValue instanceof String || fieldValue instanceof Date){
    return {
      title: fieldKey+" : "+fieldValue,
      key: parentKey+"_ "+fieldKey,
    }
  
  
  }else if(Array.isArray(fieldValue)){
    return {
      title: fieldKey,
      key: parentKey+"_ "+fieldKey,
      icon: <SwitcherOutlined/>,
      children: fieldValue
          .map((f,index)=>{
            return renderDocumentFieldsAsDataNode(index+"",f,fieldKey)
          })
    }
  
  } else if (typeof fieldValue == "object" ) {
    return {
      title: fieldKey,
      key: parentKey+"_ "+fieldKey,
      icon: <SwitcherOutlined/>,
      children: Object.keys(fieldValue).map(k=>renderDocumentFieldsAsDataNode(k,Object(fieldValue)[k],fieldKey))
    }
  }else if(fieldValue){
    return {
      title: fieldKey+" : "+fieldValue,
      key: parentKey+"_ "+fieldKey,
    }
  }else{
    return {
      title: '',
      key: parentKey+"_ "+fieldKey,
    }
  }
}
const renderDocumentFields = (fieldKey:string, fieldValue:string) => {
  if (Array.isArray(fieldValue)) {
      return <TreeNode
        key={fieldKey}
        icon={<SwitcherOutlined />}
        title={fieldKey} value={''}>
          {fieldValue.map((subItem, i) => <TreeNode
            key={fieldKey + "_" + i}
            icon={<SwitcherOutlined />}
            title={i} value={''}>
              {renderDocumentFields(fieldKey, subItem)}
          </TreeNode>)}
      </TreeNode>
  } else if (typeof fieldValue == "object") {
      return (<TreeNode key={fieldKey}
      icon={<SwitcherOutlined/>}
      title={fieldKey} value={''}>
              {
                  Object.keys(fieldValue).map(k =>
                      renderDocumentFields(k, fieldValue[k])
                  )
              }
          </TreeNode>
      )

  } else if (fieldValue) {
      return (<TreeNode
        key={fieldKey}
        icon={<SwitcherOutlined/>}
        title={fieldKey + " : " + fieldValue} value={''}>
      </TreeNode>)
  } else {
      return null;
  }
}