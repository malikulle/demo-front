import { Button, List } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../../hooks/useTypeSelector";

const BasketDetail: React.FC = () => {
  const { currentUserBasket } = useTypedSelector((x) => x.currentUserBasket);
  const { t } = useTranslation();
  return (
    <List
      style={{ marginLeft: "10px" }}
      header={<div>{t("Summary")}</div>}
      footer={
        <Button type="primary" block>
          {t("ChechoutBasket")}
        </Button>
      }
      bordered
    >
      <List.Item>
        {t("BasketPrice")} : {currentUserBasket.basketPrice.toFixed(2)}
      </List.Item>
      <List.Item>
        {t("TaxPrice")} : {currentUserBasket.taxPrice.toFixed(2)}
      </List.Item>
      <List.Item>
        {t("ShippingPrice")} : {currentUserBasket.shippingPrice.toFixed(2)}
      </List.Item>
      <List.Item>
        {t("TotalPrice")} : {currentUserBasket.totalPrice.toFixed(2)}
      </List.Item>
    </List>
  );
};

export default BasketDetail;
