import { createContext, useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import Event from "./pages/Event";
import axios from "axios";
import Loading from "./components/Loading";
import Cart from "./pages/Cart";

export let Context = createContext();

function App() {
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  let [shoes, setShoes] = useState(data);
  let [loding, setLoding] = useState(false);
  let [clickCount, setClickCount] = useState(0);
  let [stock, setStock] = useState([10, 11, 12]);

  let navigate = useNavigate();

  return (
    <div className='App'>
      <header>
        <Link to='/'>
          <img
            src={process.env.PUBLIC_URL + "/imgs/logo.png"}
            alt='로고 이미지'
            className='logo-img'
          />
        </Link>

        <Link to='/cart' className='gnb-cart'></Link>

        <Navbar
          style={{ backgroundColor: "#ee1c25", fontWeight: "bold" }}
          variant='dark'
        >
          <Container>
            <Nav className='me-auto'>
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
          </Container>
        </Navbar>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <>
              <img
                className='main-bg'
                src={process.env.PUBLIC_URL + "/imgs/bg.jpg"}
                alt='배경 이미지'
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
                  <div style={{ padding: "30px" }}>더이상 상품이 없습니다.</div>
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
        <Route path='/men' element={<div>MEN 페이지</div>} />
        <Route path='/women' element={<div>WOMEN 페이지</div>} />
        <Route path='/kids' element={<div>KIDS 페이지</div>} />
        <Route path='/sale' element={<div>SALE 페이지</div>} />
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route
          path='/detail/:id'
          element={
            <Context.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context.Provider>
          }
        />
        <Route path='/cart' element={<Cart>장바구니</Cart>} />
        <Route path='*' element={<div>없는 페이지</div>} />
      </Routes>
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
        alt='배경 이미지'
        width='80%'
      />
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
      <p>{shoes.price.toLocaleString()}</p>
    </Col>
  );
}

export default App;
