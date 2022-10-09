import { Button, Col, Divider, Image, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import Product from "../../../models/catalog/product/Product";
import BaseService from "../../../service/BaseService";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { InputNumber } from "antd";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState<Product>(new Product());

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getProductDetail()));
  }, [dispatch]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const service = new BaseService();
        const { data } = await service.Catalog.getProduct(Number(params.id));
        if (!data.hasFailed && data.data) {
          setProduct(data.data);
        } else {
          navigate("/");
        }
      } catch (error) {}
    };
    getProduct();
  }, [params.id, navigate, i18n.language]);

  const getDescription = () => {
    const service = new BaseService();
    const lang = i18n.language;
    const langID = service.Internationalization.getCurrentLanguageID(lang);
    return service.Internationalization.getTranslationFor(
      product,
      langID,
      "product_i18n",
      "description"
    );
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <Image src={product.imagePath} alt={product.name} style={{height:"500px"}} />
        </Col>
        <Col span={6}>
          <List bordered>
            <List.Item>
              {t("Price")} : {product.price}
            </List.Item>
            <List.Item>
              {t("Descipriton")} : {getDescription()}
            </List.Item>
            <List.Item>
              {t("Status")} : {t("InStock")}
            </List.Item>
            <List.Item>
              {t("Quantity")} :
              <InputNumber
                style={{ marginLeft: "10px" }}
                min={1}
                defaultValue={1}
              />
            </List.Item>
            <List.Item>
              <Button style={{ width: "100%" }} type="primary" shape="round">
                {t("AddToBasket")}
              </Button>
            </List.Item>
          </List>
        </Col>
      </Row>
      <Divider orientation="left">{t("Comments")}</Divider>
      <CommentList />
      <AddComment />
    </div>
  );
};

export default ProductDetail;
