import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Permission from "../../../models/membership/permission/Permission";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import ServiceMessage from "../../common/ServiceMessage";
import Sidebar from "../../common/Sidebar";

const UpdatePermission: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/membership/UpdatePermission","");


  const [permission, setPermission] = useState<Permission>(new Permission());
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      permission.name = values.name;
      const { data } = await service.Membership.updatePermission(permission);
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
        setPermission(data.data);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setPermission((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setPermission((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdatePermission()));
  }, [dispatch]);

  useEffect(() => {
    const getPermission = async () => {
      const service = new BaseService();
      const { data } = await service.Membership.getPermission(
        Number(params.id)
      );
      if (!data.hasFailed && data.data) {
        setPermission(data.data);
      } else {
        navigate("/membership/permissionList");
      }
    };
    if (Number(params.id) > 0) {
      getPermission();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", permission.name);
  }, [permission, form]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Membership" table="PermissionList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/membership/permissionList")}
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
              ...permission,
            }}
          >
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterPermissionName")}
              rules={[{ required: true, message: t("PermissionNameRequired") }]}
            />
            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={permission.statusID === 1}
              onChange={onStatusIDChange}
              show={permission.id > 0}
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

export default UpdatePermission;
