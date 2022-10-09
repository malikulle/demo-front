import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import Sidebar from "../../common/Sidebar";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import JobTable from "./JobTable";

const JobList: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getJobList()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Configuration" table="JobList" />
      </Col>
      <Col span={19}>
        <JobTable />
      </Col>
    </Row>
  );
};

export default JobList;
