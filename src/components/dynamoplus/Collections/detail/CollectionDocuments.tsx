import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tree } from 'antd';
import { DatabaseOutlined, SwitcherOutlined } from '@ant-design/icons';

import { DataNode } from 'antd/lib/tree';

interface CollectionDocumentsProps {
  documents: any[];
  collectionIdKey: string;
}
export const CollectionDocuments: React.FC<CollectionDocumentsProps> = (props) => {
  const { t } = useTranslation();

  const collectionIdKey = props.collectionIdKey;
  const documents = props.documents;
  const treeData: DataNode[] = documents
    .map((d) => Object(d))
    .map((d) => {
      const children = Object.keys(d)
        .filter((k) => k != collectionIdKey)
        .map((k) => renderDocumentFieldsAsDataNode(k, d[k], d[collectionIdKey]));
      return {
        title: 'id: ' + d[collectionIdKey],
        key: d[collectionIdKey],
        icon: <DatabaseOutlined />,
        children: children,
      };
    });

  return <Tree showIcon treeData={treeData} />;
};
const renderDocumentFieldsAsDataNode = (fieldKey: string, fieldValue: any, parentKey: string): DataNode => {
  if (fieldValue instanceof String || fieldValue instanceof Date) {
    return {
      title: fieldKey + ' : ' + fieldValue,
      key: parentKey + '_ ' + fieldKey,
    };
  } else if (Array.isArray(fieldValue)) {
    return {
      title: fieldKey,
      key: parentKey + '_ ' + fieldKey,
      icon: <SwitcherOutlined />,
      children: fieldValue.map((f, index) => {
        return renderDocumentFieldsAsDataNode(index + '', f, fieldKey);
      }),
    };
  } else if (typeof fieldValue == 'object') {
    return {
      title: fieldKey,
      key: parentKey + '_ ' + fieldKey,
      icon: <SwitcherOutlined />,
      children: Object.keys(fieldValue).map((k) => renderDocumentFieldsAsDataNode(k, Object(fieldValue)[k], fieldKey)),
    };
  } else if (fieldValue) {
    return {
      title: fieldKey + ' : ' + fieldValue,
      key: parentKey + '_ ' + fieldKey,
    };
  } else {
    return {
      title: '',
      key: parentKey + '_ ' + fieldKey,
    };
  }
};
