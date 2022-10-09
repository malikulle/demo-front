import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import SelectInputModel from "../../../models/action/SelectInputModel";
import Permission from "../../../models/membership/permission/Permission";
import Role from "../../../models/membership/role/Role";
import Dynamic from "../../../service/base/Dynamic";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormInputSelect from "../../common/Form/FormInputSelect";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import ServiceMessage from "../../common/ServiceMessage";
import Sidebar from "../../common/Sidebar";

const UpdateRole: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/membership/UpdateRole", "");

  const [role, setRole] = useState<Role>(new Role());
  const [permissions, setPermissions] = useState<SelectInputModel[]>([]);
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      role.name = values.name;
      const { data } = await service.Membership.updateRole(role);
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
        setRole(data.data);
      }
    } catch (error) {}
  };

  const onChange = (checked: boolean) => {
    if (checked) {
      setRole((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setRole((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };

  const onPermissionChange = (value: number[]) => {
    setRole((previousState) => ({
      ...previousState,
      permissions: value,
    }));
  };

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateRole()));
  }, [dispatch]);

  useEffect(() => {
    const getPermission = async () => {
      const service = new BaseService();
      const { data } = await service.Membership.getRole(Number(params.id));
      if (!data.hasFailed && data.data) {
        setRole(data.data);
      } else {
        navigate("/membership/roleList");
      }
    };
    if (Number(params.id) > 0) {
      getPermission();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", role.name);
    form.setFieldValue("permissions", role.permissions);
  }, [role, form]);

  useEffect(() => {
    const getPermissons = async () => {
      try {
        const service = new BaseService();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const { data } = await service.Membership.getPermissions(
          new Permission(),
          dynamic
        );
        if (!data.hasFailed && data.data) {
          setPermissions(data.data.items);
        }
      } catch (error) {}
    };
    getPermissons();
  }, []);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Membership" table="RoleList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/membership/roleList")}
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
              ...role,
            }}
          >
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterPermissionName")}
              rules={[{ required: true, message: t("PermissionNameRequired") }]}
            />
            <FormInputSelect
              name="permissions"
              label={t("PermissinID")}
              placeholder=""
              mode="multiple"
              onChange={onPermissionChange}
              rules={[]}
              items={permissions}
              defaultValue={role.permissions}
            />
            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={role.statusID === 1}
              onChange={onChange}
              show={role.id > 0}
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

export default UpdateRole;
