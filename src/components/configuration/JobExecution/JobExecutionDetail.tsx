import { Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobExecution from "../../../models/configuration/jobExecution/JobExecution";
import BaseService from "../../../service/BaseService";
import moment from "moment";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
const JobExecutionDetail: React.FC = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();

  const [jobExecution, setJobExecution] = useState<JobExecution>(
    new JobExecution()
  );

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getJobExecutionList()));
  }, [dispatch]);

  useEffect(() => {
    const getJobExecutions = async () => {
      try {
        const service = new BaseService();
        const { data } = await service.Configuration.getJobExecution(
          Number(params.id)
        );
        if (!data.hasFailed && data.data) {
          setJobExecution(data.data);
        }
      } catch (error) {}
    };
    if (Number(params.id) > 0) {
      getJobExecutions();
    }
  }, [params.id]);

  const getDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY HH:ss");
    }
    return "";
  };

  return (
    <Timeline mode="left">
      {jobExecution &&
        jobExecution.logs &&
        jobExecution.logs.map((item, i) => (
          <Timeline.Item key={i} label={getDate(item.dateCreated)}>
            {item.description}
          </Timeline.Item>
        ))}
    </Timeline>
  );
};

export default JobExecutionDetail;
