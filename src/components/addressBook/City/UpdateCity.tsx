import { Button, Col, Form, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import City from "../../../models/addressbook/city/City";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import ServiceMessage from "../../common/ServiceMessage";
import Sidebar from "../../common/Sidebar";

const UpdateCity: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/AddressBook/UpdateCity","");

  const [searchParams] = useSearchParams();
  const [city, setCity] = useState<City>(new City());
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const getCountryID = () => {
    if (city.countryID > 0) {
      return city.countryID;
    } else if (Number(searchParams.get("countryID")) > 0) {
      return Number(searchParams.get("countryID"));
    } else {
      return 0;
    }
  };

  const onClickBack = () => {
    navigate(`/addressBook/updateCountry/${getCountryID().toString()}`);
  };

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      city.name = values.name;
      city.plateCode = values.plateCode;
      city.countryID = getCountryID();
      const { data } = await service.AddressBook.updateCity(city);
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
        setCity(data.data);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setCity((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setCity((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdatePermission()));
  }, [dispatch]);

  useEffect(() => {
    const getCity = async () => {
      const service = new BaseService();
      const { data } = await service.AddressBook.getCity(Number(params.id));
      if (!data.hasFailed && data.data) {
        setCity(data.data);
      } else {
        navigate("/addressBook/countryList");
      }
    };
    if (Number(params.id) > 0) {
      getCity();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", city.name);
    form.setFieldValue("plateCode", city.plateCode);
  }, [city, form]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="AddressBook" table="CountryList" />
      </Col>
      <Col span={19}>
        <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
          <Button type="link" onClick={() => onClickBack()}>
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
            ...city,
          }}
        >
          <FormItemInput
            name="name"
            label={t("Name")}
            placeholder={t("EnterCityName")}
            rules={[{ required: true, message: t("CityNameRequired") }]}
          />
          <FormItemInput
            name="plateCode"
            label={t("PlateCode")}
            placeholder={t("EnterPlateCode")}
            rules={[{ required: true, message: t("PlateCodeRequired") }]}
          />
          <FormItemCheckbox
            label={t("StatusID")}
            name="statusID"
            checked={city.statusID === 1}
            onChange={onStatusIDChange}
            show={city.id > 0}
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
  );
};

export default UpdateCity;
