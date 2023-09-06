import React, { useState } from "react";
// import { ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
  height: 45vh;
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
`;

function AdminLists() {
  const [listsData, setListsData] = useState({
    yes: {},
    no: {},
    unknown: {},
  });

  // const tempToken = import.meta.env.VITE_TEMPTOKEN;

  const token = localStorage.getItem("accessToken") || "needSignIn";
  const fetchAttendanceDetailData = async () => {
    const { data } = await axios.get(
      "http://api.zolabayo.com/admin/attendance/detail",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setListsData(data.data);

    // setAbsence([...data.data.no.guestList]);
    // setUndecided([...data.data.unknown.guestList]);
    // setAttendance([...data.data.yes.guestList]);
    // setAbsence([...absence, ...data.data.no.guestList]);
    // setUndecided([...undecided, ...data.data.unknown.guestList]);
    // setAttendance([...attendance, ...data.data.yes.guestList]);
    // console.log("yes::", attendance, "no::", absence, "unknown::", undecided);
    return data.data;
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
      <div className="item">
        <h4>불참</h4>
        <div>
          {listsData.no.guestList?.map((item) => (
            <p key={item.userId}>{item.name}</p>
          ))}
        </div>
      </div>
      <div className="item">
        <h4>미정</h4>
        <div>
          {listsData.unknown.guestList?.map((item) => (
            <p key={item.userId}>{item.name}</p>
          ))}
        </div>
      </div>
      {/*<button onClick={putAttendanceData}>저장하기</button>*/}
    </StyledDiv>
  );
}

export default AdminLists;
