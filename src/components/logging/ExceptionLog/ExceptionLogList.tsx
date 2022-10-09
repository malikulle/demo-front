import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import Sidebar from "../../common/Sidebar";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import ExceptionLogTable from "./ExceptionLogTable";

const ExceptionLogList: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getExceptionLogList()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Logging" table="ExceptionLogList" />
      </Col>
      <Col span={19}>
        <ExceptionLogTable />
      </Col>
    </Row>
  );
};

export default ExceptionLogList;
