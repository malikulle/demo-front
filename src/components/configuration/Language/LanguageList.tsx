import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import LanguageTable from "./LanguageTable";

const LanguageList: React.FC = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getLanguageList()));
  }, [dispatch]);
  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Configuration" table="LanguageList" />
      </Col>
      <Col span={19}>
        <LanguageTable />
      </Col>
    </Row>
  );
};

export default LanguageList;
