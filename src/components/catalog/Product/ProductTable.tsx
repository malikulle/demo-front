import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import { useTranslation } from "react-i18next";
import Product from "../../../models/catalog/product/Product";
import { Category } from "../../../models/catalog/category/Category";
import ApiFilter from "../../../models/action/ApiFilter";

const service = new BaseService();

class DynamicProductFilter {
  dynamic: Dynamic = new Dynamic();
  filter: Product = new Product();
}

const ProductTable: React.FC = () => {
  const { i18n } = useTranslation();
  const isLoading = useApiProgress("post", "/api/Catalog/GetProducts", "");

  const [items, setItems] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamicProductFilter, setDynamicProductFilter] =
    useState<DynamicProductFilter>(new DynamicProductFilter());
  const [apiFilters, setApiFilters] = useState<ApiFilter[]>([]);

  const handleTableChange = (data: Dynamic, customFilter: any) => {
    var newFilter = new Product();
    if (
      customFilter &&
      customFilter["categoryName"] &&
      customFilter["categoryName"].length > 0
    ) {
      newFilter.categoryIDs = [];
      customFilter["categoryName"].forEach((item: string) => {
        newFilter.categoryIDs.push(Number(item));
      });
    }
    setDynamicProductFilter({
      dynamic: data,
      filter: newFilter,
    });
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await service.Catalog.getProducts(
          dynamicProductFilter.filter,
          dynamicProductFilter.dynamic,
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
  }, [dynamicProductFilter, i18n.language]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const service = new BaseService();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const filter = new Category();
        const { data } = await service.Catalog.getCategories(
          filter,
          dynamic,
          i18n.language
        );
        if (!data.hasFailed && data.data) {
          const apiFilter = new ApiFilter();
          apiFilter.name = "categoryName";
          apiFilter.idName = "categoryID";
          apiFilter.filterMultiple = true;
          apiFilter.filters = data.data.items.map((item) => ({
            text: item.name,
            value: item.id.toString(),
          }));
          setApiFilters((previousState) => [...previousState, apiFilter]);
        }
      } catch (error) {}
    };
    getCategories();
  }, [i18n.language]);

  return (
    <DynamicTable
      columns={["imagePath","id", "name", "price", "categoryName", "statusID"]}
      filterColumns={["id", "name", "price", "categoryName", "statusID"]}
      sorterColumns={["id", "name", "price"]}
      customFilters={["categoryName"]}
      apiFilters={apiFilters}
      items={items}
      loading={isLoading}
      createPath="/catalog/updateProduct/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/catalog/updateProduct"
    />
  );
};

export default ProductTable;
