import { Button, Result } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";

const NotFoundPage: React.FC = () => {
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
      status="404"
      title="404"
      subTitle={t("NotFoundPageMessage")}
      extra={
        <Button type="primary" onClick={goHome}>
          {t("BackHome")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
