import { Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { UserLoginRequest } from "../../models/membership/userLoginRequest";
import BaseService from "../../service/BaseService";
import { userLogin } from "../../store/actions/membershipActions";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { ServiceResultMessage } from "../../service/base/serviceObjectResult";
import ServiceMessage from "../common/ServiceMessage";
import { useNavigate } from "react-router-dom";
import FormItemInput from "../common/Form/FormItemInput";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../../hooks/useApiProgress";
const Login: React.FC = () => {
  const service = new BaseService();

  const loading = useApiProgress("post", "/api/membership/Login", "");

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  useEffect(() => {
    if (service.Authentication.isAuthenticate()) {
      navigate("/");
    }
  }, [navigate, service.Authentication]);

  const onFinish = async (values: any) => {
    const model = new UserLoginRequest();
    model.email = values.email;
    model.password = values.password;
    const { data } = await service.Membership.login(model);
    if (!data.hasFailed) {
      dispatch(userLogin(data.data));
      navigate("/");
    }
    if (data.messages.length > 0) {
      setMessages(data.messages);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {messages.map((message, i) => (
        <ServiceMessage Message={message} key={i} />
      ))}
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormItemInput
          label={t("Email")}
          name="email"
          placeholder=""
          rules={[{ required: true, message: t("EmailRequired") }]}
        />
        <Form.Item
          label={t("Password")}
          name="password"
          rules={[{ required: true, message: t("PasswordRequired") }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t("Submit")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
