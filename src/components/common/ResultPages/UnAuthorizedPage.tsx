import { Button, Result } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";

const UnAuthorizedPage: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goHome = () => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.setEmtpy()));
    navigate("/");
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle={t("UnAuthorizedPageMessage")}
      extra={
        <Button type="primary" onClick={goHome}>
          {t("BackHome")}
        </Button>
      }
    />
  );
};

export default UnAuthorizedPage;
