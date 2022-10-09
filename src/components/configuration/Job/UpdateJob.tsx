import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Job from "../../../models/configuration/job/Job";
import { ServiceResultMessage } from "../../../service/base/serviceObjectResult";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import FormItemButton from "../../common/Form/FormItemButton";
import FormItemCheckbox from "../../common/Form/FormItemCheckbox";
import FormItemInput from "../../common/Form/FormItemInput";
import FormItemTextArea from "../../common/Form/FormItemTextArea";
import ServiceMessage from "../../common/ServiceMessage";
import Sidebar from "../../common/Sidebar";

const UpdateJob: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loading = useApiProgress("post", "/api/configuration/UpdateJob", "");

  const [job, setJob] = useState<Job>(new Job());
  const [messages, setMessages] = useState<ServiceResultMessage[]>([]);

  const onFinish = async (values: any) => {
    try {
      const service = new BaseService();
      job.name = values.name;
      job.description = values.description;
      const { data } = await service.Configuration.updateJob(job);
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
        setJob(data.data);
      }
    } catch (error) {}
  };

  const onStatusIDChange = (checked: boolean) => {
    if (checked) {
      setJob((previousState) => ({ ...previousState, statusID: 1 }));
    } else {
      setJob((previousState) => ({ ...previousState, statusID: 0 }));
    }
  };
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateJob()));
  }, [dispatch]);

  useEffect(() => {
    const getJob = async () => {
      const service = new BaseService();
      const { data } = await service.Configuration.getJob(Number(params.id));
      if (!data.hasFailed && data.data) {
        setJob(data.data);
      } else {
        navigate("/configuration/parameterList");
      }
    };
    if (Number(params.id) > 0) {
      getJob();
    }
  }, [params.id, navigate]);

  useEffect(() => {
    form.setFieldValue("name", job.name);
    form.setFieldValue("description", job.description);
  }, [job, form]);

  return (
    <>
      <Row>
        <Col span={5}>
          <Sidebar schema="Congfiguration" table="JobList" />
        </Col>
        <Col span={19}>
          <div style={{ marginBottom: "10px", border: "1px solid gray" }}>
            <Button
              type="link"
              onClick={() => navigate("/configuration/jobList")}
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
              ...job,
            }}
          >
            <FormItemInput
              name="name"
              label={t("Name")}
              placeholder={t("EnterJobName")}
              rules={[{ required: true, message: t("JobNameRequired") }]}
            />
            <FormItemTextArea
              name="description"
              label={t("Description")}
              placeholder={t("EnterJobDescription")}
              rules={[]}
            />

            <FormItemCheckbox
              label={t("StatusID")}
              name="statusID"
              checked={job.statusID === 1}
              onChange={onStatusIDChange}
              show={job.id > 0}
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

export default UpdateJob;
