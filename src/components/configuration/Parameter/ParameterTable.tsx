import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import Parameter from "../../../models/configuration/paramater/Parameter";

const service = new BaseService();

const RoleTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/configuration/GetLanguages", "");

  const [items, setItems] = useState<Parameter[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Parameter();
        const { data } = await service.Configuration.getParameters(filter, dynamic);
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
      columns={["id","module" ,"name","value","statusID"]}
      filterColumns={["id","module" ,"name","value"]}
      sorterColumns={["id","module" ,"name","value"]}
      items={items}
      loading={isLoading}
      createPath="/configuration/updateParameter/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/configuration/updateParameter"
    />
  );
};

export default RoleTable;
