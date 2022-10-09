import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import Sidebar from "../../common/Sidebar";
import CityTable from "../City/CityTable";
import UpdateCountry from "./UpdateCountry";

const EditCountry = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const params = useParams();

  const [id, setId] = useState<Number>(0);

  useEffect(() => {
    if (params.id) {
      setId(Number(params.id));
    }
  }, [params]);

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getUpdateCountry()));
  }, [dispatch]);

  return (
    <Row>
      <Col span={5}>
        <Sidebar schema="AddressBook" table="CountryList" />
      </Col>
      <Col span={19}>
        <Tabs defaultActiveKey="1" type="card" size="middle">
          <Tabs.TabPane tab={t("Definition")} key="1">
            <UpdateCountry />
          </Tabs.TabPane>
          {id > 0 && (
            <Tabs.TabPane tab={t("CityList")} key="2">
              <CityTable />
            </Tabs.TabPane>
          )}
        </Tabs>
      </Col>
    </Row>
  );
};

export default EditCountry;
