import { Comment, Pagination, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import AvatarWithDefault from "../../common/AvatarWithDefault";
import moment from "moment";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { getProductCommentList } from "../../../store/actions/catalogActions";

const CommentList: React.FC = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useTypedDispatch();
  const { productCommentList } = useTypedSelector(
    (state) => state.productCommentList
  );

  useEffect(() => {
    dispatch(getProductCommentList(pageIndex));
  }, [dispatch, pageIndex]);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const getDateCreated = (date?: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY HH:ss");
    } else {
      return "";
    }
  };

  const getDuration = (value?: string) => {
    var now = moment(new Date());
    var end = moment(value);
    var duration = moment.duration(now.diff(end));
    return Number(duration.asHours()).toFixed(1);
  };

  return (
    <>
      {productCommentList &&
        productCommentList.items &&
        productCommentList.items.map((item) => (
          <Comment
            author={item?.fullName}
            avatar={<AvatarWithDefault imagePath={item?.imagePath} />}
            content={<p>{item.text}</p>}
            datetime={
              <Tooltip title={getDateCreated(item.dateCreated?.toString())}>
                <span>
                  {getDuration(item.dateCreated?.toString())} hours ago
                </span>
              </Tooltip>
            }
          />
        ))}

      <Pagination
        style={{ marginLeft: "20px" }}
        pageSize={productCommentList.size}
        current={productCommentList.index}
        total={productCommentList.count}
        onChange={onPageChange}
      />
    </>
  );
};

export default CommentList;
