import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HttpClient from "@/apis/HttpClient.js";

const StyledDiv = styled.div`
  margin: auto;
  width: 1250px;
  height: max-content;
  display: flex;
  justify-content: center;

  .edit {
    margin: 10px auto 5px;
    height: 1.5rem;
    padding: 2px;
  }
  div.img {
    width: 600px;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .item {
      box-sizing: border-box;
      width: 600px;
      padding: 20px 80px 0;
      min-height: 140px;
      margin-top: 25px;
      margin-bottom: 30px;
      background-color: #d9d9d9;
      border-radius: 50px;
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

      p:first-child {
        max-width: 100%;
        margin: 0;
        word-break: break-all;
      }
      p:nth-child(2) {
        word-break: break-all;
      }
      span {
        padding-bottom: 5px;
        margin-bottom: 10px;
      }

      span.add {
        margin-left: 80%;
      }
    }
    input {
      width: 430px;
      border-radius: 1rem;
      border: none;
      text-align: center;
      padding: 2px;
    }
    p {
      margin: 20px 0 5px;
      font-size: 14px;
    }
    span {
      text-decoration: underline;
      font-size: 14px;
      display: inline-block;
      width: 350px;
      text-align: right;
      cursor: pointer;
    }
    span:last-child {
      width: 80px;
    }
  }
  div.pad {
    border-left: 1px solid #000;
    margin: 25px auto;
    textarea {
      margin: 0 auto 0 25px;
      width: 600px;
      height: 800px;
      resize: none;
      border: none;
      background-attachment: local;
      background-image: linear-gradient(to right, white 10px, transparent 10px),
        linear-gradient(to left, white 10px, transparent 10px),
        repeating-linear-gradient(
          white,
          white 30px,
          #ccc 30px,
          #ccc 31px,
          white 31px
        );
      line-height: 31px;
      padding: 8px 50px 8px 10px;
    }
    button {
      margin-left: 88%;
      margin-top: 10px;
    }
  }
`;

