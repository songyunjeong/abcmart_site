import { createContext, lazy, Suspense, useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./components/Loading";
import { useQuery } from "@tanstack/react-query";

export let Context = createContext();

const Detail = lazy(() => import("./pages/Detail"));
const Event = lazy(() => import("./pages/Event"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched")) {
      return;
    } else {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let [shoes, setShoes] = useState(data);
  let [loding, setLoding] = useState(false);
  let [clickCount, setClickCount] = useState(0);
  let [stock, setStock] = useState([10, 11, 12]);
  let [watchedPopup, setWatchedPopup] = useState(true);

  let navigate = useNavigate();

  let result = useQuery(
    ["result"],
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 }
  );

  return (
    <div className="App">
      {watchedPopup && (
        <WatchedPopup navigate={navigate} setWatchedPopup={setWatchedPopup} />
      )}

      <header>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/imgs/logo.png"}
            alt="로고 이미지"
            className="logo-img"
          />
        </Link>

        <Link to="/cart" className="gnb-cart"></Link>

        <Navbar
          style={{ backgroundColor: "#ee1c25", fontWeight: "bold" }}
          variant="dark"
        >
          <Container>
            <Nav className="me-auto">
              <Nav.Link style={{ color: "#ffe100" }}>BRAND</Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/men");
                }}
              >
                MEN
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/women");
                }}
              >
                WOMEN
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/kids");
                }}
              >
                KIDS
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/sale");
                }}
              >
                SALE
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/event");
                }}
              >
                EVENT
              </Nav.Link>
            </Nav>
            <Nav>
              {result.isLoading && "로딩중"}
              {result.error && "에러남"}
              {result.data && `${result.data.name}님 반가워요!`}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <img
                  className="main-bg"
                  src={process.env.PUBLIC_URL + "/imgs/bg.jpg"}
                  alt="배경 이미지"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "1320px",
                    marginBottom: "30px",
                  }}
                ></img>

                <Container>
                  <Row>
                    {shoes.map((data, i) => {
                      return (
                        <Card
                          key={i}
                          navigate={navigate}
                          shoes={shoes[i]}
                          i={i}
                        />
                      );
                    })}
                  </Row>
                  {loding && <Loading />}
                  {clickCount === 2 ? (
                    <div style={{ padding: "30px" }}>
                      더이상 상품이 없습니다.
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setClickCount(clickCount + 1);
                        setLoding(true);
                        axios
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((result) => {
                            let copy = [...shoes, ...result.data];
                            if (clickCount < 1) {
                              setShoes(copy);
                            }
                            setLoding(false);
                          })
                          .catch(() => {
                            setLoding(false);
                            console.log("error");
                          });
                      }}
                      style={{
                        border: "none",
                        fontSize: "14px",
                        padding: "5px 10px",
                        margin: "20px",
                      }}
                    >
                      MORE
                    </button>
                  )}
                </Container>
              </>
            }
          />
          <Route path="/men" element={<div>MEN 페이지</div>} />
          <Route path="/women" element={<div>WOMEN 페이지</div>} />
          <Route path="/kids" element={<div>KIDS 페이지</div>} />
          <Route path="/sale" element={<div>SALE 페이지</div>} />
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route
            path="/detail/:id"
            element={
              <Context.Provider value={{ stock }}>
                <Detail shoes={shoes} />
              </Context.Provider>
            }
          />
          <Route path="/cart" element={<Cart>장바구니</Cart>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Card({ navigate, shoes, i }) {
  return (
    <Col
      sm
      onClick={() => {
        navigate(`/detail/${shoes.id}`);
      }}
      style={{ minWidth: "33%", cursor: "pointer" }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}
        alt="배경 이미지"
        width="80%"
      />
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
      <p>{shoes.price.toLocaleString()}</p>
    </Col>
  );
}

function WatchedPopup({ navigate, setWatchedPopup }) {
  let watched = localStorage.getItem("watched");
  if (watched) {
    watched = JSON.parse(watched);
    watched = Array.from(watched);
    watched = [...watched].reverse();
  }

  return (
    <div className="watched-popup">
      <button
        className="watched-popup-close"
        onClick={() => setWatchedPopup(false)}
      >
        닫기
      </button>
      <div style={{ marginBottom: "10px" }}>최근 본 상품</div>
      <div>
        {watched &&
          watched.map((_, i) => {
            return (
              <img
                key={watched[i]}
                src={`https://codingapple1.github.io/shop/shoes${
                  watched[i] + 1
                }.jpg`}
                alt="배경 이미지"
                onClick={() => {
                  navigate(`/detail/${watched[i]}`);
                }}
                width="80%"
                style={{
                  marginBottom: "10px",
                  border: "1px solid #999",
                  cursor: "pointer",
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
