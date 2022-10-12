import { Col, Row } from 'antd';
import React, { useEffect } from 'react'
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { BreadcrumbMaker } from '../../../models/action/Breadcrumb';
import { addBreadcrumb } from '../../../store/actions/breadcrumbActions';
import { getCurrentUserBasket } from '../../../store/actions/salesActions';
import BasketDetail from './BasketDetail';
import BasketDetailTable from './BasketDetailTable';

const Basket : React.FC = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const maker = new BreadcrumbMaker();
    dispatch(addBreadcrumb(maker.getMyBasket()));
    dispatch(getCurrentUserBasket())
  }, [dispatch]);


  return (
    <Row>
      <Col span={18}>
        <BasketDetailTable />
      </Col>
      <Col span={6}>
        <BasketDetail />
      </Col>

    </Row>
  )
}

export default Basket