import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './CreateCollectionForm.styles';
import { Modal } from '@app/components/common/Modal/Modal';
import { CollectionAttributeType, createCollection } from '@app/api/dynamoplus/mocks/system.api';

interface CreateCollectionFormProps {
  isVisible: boolean;
  onSubmitted: () => void;
  onCanceled: () => void;
}

export const CreateCollectionForm: React.FC<CreateCollectionFormProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [form] = BaseButtonsForm.useForm();
  const { t } = useTranslation();
  const isModalVisible = props.isVisible;

  const onSubmit = props.onSubmitted;
  const onCancel = props.onCanceled;

  const onFinish = ({
    collectionName,
    idKey,
    orderingKey,
    attributes,
  }: {
    collectionName: string;
    idKey: string;
    orderingKey: string;
    attributes: { attributeName: string; attributeType: CollectionAttributeType }[];
  }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const collectionAttribtues = attributes
        ? attributes
            .filter((a) => a != undefined)
            .filter((a) => a.attributeName && a.attributeType)
            .map((a) => {
              return {
                name: a.attributeName,
                type: a.attributeType,
              };
            })
        : [];
      createCollection({
        name: collectionName,
        orderingKey: orderingKey,
        idKey: idKey,
        attributes: collectionAttribtues,
      });
      notificationController.success({ message: t('common.success') });
    }, 1000);
  };

  const attributeTypes = [
    CollectionAttributeType.ARRAY,
    CollectionAttributeType.BOOLEAN,
    CollectionAttributeType.DATE,
    CollectionAttributeType.NUMBER,
    CollectionAttributeType.OBJECT,
    CollectionAttributeType.STRING,
  ];

  return (
    <Modal
      title={t('dynamoplus.collection.createForm.title')}
      centered
      visible={isModalVisible}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      size="large"
      okText={t('dynamoplus.collection.createForm.submit')}
      onOk={() => {
        form.validateFields();
        onFinish(form.getFieldsValue());
        form.resetFields();
        onSubmit();
      }}
      cancelText={t('dynamoplus.collection.createForm.cancel')}
    >
      <BaseButtonsForm
        form={form}
        isFieldsChanged={false}
        name="dynamicForm"
        loading={isLoading}
        onFinish={onFinish}
        autoComplete="off"
      >
        <BaseButtonsForm.Item
          label={t('dynamoplus.collection.createForm.collectionName')}
          name="collectionName"
          rules={[{ required: true, message: t('dynamoplus.collection.createForm.collectionNameError') }]}
        >
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label={t('dynamoplus.collection.createForm.idKey')}
          name="idKey"
          rules={[{ required: true, message: t('dynamoplus.collection.createForm.idKeyError') }]}
        >
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label={t('dynamoplus.collection.createForm.orderingKey')} name="orderingKey">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row key={field.key} wrap={false} gutter={[10, 10]} align="middle" justify="space-between">
                  <Col span={6}>
                    <BaseButtonsForm.Item
                      noStyle
                      // eslint-disable-next-line
                      shouldUpdate={(prevValues: any, curValues: any) =>
                        prevValues.attribute_name !== curValues.attribute_name ||
                        prevValues.attribute_type !== curValues.attribute_type
                      }
                    >
                      {() => (
                        <BaseButtonsForm.Item
                          {...field}
                          label={t('dynamoplus.collection.createForm.attributeTypes')}
                          name={[field.name, 'attributeType']}
                          fieldKey={[field.key, 'attributeType']}
                          rules={[
                            { required: true, message: t('dynamoplus.collection.createForm.attributeTypeError') },
                          ]}
                        >
                          <Select>
                            {attributeTypes.map((item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        </BaseButtonsForm.Item>
                      )}
                    </BaseButtonsForm.Item>
                  </Col>
                  <Col span={12}>
                    <BaseButtonsForm.Item
                      {...field}
                      label={t('dynamoplus.collection.createForm.attributeNames')}
                      name={[field.name, 'attributeName']}
                      fieldKey={[field.key, 'attributeName']}
                      rules={[{ required: true, message: t('dynamoplus.collection.createForm.attributeNameError') }]}
                    >
                      <S.Wrapper>
                        <Input />
                        <S.RemoveBtn onClick={() => remove(field.name)} />
                      </S.Wrapper>
                    </BaseButtonsForm.Item>
                  </Col>
                </Row>
              ))}
              <BaseButtonsForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t('dynamoplus.collection.createForm.addAttribute')}
                </Button>
              </BaseButtonsForm.Item>
            </>
          )}
        </BaseButtonsForm.List>
      </BaseButtonsForm>
    </Modal>
  );
};
