import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import Sidebar from "../../common/Sidebar";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import UserTable from "./UserTable";

const UserList: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUserList()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Membership" table="UserList" />
      </Col>
      <Col span={19}>
        <UserTable />
      </Col>
    </Row>
  );
};

export default UserList;
