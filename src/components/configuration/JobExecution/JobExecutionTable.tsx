import { TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import JobExecution from "../../../models/configuration/jobExecution/JobExecution";
import Job from "../../../models/configuration/job/Job";
import ApiFilter from "../../../models/action/ApiFilter";
import { useTranslation } from "react-i18next";

const service = new BaseService();

const JobExecutionTable: React.FC = () => {
  const { t } = useTranslation();
  const isLoading = useApiProgress(
    "post",
    "/api/configuration/GetJobExecutions",
    ""
  );

  const [items, setItems] = useState<JobExecution[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());
  const [apiFilters, setApiFilters] = useState<ApiFilter[]>([]);

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new JobExecution();
        const { data } = await service.Configuration.getJobExecutions(
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

  useEffect(() => {
    const getJobs = async () => {
      try {
        const filter = new Job();
        const dynamic = new Dynamic();
        dynamic.pageSize = 100;
        const { data } = await service.Configuration.getJobs(filter, dynamic);
        if (!data.hasFailed && data.data && data.data.items.length > 0) {
          const apiFilter = new ApiFilter();
          apiFilter.name = "jobName";
          apiFilter.idName = "jobID";
          apiFilter.filterMultiple = false;
          apiFilter.filters = data.data.items.map((item) => ({
            text: item.name,
            value: item.id.toString(),
          }));
          setApiFilters((previousState) => [...previousState, apiFilter]);
        }
      } catch (error) {}
    };

    const getJobExecutionTypes = () => {
      const apiFilter = new ApiFilter();
      apiFilter.name = "jobExecutionTypeName";
      apiFilter.idName = "jobExecutionType";
      apiFilter.filters = [
        { text: t("None"), value: "0" },
        { text: t("Running"), value: "1" },
        { text: t("Done"), value: "2" },
      ];
      setApiFilters((previousState) => [...previousState, apiFilter]);
    };

    getJobExecutionTypes();
    getJobs();
  }, [t]);

  return (
    <DynamicTable
      columns={[
        "id",
        "jobName",
        "jobExecutionTypeName",
        "startDate",
        "endDate",
      ]}
      filterColumns={["id", "jobName", "jobExecutionTypeName"]}
      sorterColumns={["id"]}
      items={items}
      loading={isLoading}
      onTableUpdate={handleTableChange}
      apiFilters={apiFilters}
      pagination={pagination}
      rowKey="id"
      editUrl="/configuration/jobExecutionDetail"
    />
  );
};

export default JobExecutionTable;
