import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = ({ shoes }) => {
  let { id } = useParams();
  let [eventBanner, setEventBanner] = useState(true);
  let [inputNum, setInputNum] = useState("");
  let [alert, setAlert] = useState(false);

  useEffect(() => {
    let timeEventTimer = setTimeout(() => {
      setEventBanner(false);
    }, 2000);
    return () => {
      clearTimeout(timeEventTimer);
    };
  });

  useEffect(() => {
    if (isNaN(inputNum)) {
      setAlert(true);
    }
  }, [inputNum]);

  return (
    <div className='container'>
      {eventBanner && (
        <div className='alert alert-warning'>2초 이내 구매 시 할인</div>
      )}
      <div className='row'>
        <div className='col-md-6'>
          <img src={shoes[id].img} width='100%' alt='제품 이미지' />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{shoes[id].title}</h4>
          <p>{shoes[id].content}</p>
          <input
            type='text'
            onChange={(e) => {
              setInputNum(e.target.value);
            }}
          />
          {alert && <p style={{ color: "red" }}>숫자만 입력해주세요.</p>}
          <p>{shoes[id].price.toLocaleString()}원</p>
          <button className='btn btn-danger'>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
