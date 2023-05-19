import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Context } from "./../App.js";
import { addItem } from "./../store/cartSlice";

const Detail = ({ shoes }) => {
  let { stock } = useContext(Context);
  let { id } = useParams();
  let shoesId = shoes.find((x) => x.id == id);
  let dispatch = useDispatch();

  let [eventBanner, setEventBanner] = useState(true);
  let [inputNum, setInputNum] = useState("");
  let [alert, setAlert] = useState(false);
  let [tab, setTab] = useState(0);

  useEffect(() => {
    let timeEventTimer = setTimeout(() => {
      setEventBanner(false);
    }, 5000);
    return () => {
      clearTimeout(timeEventTimer);
    };
  });

  useEffect(() => {
    if (isNaN(inputNum)) {
      setAlert(true);
    }
  }, [inputNum]);

  useEffect(() => {
    let watched = localStorage.getItem("watched");
    watched = JSON.parse(watched);
    watched.push(shoesId.id);
    watched = new Set(watched);
    watched = Array.from(watched);
    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);

  return (
    <div className="container">
      {eventBanner && (
        <div className="alert alert-warning">5초 이내 구매 시 할인</div>
      )}
      <div className="row">
        <div className="col-md-6">
          <img src={shoesId.img} width="100%" alt="제품 이미지" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoesId.title}</h4>
          <p>{shoesId.content}</p>
          <input
            type="text"
            maxLength={2}
            onChange={(e) => {
              setInputNum(e.target.value);
            }}
            placeholder={"수량"}
            style={{ width: "50px", textAlign: "center", marginBottom: "5px" }}
          />
          {alert && <p style={{ color: "#ee1c25" }}>숫자만 입력해주세요.</p>}
          <p>(재고 {stock[0]}개)</p>
          <p>{shoesId.price.toLocaleString()}원</p>
          <button
            className="btn btn-danger"
            onClick={() =>
              dispatch(
                addItem({ id: shoesId.id, name: shoesId.title, count: 1 })
              )
            }
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav
        justify
        variant="tabs"
        defaultActiveKey="link0"
        style={{ marginTop: "50px", marginBottom: "30px" }}
      >
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTab(0)}>
            상품정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTab(1)}>
            상품후기
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTab(2)}>
            상품 Q&A
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} shoes={shoes} />
    </div>
  );
};

function TabContent({ tab }) {
  return (
    <div>{[<div></div>, <div>상품후기</div>, <div>상품 Q&A</div>][tab]}</div>
  );
}

export default Detail;
