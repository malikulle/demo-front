import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  InputRef,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { FilterConfirmProps, FilterValue } from "antd/lib/table/interface";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import Dynamic from "../../service/base/Dynamic";
import Sort from "../../service/base/Sort";
import Filter from "../../service/base/Filter";
import ApiFilter from "../../models/action/ApiFilter";
import momment from "moment";

type DynamicTableProps = {
  columns: any[];
  filterColumns: any[];
  sorterColumns: any[];
  apiFilters?: ApiFilter[];
  customFilters?: any[];
  items: any[];
  loading: boolean;
  pagination: any;
  rowKey: string;
  createPath?: string;
  onTableUpdate?: any;
  editUrl?: string;
  onRowClick?: any;
};

const DynamicTable: React.FC<DynamicTableProps> = (
  props: DynamicTableProps
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
  };

  const isDateColumn = (date: string) => {
    if (date && date.toLowerCase().includes("date")) {
      return true;
    }
    return false;
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t("Search")}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t("Reset")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            {t("Filter")}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const getColumns = () => {
    const list = [] as any;
    if (props.columns && props.columns.length > 0) {
      props.columns.forEach((item) => {
        let entity = {
          title: t(`${capitalizeFirstLetter(item)}`),
          dataIndex: item,
          columnKey: item,
        } as any;
        if (props.sorterColumns.indexOf(item) > -1) {
          entity.sorter = (a: any, b: any) => (a[item] > b[item] ? 1 : -1);
        }
        if (
          props.apiFilters &&
          props.apiFilters.length > 0 &&
          props.apiFilters.findIndex((x) => x.name === item) > -1
        ) {
          const api = props.apiFilters.find((x) => x.name === item);
          entity = {
            ...entity,
            filterMultiple: api?.filterMultiple,
            filters: api?.filters,
          };
        } else if (item === "statusID") {
          entity = {
            ...entity,
            render: (_: any, record: any) =>
              record.statusID === 1 ? (
                <Tag color="blue">{t("Active")}</Tag>
              ) : (
                <Tag color="red">{t("Pasive")}</Tag>
              ),
          };
          if (props.filterColumns.indexOf(item) > -1) {
            entity = {
              ...entity,
              filters: [
                { text: t("Active"), value: "1" },
                { text: t("Pasive"), value: "0" },
              ],
              filterMultiple: false,
            };
          }
        } else if (item === "imagePath") {
          entity = {
            ...entity,
            render: (_: any, record: any) =>
              record.imagePath ? (
                <Image width={150} src={record.imagePath} preview={false} />
              ) : (
                ""
              ),
          };
        } else if (isDateColumn(item)) {
          entity = {
            ...entity,
            render: (_: any, record: any) => (
              <>
                {record[item] ? momment(record[item]).format("DD-MM-YYYY") : ""}
              </>
            ),
          };
        } else if (props.filterColumns.indexOf(item) > -1) {
          entity = {
            ...entity,
            ...getColumnSearchProps(item),
          };
        }

        list.push(entity);
      });
    }
    return list;
  };

  const getSorter = (sorter: any) => {
    const list = [] as Sort[];
    if (sorter.field && sorter.order && sorter.order.length > 3) {
      let dir = "";
      if (sorter.order === "ascend") {
        dir = "asc";
      } else {
        dir = "desc";
      }
      list.push({
        field: String(sorter.field),
        dir: dir,
      });
    }
    return list;
  };

  const getFilter = (filter: any) => {
    let response = new Filter();
    if (filter) {
      const filterList = [] as any[];
      props.columns.forEach((item) => {
        if (filter[item] && filter[item].length > 0) {
          if (
            props.customFilters &&
            props.customFilters.length > 0 &&
            props.customFilters.findIndex((x: string) => x === item) > -1
          ) {
            // do nothing
          } else {
            filterList.push({
              field: item,
              value: String(filter[item][0]),
            });
          }
        }
      });
      if (filterList.length > 0) {
        response.field = getName(filterList[0].field);
        response.value = filterList[0].value;
        response.operator = decideOperator(filterList[0].value);
        if (filterList.length > 1) {
          response.logic = "and";
          filterList.shift();
          response.filters = [];
          filterList.forEach((item) => {
            response.filters.push({
              field: getName(String(item.field)),
              logic: "",
              operator: decideOperator(item.value),
              value: String(item.value),
              filters: [],
            });
          });
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
    return response;
  };

  const getName = (item: string) => {
    if (
      props.apiFilters &&
      props.apiFilters.length > 0 &&
      props.apiFilters.findIndex((x) => x.name === item) > -1
    ) {
      const api = props.apiFilters.find((x) => x.name === item);
      if (api?.idName) return String(api.idName);
    }
    return item;
  };

  const decideOperator = (value: any) => {
    let operator = "contains";
    if (!isNaN(value)) {
      operator = "eq";
    }
    return operator;
  };

  const handleTableChange: TableProps<any>["onChange"] = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    const dynamic = new Dynamic();
    dynamic.page = Number(pagination.current);
    dynamic.pageSize = Number(pagination.pageSize);
    dynamic.sort = getSorter(sorter);
    dynamic.filter = getFilter(filters);

    if (props.onTableUpdate) {
      props.onTableUpdate(dynamic, filters);
    }
  };

  return (
    <div>
      {props.createPath && (
        <div>
          <Button
            type="primary"
            onClick={() => navigate(String(props.createPath))}
          >
            {t("Create")}
          </Button>
        </div>
      )}
      <Table
        columns={getColumns()}
        dataSource={props.items}
        loading={props.loading}
        onChange={handleTableChange}
        pagination={props.pagination}
        rowKey={props.rowKey}
        scroll={{ x: 1500 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (props.editUrl) {
                navigate(`${props.editUrl}/${record.id}`);
              } else if (props.onRowClick) {
                props.onRowClick(record);
              }
            },
          };
        }}
      />
    </div>
  );
};

export default DynamicTable;