function AdminMemoContainer() {
  const [url, setUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [goodsPrice, setGoodsPrice] = useState("");
  const [goodsName, setGoodsName] = useState("");
  const [memoPad, setMemoPad] = useState("");
  const [editedItemId, setEditedItemId] = useState(null);
  const [lastId, setLastId] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const listRef = useRef(null);
  const [items, setItems] = useState([]);
  const [memoDefaultValue, setMemoDefaultValue] = useState("");

  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  useEffect(() => {
    getMemoPad();
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // listRef 보여질 때
          fetchMemoData();
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // listRef 감시
    if (listRef.current) {
      observer.observe(listRef.current);
    }

    // listRef 감시 해제
    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [lastId]);

  const fetchMemoData = async () => {
    try {
      const { data, status } = await HttpClient.get(
        `${apiUrl}admin/memo/item/wish?size=5&sort=id,DESC&lastId=${lastId}`
      );

      if (status === 200 || status === 201) {
        setLastId(data.data.lastId);
        setItems((prevItems) => [...prevItems, ...data.data.content]);

        if (data.data.isLast) {
          setIsLast(true);
        } else {
          setIsLast(false);
        }
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const memoValue = (e) => {
    setMemoPad(e.target.value);
  };
  const inputValue = (e) => {
    if (e.target.name === "url") {
      setUrl(e.target.value);
    } else if (e.target.name === "price") {
      setGoodsPrice(e.target.value);
    } else {
      setGoodsName(e.target.value);
    }
  };

  const onEdit = (id) => {
    setIsEdit(true);
    setEditedItemId(id);
  };

  const postMemoData = async () => {
    if (url.trim()) {
      try {
        const { data, status } = await HttpClient.post(
          `${apiUrl}admin/memo/item/wish`,
          {
            url: url,
          }
        );
        if (status === 200 || status === 201) {
          location.reload();
          return data.data;
        } else {
          alert(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("등록할 상품의 url을 입력해주세요");
      setUrl("");
    }
  };

  const putMemoData = async (id) => {
    try {
      if (goodsPrice && goodsName) {
        await HttpClient.post(
          `${apiUrl}usersgoods/cost/update?usersGoodsId=${id}`,
          {
            usersGoodsPrice: goodsPrice,
          }
        )
          .then((res) => {
            if (res.data.status === 200 || res.data.status === 201) {
              return res.data.data;
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        await HttpClient.post(
          `${apiUrl}usersgoods/name/update?usersGoodsId=${id}`,
          {
            usersGoodsName: goodsName,
          }
        )
          .then((res) => {
            if (res.data.status === 200 || res.data.status === 201) {
              return res.data.data;
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (goodsPrice) {
        await HttpClient.post(
          `${apiUrl}usersgoods/cost/update?usersGoodsId=${id}`,
          {
            usersGoodsPrice: goodsPrice,
          }
        )
          .then((res) => {
            if (res.data.status === 200 || res.data.status === 201) {
              return res.data.data;
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (goodsName) {
        await HttpClient.post(
          `${apiUrl}usersgoods/name/update?usersGoodsId=${id}`,
          {
            usersGoodsName: goodsName,
          }
        )
          .then((res) => {
            if (res.data.status === 200 || res.data.status === 201) {
              return res.data.data;
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      location.reload();
    } catch (err) {
      console.log(err);
    }
    setIsEdit(false);
  };
  const deleteMemoData = async (id) => {
    if (confirm("삭제하시겠어요?")) {
      try {
        const { data, status } = await HttpClient.delete(
          `${apiUrl}usersgoods?usersGoodsId=${id}`,
          {
            usersGoodsId: id,
          }
        );
        if (status === 200 || status === 201) {
          alert("삭제 성공!");
          location.reload();
          return data.data;
        } else {
          alert(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return false;
    }
  };

  const getMemoPad = async () => {
    try {
      const { data, status } = await HttpClient.get(`${apiUrl}admin/memo/pad`);
      if (status === 200 || status === 201) {
        setMemoDefaultValue(data.data.contents);
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const postMemoPad = async () => {
    try {
      const { data, status } = await HttpClient.post(
        `${apiUrl}admin/memo/pad`,
        {
          contents: memoPad,
        }
      );

      if (status === 200 || status === 201) {
        alert("저장 성공!");
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledDiv>
      <div className="img">
        {items.map((i) => (
          <div key={i.usersGoodsId} className="item">
            <p>{i.usersGoodsUrl}</p>
            {isEdit === true && i.usersGoodsId === editedItemId ? (
              <>
                <input
                  defaultValue={i.usersGoodsName}
                  onChange={inputValue}
                  name="name"
                  className="edit"
                />
                <input
                  className="edit"
                  defaultValue={i.usersGoodsPrice}
                  onChange={inputValue}
                  name="price"
                />
                <span onClick={() => putMemoData(i.usersGoodsId)}>
                  적용하기
                </span>
              </>
            ) : (
              <>
                {/*id: {i.usersGoodsId}*/}
                <p>상품 이름: {i.usersGoodsName}</p>
                <p>상품 가격: {i.usersGoodsPrice}</p>
                <span onClick={() => onEdit(i.usersGoodsId)}>수정하기</span>
              </>
            )}
            <span onClick={() => deleteMemoData(i.usersGoodsId)}>삭제하기</span>
          </div>
        ))}
        <div className="item">
          <input
            placeholder="url을 입력해주세요"
            onChange={inputValue}
            name="url"
          />
          <p>상품 이름: </p>
          <p>상품 가격: </p>
          <span className="add" onClick={postMemoData}>
            등록하기
          </span>
        </div>
        {!isLast && <p ref={listRef}>Loading...</p>}
      </div>
      <div className="pad">
        <textarea
          cols="30"
          rows="10"
          defaultValue={memoDefaultValue}
          onChange={memoValue}
        ></textarea>
        <button onClick={postMemoPad}>저장하기</button>
      </div>
    </StyledDiv>
  );
}

export default AdminMemoContainer;
