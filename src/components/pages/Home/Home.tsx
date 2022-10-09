import { Col, Divider, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { BreadcrumbMaker } from "../../../models/action/Breadcrumb";
import { addBreadcrumb } from "../../../store/actions/breadcrumbActions";
import { getProductList } from "../../../store/actions/catalogActions";
import Categories from "./Categories";
import CustomCarousel from "./CustomCarousel";
import ProductCard from "./ProductCard";
import TopViewProduct from "./TopViewProduct";

const Home: React.FC = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { productList } = useTypedSelector((state) => state.productList);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [categoryID, setCategoryID] = useState<number>(0);

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getHome()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductList(pageIndex, i18n.language, categoryID));
  }, [dispatch, i18n.language, pageIndex, categoryID]);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const onCategoryChange = (id: number) => {
    setPageIndex(1);
    setCategoryID(id);
  };

  return (
    <div>
      <CustomCarousel />
      <Divider orientation="left">{t("Products")}</Divider>
      <Row>
        <Col span={6}>
          <Categories setCategoryID={onCategoryChange} />
        </Col>
        <Col span={18}>
          <Row style={{ marginLeft: "10px" }}>
            {productList.items &&
              productList.items.map((product) => (
                <Col
                  key={product.id}
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
          </Row>
          <Pagination
            style={{ marginLeft: "20px" }}
            pageSize={productList.size}
            current={productList.index}
            total={productList.count}
            onChange={onPageChange}
          />
        </Col>
      </Row>
      <TopViewProduct />
    </div>
  );
};

export default Home;
