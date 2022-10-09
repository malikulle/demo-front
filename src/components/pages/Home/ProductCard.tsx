import { AppstoreAddOutlined, FolderViewOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Product from "../../../models/catalog/product/Product";

const { Meta } = Card;

type ProductCardProp = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProp> = (props: ProductCardProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const clickToDetailPage = () => {
    navigate("/productDetail/" + props.product.id)
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      actions={[
        <AppstoreAddOutlined key={t("AddToBasket")} />,
        <FolderViewOutlined onClick={() => clickToDetailPage()} key={t("Detail")} />,
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
