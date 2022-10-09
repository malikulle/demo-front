import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Parameter from "../../../models/configuration/paramater/Parameter";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import ServiceMessage from "../../common/ServiceMessage";
import Sidebar from "../../common/Sidebar";

const UpdateParameter: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/configuration/UpdateParameter","");

  const [parameter, setParameter] = useState<Parameter>(new Parameter());
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      parameter.name = values.name;
      parameter.module = values.module;
      parameter.value = values.value;
      const { data } = await service.Configuration.updateParameter(parameter);
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
        setParameter(data.data);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setParameter((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setParameter((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdatePermission()));
  }, [dispatch]);

  useEffect(() => {
    const getParameter = async () => {
      const service = new BaseService();
      const { data } = await service.Configuration.getParameter(
        Number(params.id)
      );
      if (!data.hasFailed && data.data) {
        setParameter(data.data);
      } else {
        navigate("/configuration/parameterList");
      }
    };
    if (Number(params.id) > 0) {
      getParameter();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", parameter.name);
    form.setFieldValue("module", parameter.module);
    form.setFieldValue("value", parameter.value);
  }, [parameter, form]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Congfiguration" table="ParameterList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/configuration/parameterList")}
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
              ...parameter,
            }}
          >
            <FormItemInput
              name="module"
              label={t("Module")}
              placeholder={t("EnterModuleName")}
              rules={[{ required: true, message: t("ModuleNameRequired") }]}
            />
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterParameterName")}
              rules={[{ required: true, message: t("ParameterNameRequired") }]}
            />
            <FormItemInput
              name="value"
              label={t("Value")}
              placeholder={t("EnterParameterValue")}
              rules={[{ required: true, message: t("ParameterValueRequired") }]}
            />

            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={parameter.statusID === 1}
              onChange={onStatusIDChange}
              show={parameter.id > 0}
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

export default UpdateParameter;
