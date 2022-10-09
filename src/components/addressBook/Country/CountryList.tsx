import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import Sidebar from "../../common/Sidebar";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import CountryTable from "./CountryTable";

const CountryList: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getCountryList()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="AddressBook" table="CountryList" />
      </Col>
      <Col span={19}>
        <CountryTable />
      </Col>
    </Row>
  );
};

export default CountryList;
