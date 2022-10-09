import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import { Category } from "../../../models/catalog/category/Category";
import { useTranslation } from "react-i18next";

const service = new BaseService();

const CategoryTable: React.FC = () => {
  const { i18n } = useTranslation();
  const isLoading = useApiProgress("post", "/api/Catalog/GetCategories", "");

  const [items, setItems] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Category();
        const { data } = await service.Catalog.getCategories(
          filter,
          dynamic,
          i18n.language
        );
        if (!data.hasFailed && data.data) {
          setItems(data.data.items);
          setPagination({
            current: data.data.index,
            total: data.data.count,
            pageSize: data.data.size,
          });
        }
      } catch (error) {}
    };
    getItems();
  }, [dynamic, i18n.language]);

  return (
    <DynamicTable
      columns={["id", "name", "statusID"]}
      filterColumns={["id", "name"]}
      sorterColumns={["id", "name"]}
      items={items}
      loading={isLoading}
      createPath="/catalog/updateCategory/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/catalog/updateCategory"
    />
  );
};

export default CategoryTable;
