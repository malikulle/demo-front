import { Breadcrumb } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Breadcrumb as breadcrumb } from "../../models/action/Breadcrumb";

const CustomBreadcrumb: React.FC = () => {
  const { breadcrumbs } = useTypedSelector((state) => state.breadcrumb);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (item: breadcrumb) => {
    if (item.url) {
      navigate(item.url);
    }
  };

  if (breadcrumbs && breadcrumbs.length > 0) {
    return (
      <Breadcrumb style={{ margin: "16px 0" }}>
        {breadcrumbs.map((breadcrumb) => (
          <Breadcrumb.Item
            key={breadcrumb.order}
            onClick={() => handleClick(breadcrumb)}
          >
            <span style={{ cursor: "pointer" }}>{t(breadcrumb.name)}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
  return <></>;
};

export default CustomBreadcrumb;
