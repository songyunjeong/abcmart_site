import { Outlet } from "react-router-dom";

const Event = () => {
  return (
    <div>
      <div>오늘의 이벤트</div>
      <Outlet />
    </div>
  );
};

export default Event;
