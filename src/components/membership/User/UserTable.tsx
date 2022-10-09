import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import User from "../../../models/membership/user/User";
import ApiFilter from "../../../models/action/ApiFilter";
import Role from "../../../models/membership/role/Role";

const service = new BaseService();

const UserTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/membership/GetUsers", "");

  const [items, setItems] = useState<User[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());
  const [apiFilters, setApiFilters] = useState<ApiFilter[]>([]);

  const handleTableChange = (data: Dynamic, customFilter?: any) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new User();
        const { data } = await service.Membership.getUsers(filter, dynamic);
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

  useEffect(() => {
    const getRoles = async () => {
      try {
        const filter = new Role();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const { data } = await service.Membership.getRoles(filter, dynamic);
        if (!data.hasFailed && data.data && data.data.items) {
          const apiFilter = new ApiFilter();
          apiFilter.name = "roleName";
          apiFilter.idName = "roleID";
          apiFilter.filterMultiple = false;
          apiFilter.filters = data.data.items.map((item) => ({
            text: item.name,
            value: item.id.toString(),
          }));
          setApiFilters((previousState) => [...previousState, apiFilter]);
        }
      } catch (error) {}
    };
    getRoles();
  }, []);

  return (
    <DynamicTable
      columns={[
        "id",
        "name",
        "surname",
        "emailAddress",
        "roleName",
        "statusID",
      ]}
      filterColumns={["id", "name", "surname", "emailAddress", "statusID"]}
      sorterColumns={["id", "name", "surname", "emailAddress"]}
      items={items}
      loading={isLoading}
      createPath="/membership/updateUser/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/membership/updateUser"
      apiFilters={apiFilters}
    />
  );
};

export default UserTable;
