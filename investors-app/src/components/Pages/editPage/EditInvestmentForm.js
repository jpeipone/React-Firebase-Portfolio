import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";

const EditInvestmentForm = () => {
  //Context
  const {
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
    portfolioUser,
    setPortfolioUser,
  } = useContext(UserContext);
  const { id } = useParams();

  const findInvestment = userdata.find((element) => element.id === id);
  console.log("found investment edit: ", findInvestment);

  return <div>EditInvestmentForm {id}</div>;
};

export default EditInvestmentForm;
