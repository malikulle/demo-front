import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../../models/catalog/product/Product";
import BaseService from "../../../service/BaseService";
import { Button, Col, Form, Row, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import Sidebar from "../../common/Sidebar";
import ServiceMessage from "../../common/ServiceMessage";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import FormLanguageSelect from "../../common/Form/FormLanguageSelect";
import InternationalizationService from "../../../service/internationalizationService";
import FormItemInput from "../../common/Form/FormItemInput";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemButton from "../../common/Form/FormItemButton";
import { useApiProgress } from "../../../hooks/useApiProgress";
import FormItemTextArea from "../../common/Form/FormItemTextArea";
import FormFileUpload from "../../common/Form/FormFileUpload";
import Dynamic from "../../../service/base/Dynamic";
import { Category } from "../../../models/catalog/category/Category";
import FormInputSelect from "../../common/Form/FormInputSelect";

const internationalization = new InternationalizationService();

const UpdateProduct: React.FC = () => {
  const loading = useApiProgress("post", "/api/Catalog/UpdateProduct", "");

  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product>(new Product());
  const [categories, setCategories] = useState<Category[]>([]);
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);
  const [languageID, setLanguageID] = useState<number>(
    internationalization.getDefaultLanguageID()
  );
  const [file, setFile] = useState<any>();

  const onFinish = async (values: any) => {
    product.name = values.name;
    product.description = values.description;
    product.price = values.price;
    product.categoryID = values.categoryID;
    const service = new BaseService();
    const { data } = await service.Catalog.updateProduct(
      product,
      languageID,
      file
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
      setProduct(data.data);
      setFile(null);
    }
    try {
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setProduct((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setProduct((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };

  const onChangeFile = (event: any) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    setFile(file);
  };

  const remevoFile = async () => {
    try {
      const service = new BaseService();
      const { data } = await service.Catalog.deleteProductImagePath(product.id);
      if (!data.hasFailed && data.data) {
        setProduct((previousState) => ({
          ...previousState,
          imagePath: "",
        }));
        notification.success({
          message: t("Success"),
          description: t("FileDeleted"),
        });
      } else {
        notification.error({
          message: t("Error"),
          description: t("FileNotDeleted"),
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getProduct = async () => {
      const service = new BaseService();
      try {
        const { data } = await service.Catalog.getProduct(Number(params.id));
        if (!data.hasFailed && data.data) {
          setProduct(data.data);
        } else {
          navigate("/catalog/productList");
        }
      } catch (error) {}
    };
    if (Number(params.id) > 0) {
      getProduct();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("langugageID", languageID);
    form.setFieldValue(
      "name",
      internationalization.getTranslationFor(
        product,
        languageID,
        "product_i18n",
        "name"
      )
    );
    form.setFieldValue(
      "description",
      internationalization.getTranslationFor(
        product,
        languageID,
        "product_i18n",
        "description"
      )
    );
    form.setFieldValue("price", product.price);
    form.setFieldValue("categoryID", product.categoryID);
  }, [product, form, languageID]);

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateProduct()));
  }, [dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const service = new BaseService();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const filter = new Category();
        const { data } = await service.Catalog.getCategories(
          filter,
          dynamic,
          languageID
        );
        if (!data.hasFailed && data.data) {
          setCategories(data.data.items);
        }
      } catch (error) {}
    };
    getCategories();
  }, [languageID]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Catalog" table="ProductList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/catalog/productList")}
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
              ...product,
              languageID: languageID,
            }}
          >
            <FormLanguageSelect
              defaultValue={languageID}
              onChange={(value: number) => setLanguageID(value)}
              show={product.id > 0}
            />
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterProductName")}
              rules={[{ required: true, message: t("ProductNameRequired") }]}
            />
            <FormInputSelect
              name="categoryID"
              label={t("CategoryID")}
              placeholder=""
              rules={[{ required: true, message: t("CategoryRequired") }]}
              items={categories}
              defaultValue={product.categoryID}
            />
            <FormItemTextArea
              name="description"
              label={t("Description")}
              placeholder={t("EnterProductDescription")}
              rules={[]}
            />
            <FormItemInput
              name="price"
              type="number"
              label={t("Price")}
              placeholder={t("EnterProductPrice")}
              rules={[]}
            />
            <FormFileUpload
              name="imagePath"
              label={t("ImagePath")}
              placeholder={t("EnterImage")}
              rules={[]}
              type="file"
              onChange={onChangeFile}
              imagePath={product.imagePath}
              onRemoveClick={remevoFile}
            />
            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={product.statusID === 1}
              onChange={onStatusIDChange}
              show={product.id > 0}
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

export default UpdateProduct;
