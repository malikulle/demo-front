import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import User from "../../../models/membership/user/User";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import Sidebar from "../../common/Sidebar";
import ServiceMessage from "../../common/ServiceMessage";
import FormItemInput from "../../common/Form/FormItemInput";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemButton from "../../common/Form/FormItemButton";
import Role from "../../../models/membership/role/Role";
import FormInputSelect from "../../common/Form/FormInputSelect";
import SelectInputModel from "../../../models/action/SelectInputModel";
import FormFileUpload from "../../common/Form/FormFileUpload";
import { useApiProgress } from "../../../hooks/useApiProgress";
import Dynamic from "../../../service/base/Dynamic";

const UpdateUser: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/membership/UpdateUser", "");

  const [user, setUser] = useState<User>(new User());
  const [roles, setRoles] = useState<SelectInputModel[]>([]);
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);
  const [file, setFile] = useState<any>();

  const onFinish = async (values: any) => {
    try {
      user.name = values.name;
      user.surname = values.surname;
      user.isGlobalAdmin = values.isGlobalAdmin;
      user.roleID = values.roleID;
      user.emailAddress = values.emailAddress;
      user.statusID = values.statusID;
      if (user.id === 0) {
        user.password = values.password;
      }

      const service = new BaseService();
      const { data } = await service.Membership.updateUser(user, file);
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
        setUser(data.data);
        setFile(null);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setUser((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setUser((previousState) => ({ ...previousState, statusID: 0 }));
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
      const { data } = await service.Membership.deleteUserImagePath(user.id);
      if (!data.hasFailed && data.data) {
        setUser((previousState) => ({
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
    form.setFieldValue("name", user.name);
    form.setFieldValue("surname", user.surname);
    form.setFieldValue("emailAddress", user.emailAddress);
    form.setFieldValue("isGlobalAdmin", user.isGlobalAdmin);
    form.setFieldValue("statusID", user.statusID);
    form.setFieldValue("roleID", user.roleID);
  }, [user, form]);

  useEffect(() => {
    const getUser = async () => {
      const service = new BaseService();
      const { data } = await service.Membership.getUser(Number(params.id));
      if (!data.hasFailed && data.data) {
        setUser(data.data);
      } else {
        navigate("/membership/userList");
      }
    };
    if (Number(params.id) > 0) {
      getUser();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const service = new BaseService();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const { data } = await service.Membership.getRoles(new Role(), dynamic);
        if (!data.hasFailed && data.data) {
          setRoles(data.data.items);
        }
      } catch (error) {}
    };
    getRoles();
  }, []);

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateUser()));
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Membership" table="UserList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/membership/userList")}
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
              ...user,
            }}
          >
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterName")}
              rules={[{ required: true, message: t("NameRequired") }]}
            />
            <FormItemInput
              name="surname"
              label={t("Surname")}
              placeholder={t("EnterSurname")}
              rules={[{ required: true, message: t("SurnameRequired") }]}
            />
            <FormItemInput
              name="emailAddress"
              label={t("EmailAddress")}
              placeholder={t("EnterEmailAddress")}
              rules={[{ required: true, message: t("EmailAddressRequired") }]}
            />
            {user.id === 0 && (
              <FormItemInput
                name="password"
                label={t("Password")}
                placeholder={t("EnterPassword")}
                rules={[{ required: true, message: t("PasswordRequired") }]}
              />
            )}

            <FormInputSelect
              name="roleID"
              label={t("RoleID")}
              placeholder=""
              rules={[]}
              items={roles}
              defaultValue={user.roleID}
            />
            <FormFileUpload
              name="ImagePath"
              label={t("ImagePath")}
              placeholder={t("EnterImage")}
              rules={[]}
              type="file"
              onChange={onChangeFile}
              imagePath={user.imagePath}
              onRemoveClick={remevoFile}
            />

            <FormItemCheckbox
              label={t("IsGlobalAdmin")}
              name="isGlobalAdmin"
              checked={user.isGlobalAdmin}
              show={true}
              onChange={(checked: boolean) =>
                setUser((previousState) => ({
                  ...previousState,
                  isGlobalAdmin: checked,
                }))
              }
            />
            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={user.statusID === 1}
              onChange={onStatusIDChange}
              show={user.id > 0}
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

export default UpdateUser;
