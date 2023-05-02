import React from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modifyName } from "./../store/userSlice";
import { decreaseCount, deleteItem, increaseCount } from "./../store/cartSlice";

const Cart = () => {
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <Container>
      <h2 style={{ padding: "80px 0 20px" }}>{user.name} 님의 장바구니</h2>
      <button
        style={{ marginBottom: "50px" }}
        onClick={() => {
          dispatch(modifyName());
        }}
      >
        영어이름으로 변경
      </button>
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
          {cart.map((id, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{cart[i].name}</td>
              <td>{cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(increaseCount(cart[i].id));
                  }}
                  style={{
                    width: "26px",
                    marginRight: "5px",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    dispatch(decreaseCount(cart[i].id));
                  }}
                  style={{ width: "26px", marginRight: "15px" }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteItem(cart[i].id));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </Container>
  );
};

export default Cart;
