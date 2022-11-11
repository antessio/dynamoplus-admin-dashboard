import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './CreateIndexForm.styles';
import { Modal } from '@app/components/common/Modal/Modal';
import { createIndex, IndexConfigurationType, CollectionAttributeType } from '@app/api/dynamoplus/mocks/system.api';

interface CreateIndexFormProps {
  isVisible: boolean;
  collectionName: string;
  collectionAttributes: { attributeName: string; attributeType: CollectionAttributeType }[];
  onSubmitted: () => void;
  onCanceled: () => void;
}

export const CreateIndexForm: React.FC<CreateIndexFormProps> = (props) => {
  const isModalVisible = props.isVisible;
  const collectionName = props.collectionName;
  const collectionAttributes = props.collectionAttributes;
  const [isLoading, setLoading] = useState(false);
  const [form] = BaseButtonsForm.useForm();
  const { t } = useTranslation();
  const onSubmit = props.onSubmitted;
  const onCancel = props.onCanceled;

  const onFinish = ({
    indexConfiguration,
    orderingKey,
    attributes,
  }: {
    indexConfiguration: IndexConfigurationType;
    orderingKey: string;
    attributes: { attributeName: string }[];
  }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      createIndex({
        collection: {
          name: collectionName,
        },
        configuration: indexConfiguration,
        orderingKey: orderingKey,
        conditions: attributes ? attributes.map((a) => a.attributeName) : [],
      });
      notificationController.success({ message: t('common.success') });
    }, 1000);
  };

  const indexConfigurations = [IndexConfigurationType.OPTIMIZE_READ, IndexConfigurationType.OPTIMIZE_WRITE];
  const isAttributeAvailable = (a: { attributeName: string; attributeType: CollectionAttributeType }) => {
    if (form.getFieldValue('attributes')) {
      const attributes = form.getFieldValue('attributes') as { attributeName: string }[];
      if (
        attributes &&
        attributes.filter((attribute) => attribute).find((attribute) => attribute.attributeName == a.attributeName)
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <BaseButtonsForm
      form={form}
      isFieldsChanged={false}
      name="dynamicForm"
      loading={isLoading}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Modal
        title={t('dynamoplus.index.modals.createIndex.title')}
        centered
        visible={isModalVisible}
        onCancel={() => onCancel()}
        size="large"
        footer={[
          <Button
            key="back"
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
          >
            {t('dynamoplus.index.modals.createIndex.cancel')}
          </Button>,
          <Button
            key="ok"
            onClick={() => {
              onFinish(form.getFieldsValue());
              form.resetFields();
              onSubmit();
            }}
          >
            {t('dynamoplus.index.modals.createIndex.submit')}
          </Button>,
        ]}
      >
        <BaseButtonsForm.Item
          label={t('dynamoplus.index.index_configuration')}
          name="indexConfiguration"
          rules={[{ required: true, message: t('dynamoplus.index.createForm.indexConfigurationError') }]}
        >
          <Select>
            {indexConfigurations.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label={t('dynamoplus.index.ordering_key')} name="orderingKey">
          <Select>
            {collectionAttributes &&
              collectionAttributes.map((item) => (
                <Option key={item.attributeName} value={item.attributeName}>
                  {item.attributeName} - {item.attributeType}
                </Option>
              ))}
          </Select>
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
                          label={t('dynamoplus.index.conditions')}
                          name={[field.name, 'attributeName']}
                          fieldKey={[field.key, 'attributeName']}
                          rules={[{ required: true, message: t('dynamoplus.index.createForm.conditionsTypeError') }]}
                        >
                          <Select>
                            {collectionAttributes
                              .filter((a) => isAttributeAvailable(a))
                              .map((item) => (
                                <Option key={item.attributeName} value={item.attributeName}>
                                  {item.attributeName} - {item.attributeType}
                                </Option>
                              ))}
                          </Select>
                        </BaseButtonsForm.Item>
                      )}
                    </BaseButtonsForm.Item>
                  </Col>
                  <Col span={12}>
                    <S.RemoveBtn onClick={() => remove(field.name)} />
                  </Col>
                </Row>
              ))}

              <BaseButtonsForm.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={collectionAttributes.filter((a) => isAttributeAvailable(a)).length == 0}
                >
                  {t('dynamoplus.index.createForm.addAttribute')}
                </Button>
              </BaseButtonsForm.Item>
            </>
          )}
        </BaseButtonsForm.List>
      </Modal>
    </BaseButtonsForm>
  );
};
