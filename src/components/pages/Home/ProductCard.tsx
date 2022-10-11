import {
  AppstoreAddOutlined,
  FolderViewOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Card, Modal, notification } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Product from "../../../models/catalog/product/Product";
import BaseService from "../../../service/BaseService";
const { Meta } = Card;

type ProductCardProp = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProp> = (props: ProductCardProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clickToDetailPage = () => {
    navigate("/productDetail/" + props.product.id);
  };

  const handleClickBasket = () => {
    const service = new BaseService();
    if (!service.Authentication.isAuthenticate()) {
      Modal.error({
        title: t("Error"),
        content: t("YouHaveToLoginToAddToBasket"),
        okText: t("Ok"),
      });
      return;
    }
    Modal.confirm({
      title: t("AddToBasket"),
      icon: <WalletOutlined />,
      content: t("AreYouSureToAddBasket"),
      okText: t("Add"),
      cancelText: t("Cancel"),
      onOk: () => {
        addToBasket();
      },
    });
  };

  const addToBasket = async () => {
    try {
      const service = new BaseService();
      const { data } = await service.Sales.addToBasket(1, props.product.id);
      if (!data.hasFailed && data.data) {
        notification.success({
          message: t("Success"),
          description: t("ProductAddedToBasket"),
        });
      }
    } catch (error) {}
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      actions={[
        <AppstoreAddOutlined
          key={t("AddToBasket")}
          onClick={handleClickBasket}
        />,
        <FolderViewOutlined
          onClick={() => clickToDetailPage()}
          key={t("Detail")}
        />,
      ]}
      cover={
        <img
          height={300}
          alt={props.product.name}
          src={props.product.imagePath}
        />
      }
    >
      <Meta title={props.product.name} />
    </Card>
  );
};

export default ProductCard;
