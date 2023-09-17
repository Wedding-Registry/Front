import React, { useState } from "react";
// import { ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/apis/HttpClient.js";

const StyledDiv = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
  height: 70vh;
  margin: auto;

  div.item {
    /* border: 1px solid green; */
    h4 {
      margin: 0 8px 8px;
    }
    div {
      border-radius: 0.5rem;
      width: 315px;
      height: 250px;
      border: 1px solid #000;
      overflow-y: scroll;
    }
    p {
      margin: 8px;
      border-bottom: 1px solid #aaa;
      padding: 5px;
      margin-right: 30px;
    }
  }

  .notice {
    color: darkred;
    font-weight: 600;
    margin: 5rem auto;
    text-align: center;
  }
`;

function AdminLists() {
  const [listsData, setListsData] = useState({
    yes: {},
    no: {},
    unknown: {},
  });

  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  const token = localStorage.getItem("accessToken") || "needSignIn";
  const fetchAttendanceDetailData = async () => {
    try {
      const { data, status } = await httpClient.get(
        `${apiUrl}admin/attendance/detail`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (status === 200 || status === 201) {
        setListsData(data.data);
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }

    // setAbsence([...data.data.no.guestList]);
    // setUndecided([...data.data.unknown.guestList]);
    // setAttendance([...data.data.yes.guestList]);
    // setAbsence([...absence, ...data.data.no.guestList]);
    // setUndecided([...undecided, ...data.data.unknown.guestList]);
    // setAttendance([...attendance, ...data.data.yes.guestList]);
    // console.log("yes::", attendance, "no::", absence, "unknown::", undecided);
  };

  const { isLoading, error } = useQuery({
    queryKey: ["attendanceDetailData"],
    queryFn: fetchAttendanceDetailData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const putAttendanceData = async () => {
  //   // FIXME PUT API
  //   // const lists = [...attendance, ...absence, ...undecided];
  //   console.log("lists::: ", listsData);
  //
  //   const { data } = await axios.put(
  //     "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/attendance",
  //     {
  //       body: [listsData],
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + tempToken,
  //       },
  //     }
  //   );
  //   return console.log("put data", data);
  // };

  // const handleSort = (items, listName) => {
  //   console.log("handlesort,", items, "list Name::: ", listName);
  //   // console.log(listsData);
  //   setListsData((prevListsData) => ({
  //     ...prevListsData,
  //     [listName]: items.map((item) => item.textContent),
  //   }));
  // };

  return (
    <StyledDiv>
      {listsData.yes.guestList?.length === 0 ? (
        <h3 className="notice">참석 목록이 없습니다</h3>
      ) : (
        <div className="item">
          <h4>참석</h4>
          {/*{fetchAttendanceDetailData.data.map((item) => (*/}
          {/*  <p key={item.userId}>*/}
          {/*    {item.userId} / = {item.name}*/}
          {/*  </p>*/}
          {/*))}*/}
          <div>
            {listsData.yes.guestList?.map((item) => (
              <p key={item.userId}>{item.name}</p>
            ))}
          </div>
        </div>
      )}

      {listsData.no.guestList?.length === 0 ? (
        <h3 className="notice">불참 목록이 없습니다</h3>
      ) : (
        <div className="item">
          <h4>불참</h4>
          <div>
            {listsData.no.guestList?.map((item) => (
              <p key={item.userId}>{item.name}</p>
            ))}
          </div>
        </div>
      )}

      {listsData.unknown.guestList?.length === 0 ? (
        <h3 className="notice">미정 목록이 없습니다</h3>
      ) : (
        <div className="item">
          <h4>미정</h4>
          <div>
            {listsData.unknown.guestList?.map((item) => (
              <p key={item.userId}>{item.name}</p>
            ))}
          </div>
        </div>
      )}
      {/*<button onClick={putAttendanceData}>저장하기</button>*/}
    </StyledDiv>
  );
}

export default AdminLists;
