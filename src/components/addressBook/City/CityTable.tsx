import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useParams } from "react-router-dom";
import City from "../../../models/addressbook/city/City";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";

const service = new BaseService();

const CityTable: React.FC = () => {
  const params = useParams();
  const isLoading = useApiProgress("post", "/api/AddressBook/GetCities", "");

  const [items, setItems] = useState<City[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new City();
        filter.countryID = Number(params.id);
        const { data } = await service.AddressBook.getCities(filter, dynamic);
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
  }, [params.id, dynamic]);

  return (
    <DynamicTable
      columns={["id", "name", "plateCode", "statusID"]}
      filterColumns={["id", "name", "plateCode"]}
      sorterColumns={["id", "name", "plateCode"]}
      items={items}
      loading={isLoading}
      createPath={`/addressBook/updateCity/0?countryID=${Number(params.id)}`}
      onTableUpdate={handleTableChange}
      pagination={pagination}
      rowKey="id"
      editUrl="/addressBook/updateCity"
    />
  );
};

export default CityTable;
