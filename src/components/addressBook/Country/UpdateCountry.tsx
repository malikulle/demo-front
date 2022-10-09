import { Button,  Form,  notification } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Country from "../../../models/addressbook/country/Country";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import ServiceMessage from "../../common/ServiceMessage";

const UpdateCountry: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/AddressBook/UpdateCountry","");

  const [country, setCountry] = useState<Country>(new Country());
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      country.name = values.name;
      country.codeISO = values.codeISO
      country.codeISO3 = values.codeISO3
      country.phoneCode = values.phoneCode
      const { data } = await service.AddressBook.updateCountry(country);
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
        setCountry(data.data);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setCountry((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setCountry((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdatePermission()));
  }, [dispatch]);

  useEffect(() => {
    const getCountry = async () => {
      const service = new BaseService();
      const { data } = await service.AddressBook.getCountry(Number(params.id));
      if (!data.hasFailed && data.data) {
        setCountry(data.data);
      } else {
        navigate("/addressBook/countryList");
      }
    };
    if (Number(params.id) > 0) {
      getCountry();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", country.name);
    form.setFieldValue("codeISO", country.codeISO);
    form.setFieldValue("codeISO3", country.codeISO3);
    form.setFieldValue("phoneCode", country.phoneCode);
  }, [country, form]);

  return (
    <>
      <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
        <Button
          type="link"
          onClick={() => navigate("/addressBook/countryList")}
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
          ...country,
        }}
      >
        <FormItemInput
          name="name"
          label={t("Name")}
          placeholder={t("EnterCountryName")}
          rules={[{ required: true, message: t("CountryNameRequired") }]}
        />
        <FormItemInput
          name="codeISO"
          label={t("CodeISO")}
          placeholder={t("EnterCodeISO")}
          rules={[{ required: true, message: t("CountryCodeISORequired") }]}
        />
        <FormItemInput
          name="codeISO3"
          label={t("CodeISO3")}
          placeholder={t("EnterCodeISO3")}
          rules={[{ required: true, message: t("CountryCodeISO3Required") }]}
        />
        <FormItemInput
          name="phoneCode"
          label={t("PhoneCode")}
          placeholder={t("EnterPhoneCode")}
          rules={[{ required: true, message: t("PhoneCodeRequired") }]}
        />
        <FormItemCheckbox
          label={t("StatusID")}
          name="statusID"
          checked={country.statusID === 1}
          onChange={onStatusIDChange}
          show={country.id > 0}
        />
        <FormItemButton
          style={{ textAlign: "center" }}
          type="primary"
          htmlType="submit"
          buttonText={t("Submit")}
          loading={loading}
        />
      </Form>
    </>
  );
};

export default UpdateCountry;
