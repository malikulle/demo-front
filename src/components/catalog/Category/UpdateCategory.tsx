import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Category } from "../../../models/catalog/category/Category";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import ServiceMessage from "../../common/ServiceMessage";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { useTranslation } from "react-i18next";
import FormItemInput from "../../common/Form/FormItemInput";
import FormLanguageSelect from "../../common/Form/FormLanguageSelect";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemButton from "../../common/Form/FormItemButton";
import { useApiProgress } from "../../../hooks/useApiProgress";

const service = new BaseService();

const UpdateCategory: React.FC = () => {
  const loading = useApiProgress("post", "/api/Catalog/UpdateCategory", "");

  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);
  const [category, setCateogory] = useState<Category>(new Category());
  const [languageID, setLanguageID] = useState<number>(
    service.Internationalization.getDefaultLanguageID()
  );

  const onFinish = async (values: any) => {
    try {
      category.name = values.name;
      const { data } = await service.Catalog.updateCategory(
        category,
        languageID
      );
      if (data.hasFailed) {
        setMessages(data.messages);
      } else {
        const successMessage = new ServiceResultMessage();
        successMessage.addSuccess(t("TransactionsComplated"));
        notification["success"]({
          message: t("Success"),
          description: t("TransactionsComplated"),
        });
        setMessages([successMessage]);
        setCateogory(data.data);
      }
    } catch (error) {}
  };

  const onChange = (checked: boolean) => {
    if (checked) {
      setCateogory((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setCateogory((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await service.Catalog.getCategory(Number(params.id));
        if (data.hasFailed || !data.data) {
          navigate("/catalog/categoryList");
        } else {
          setCateogory(data.data);
        }
      } catch (error) {}
    };
    if (Number(params.id) > 0) {
      getCategory();
    }
  }, [params, navigate]);

  useEffect(() => {
    form.setFieldValue("langugageID", languageID);
    form.setFieldValue(
      "name",
      service.Internationalization.getTranslationFor(
        category,
        languageID,
        "category_i18n",
        "name"
      )
    );
  }, [category, form, languageID]);

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateCategory()));
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Catalog" table="CategoryList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/catalog/categoryList")}
            >
              {t("BackToList")}
            </Button>
          </div>

          {messages.map((message, i) => (
            <ServiceMessage Message={message} key={i} />
          ))}
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...category,
              languageID: languageID,
            }}
          >
            <FormLanguageSelect
              defaultValue={languageID}
              onChange={(value: number) => setLanguageID(value)}
              show={category.id > 0}
            />
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder="Enter Category Name"
              rules={[
                { required: true, message: "Please input a category name" },
              ]}
            />
            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={category.statusID === 1}
              onChange={onChange}
              show={category.id > 0}
            />
            <FormItemButton
              style={{ textAlign: "center" }}
              type="primary"
              htmlType="submit"
              buttonText={t("Submit")}
              loading={loading}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UpdateCategory;
