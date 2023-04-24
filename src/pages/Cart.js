import React from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Cart = () => {
  let user = useSelector((state) => state.user);
  let cartList = useSelector((state) => state.cartList);

  return (
    <Container>
      <h2 style={{ padding: "80px 0 50px" }}>{user}님의 장바구니</h2>
      <Table>
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            <th></th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{cartList[0].name}</td>
            <td>{cartList[0].count}</td>
            <td>안녕</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{cartList[1].name}</td>
            <td>{cartList[1].count}</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </Table>{" "}
    </Container>
  );
};

export default Cart;
