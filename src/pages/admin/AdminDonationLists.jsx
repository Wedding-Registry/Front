import React from "react";
import AdminDonationListsContainer from "../../containers/admin/AdminDonationListsContainer.jsx";
import AdminContainer from "@/containers/admin/AdminContainer.jsx";

function AdminDonationLists() {
  return (
    <>
      <AdminContainer />
      <AdminDonationListsContainer />
    </>
  );
}

export default AdminDonationLists;
