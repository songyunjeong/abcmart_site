import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader color='#eee' height={15} width={5} radius={2} margin={2} />
      </div>
    </div>
  );
};

export default Loading;
