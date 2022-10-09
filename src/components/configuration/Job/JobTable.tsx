import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import Job from "../../../models/configuration/job/Job";

const service = new BaseService();

const JobTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/configuration/GetJobs", "");

  const [items, setItems] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Job();
        const { data } = await service.Configuration.getJobs(filter, dynamic);
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
      columns={["id", "name", "statusID"]}
      filterColumns={["id", "name", "statusID"]}
      sorterColumns={["id", "name"]}
      items={items}
      loading={isLoading}
      createPath="/configuration/updateJob/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/configuration/updateJob"
    />
  );
};

export default JobTable;
