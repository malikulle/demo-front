import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import Language from "../../../models/configuration/language/Language";

const service = new BaseService();

const LanguageTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/configuration/GetLanguages", "");

  const [items, setItems] = useState<Language[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Language();
        const { data } = await service.Configuration.getLanguages(filter, dynamic);
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
  }, [dynamic]);

  return (
    <DynamicTable
      columns={["id", "name","cultureCode","isoCode"]}
      filterColumns={["id", "name","cultureCode","isoCode"]}
      sorterColumns={["id", "name","cultureCode","isoCode"]}
      items={items}
      loading={isLoading}
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
    />
  );
};

export default LanguageTable;
