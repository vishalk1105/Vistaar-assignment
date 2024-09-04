import React from "react";

const ReactButton = ({
  btnType,
  btnText,
  onClickfn,
  btnClass,
  reactBtnOuterDiv,
}) => {
  return (
    <div className={`reactButton text-center ${reactBtnOuterDiv}`}>
      <button type={btnType} className={`btn ${btnClass}`} onClick={onClickfn}>
        {btnText}
      </button>
    </div>
  );
};

export default ReactButton;
