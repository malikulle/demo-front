import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import Role from "../../../models/membership/role/Role";

const service = new BaseService();

const RoleTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/membership/GetRoles", "");

  const [items, setItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Role();
        const { data } = await service.Membership.getRoles(filter, dynamic);
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
      filterColumns={["id", "name"]}
      sorterColumns={["id", "name"]}
      items={items}
      loading={isLoading}
      createPath="/membership/updateRole/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/membership/updateRole"
    />
  );
};

export default RoleTable;
