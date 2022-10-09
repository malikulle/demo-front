import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import Country from "../../../models/addressbook/country/Country";

const service = new BaseService();

const CountryTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/AddressBook/GetCountries", "");

  const [items, setItems] = useState<Country[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new Country();
        const { data } = await service.AddressBook.getCountries(filter, dynamic);
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
      columns={["id", "name", "codeISO","codeISO3","phoneCode","statusID"]}
      filterColumns={["id", "name", "codeISO","codeISO3","phoneCode"]}
      sorterColumns={["id", "name", "codeISO","codeISO3","phoneCode"]}
      items={items}
      loading={isLoading}
      createPath="/addressBook/updateCountry/0"
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/addressBook/updateCountry"
    />
  );
};

export default CountryTable;
