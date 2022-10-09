import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import Sidebar from "../../common/Sidebar";
import CatagoryTable from "./CatagoryTable";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";

const CategoryList: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getCategoryList()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Catalog" table="CategoryList" />
      </Col>
      <Col span={19}>
        <CatagoryTable />
      </Col>
    </Row>
  );
};

export default CategoryList;
