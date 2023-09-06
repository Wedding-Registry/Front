import React, { useState } from "react";
import GoodsModal from "./goodsmodal/GoodsModal";

export default function Test() {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [modalData, setModalData] = useState({ id: null, state: "View" });
  return (
    <>
      <div>
        {data.map((element) => (
          <div
            key={element.id}
            onClick={() => setModalData({ id: element.id, state: "View" })}
          >
            {element.id}
          </div>
        ))}

        <div onClick={() => setModalData({ id: 4, state: "Edit" })}>4</div>
      </div>
      <GoodsModal setIsOpen={true}>
        {modalData.state === "View" ? (
          <div>
            {modalData.id} + {modalData.state}
          </div>
        ) : (
          <div> edit</div>
        )}
      </GoodsModal>
    </>
  );
}
