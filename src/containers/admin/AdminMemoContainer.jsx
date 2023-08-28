import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
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
      margin: 0px auto 0 25px;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);
  // const [count, setCount] = useState(0);
  const memoValue = (e) => {
    setMemoPad(e.target.value);
  };

  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };
  const useIntersect = (onIntersect, option) => {
    const [ref, setRef] = useState(null);
    const checkIntersect = useCallback(([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    }, []);

    useEffect(() => {
      let observer;
      if (ref) {
        observer = new IntersectionObserver(checkIntersect, {
          ...defaultOption,
          ...option,
        });
        observer.observe(ref);
      }
      return () => observer && observer.disconnect();
    }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
    return [ref, setRef];
  };

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.observe(entry.target);
    setIsLoaded(true);
    console.log(_);
    await fetchMemoData();
  }, {});

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
    console.log(isEdit);
    setIsEdit(true);
    setEditedItemId(id);
  };
  const fetchMemoData = async () => {
    const { data } = await HttpClient.get(`${apiUrl}admin/memo/item/wish`);
    console.log(data);
    setIsLoaded(false);
    return data.data;
  };

  const postMemoData = async () => {
    const { data } = await HttpClient.post(`${apiUrl}admin/memo/item/wish`, {
      url: url,
    });
    console.log(data);
    return data.data;
  };

  const putMemoData = async (id) => {
    const { data } = await HttpClient.post(
      `${apiUrl}usersgoods/name/update?usersGoodsId=${id}`,
      {
        usersGoodsName: goodsName,
        usersGoodsPrice: goodsPrice,
      }
    );

    console.log(goodsPrice, data);
    setIsEdit(false);
    return data.data;
  };
  const deleteMemoData = async (id) => {
    if (confirm("삭제하시겠어요?")) {
      const { data } = await HttpClient.delete(
        `${apiUrl}usersgoods?usersGoodsId=${id}`,
        {
          usersGoodsId: id,
        }
      );
      alert("삭제 성공!");
      location.reload();

      return data.data;
    } else {
      return false;
    }
  };

  const getMemoPad = async () => {
    const { data } = await HttpClient.get(`${apiUrl}admin/memo/pad`);

    console.log(data);
    return data.data;
  };
  const postMemoPad = async () => {
    const { data } = await HttpClient.post(`${apiUrl}admin/memo/pad`, {
      contents: memoPad,
    });
    alert("저장 성공!");
    return data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchMemoData"],
    queryFn: fetchMemoData,
  });

  const memoPadQuery = useQuery({
    queryKey: ["fetchMemoPadData"],
    queryFn: getMemoPad,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledDiv>
      <div className="img">
        {data.content?.map((i) => (
          <div key={i.usersGoodsId} className="item">
            <p>{i.usersGoodsImgUrl}</p>
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
        {isLoaded && <p ref={setRef}>Loading...</p>}
      </div>
      <div className="pad">
        <textarea
          cols="30"
          rows="10"
          defaultValue={memoPadQuery.data.contents}
          onChange={memoValue}
        ></textarea>
        <button onClick={postMemoPad}>저장하기</button>
      </div>
    </StyledDiv>
  );
}

export default AdminMemoContainer;
