import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Product from "../../../models/catalog/product/Product";
import BaseService from "../../../service/BaseService";
import ProductCard from "./ProductCard";

const TopViewProduct: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getTopViewProducts = async () => {
      const service = new BaseService();
      const { data } = await service.Catalog.getTopViewProducts(i18n.language);
      if (!data.hasFailed && data.data) {
        setProducts(data.data);
      }
    };
    getTopViewProducts();
  }, [i18n.language]);
  return (
    <>
      <Divider orientation="left">{t("TopViewProducts")}</Divider>
      <Row>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <Col span={6}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default TopViewProduct;
