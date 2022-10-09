import { Card, Col, Row, Statistic } from "antd";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../store/actions/breadcrumbActions";
import Sidebar from "../common/Sidebar";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Statistics: React.FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getDasboardStatistics()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="Dashboard" table="Statistics" />
      </Col>
      <Col span={19}>
      <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
      </Col>
    </Row>
  );
};

export default Statistics;
