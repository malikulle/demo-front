import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import ExceptionLog from "../../../models/logging/exceptionLog/ExceptionLog";

const service = new BaseService();

const ExceptionLogTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/Logging/GetExceptionLogs", "");

  const [items, setItems] = useState<ExceptionLog[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new ExceptionLog();
        const { data } = await service.Logging.getExceptionLogs(
          filter,
          dynamic
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
  }, [dynamic]);

  return (
    <DynamicTable
      columns={["id", "functionName", "message", "stackTrace"]}
      filterColumns={["id", "functionName", "message", "stackTrace"]}
      sorterColumns={[]}
      items={items}
      loading={isLoading}
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
    />
  );
};

export default ExceptionLogTable;
