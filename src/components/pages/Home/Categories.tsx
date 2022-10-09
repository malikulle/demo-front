import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Category } from "../../../models/catalog/category/Category";
import Dynamic from "../../../service/base/Dynamic";
import BaseService from "../../../service/BaseService";

type CategoriesProp = {
  setCategoryID: any;
};

const Categories: React.FC<CategoriesProp> = (props: CategoriesProp) => {
  const { i18n, t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const service = new BaseService();
        const filter = new Category();
        filter.statusID = 1;
        const dynamic = new Dynamic();
        dynamic.pageSize = 5;
        const { data } = await service.Catalog.getCategories(
          filter,
          dynamic,
          i18n.language
        );
        if (!data.hasFailed && data.data && data.data.items) {
          setCategories(data.data.items);
        }
      } catch (error) {}
    };
    getCategories();
  }, [i18n.language]);

  const onClick = (id: number) => {
    props.setCategoryID(id);
  };

  return (
    <List
      size="large"
      header={
        <div style={{ cursor: "pointer" }} onClick={() => onClick(0)}>
          {t("Categories")}
        </div>
      }
      bordered
      dataSource={categories}
      renderItem={(item) => (
        <List.Item
          style={{ cursor: "pointer" }}
          onClick={() => onClick(item.id)}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
};

export default Categories;
