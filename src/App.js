import { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import Event from "./pages/Event";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();

  return (
    <div className='App'>
      <Link to='/'>
        <img
          src={process.env.PUBLIC_URL + "/imgs/logo.png"}
          alt='로고 이미지'
          className='logo-img'
        />
      </Link>

      <Navbar
        style={{ backgroundColor: "#ee1c25", fontWeight: "bold" }}
        variant='dark'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate("/brand");
              }}
            >
              BRAND
            </Nav.Link>
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

      <Routes>
        <Route
          path='/'
          element={
            <>
              <img
                className='main-bg'
                src={process.env.PUBLIC_URL + "/imgs/bg.jpg"}
                alt='배경 이미지'
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
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        console.log(result.data);
                      })
                      .catch(() => {
                        console.log("error");
                      });
                  }}
                >
                  더보기
                </button>
              </Container>
            </>
          }
        />
        <Route path='/brand' element={<div>브랜드 페이지</div>} />
        <Route path='/men' element={<div>MEN 페이지</div>} />
        <Route path='/women' element={<div>WOMEN 페이지</div>} />
        <Route path='/kids' element={<div>KIDS 페이지</div>} />
        <Route path='/sale' element={<div>SALE 페이지</div>} />
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
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
