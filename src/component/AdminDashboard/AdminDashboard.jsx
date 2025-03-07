import React, { useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import DataTable from "react-data-table-component";
import { FaUserAlt } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@mui/base";
import { styled } from "@mui/system";
import {Tab, tabClasses } from "@mui/base/Tab";
import { buttonClasses } from "@mui/base/Button";
import {TabsList} from "@mui/base/TabsList";
import {TabPanel} from "@mui/base/TabPanel";
import { IoMdRefresh } from "react-icons/io";
import Cookie from "js-cookie";
import { errorToast } from "../../utils/Helper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// Extend dayjs with the UTC plugin
dayjs.extend(utc);

function AdminDashboard() {
  const date = new Date();
  const navigate = useNavigate();
  const [newuser, setNewuser] = useState(true);
  const [totaluser, setTotaluser] = useState(true);
  const [newRegCompany, setNewRegCompany] = useState(false);
  const [regCompany, setRegCompany] = useState(false);
  const [countryCompany, setCountryCompany] = useState(false);
  const [countryEmployee, setCountryEmployee] = useState(false);
  const [countryUser, setCountryUser] = useState(true);
  const [newEmployee, setNewEmployee] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(false);
  const [totalusercount, setTotalusercount] = useState("");
  const [registerCount, setRegisterCount] = useState("");
  const [allEmpCount, setAllEmpCount] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const customTableStyles = {
    rows: {
      style: {
        fontSize: "16px",
        paddingInlineStart: "5px",
        cursor: "pointer",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
        backgroundColor: "#495464",
        color: "#ffffff",
      },
    },
    title: {
      style: {
        overflow: "none",
      },
    },
  };
  const StyledTab = styled(Tab)`
    color: black;
    cursor: pointer;
    font-size: 20px;
    background-color: transparent;
    width: 90%;
    padding: 3px 10px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #bdbdbd;
    }

    &:focus {
      color: black;
      outline: 3px solid #393e46;
    }

    &.${tabClasses.selected} {
      background-color: #6d9886;
      color: #fff;
      height: 40px;
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const StyledTabPanel = styled(TabPanel)(
    ({ theme }) => `
   width: 90%;
   margin-left:75px;
   padding: 20px 12px;
   border: 1px solid ${theme.palette.mode === "dark" ? "black" : "black"};
 border: none;
   `
  );

  const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
  min-width: 250px;
       width: 70%;
       height:50px;
       margin-left:14%;
       color: black;
       border: 3px solid #6D9886;
       border-radius: 12px;
       margin-bottom: 16px;
       display: flex;
       align-items: center;
       justify-content: center;
       align-content: space-between;
  `
  );
  // total user
  const [TotalUserData, setTotalUserData] = useState([]);
  const [TotalCountryUserData, setTotalCountryUserData] = useState([]);

  const columnsTotalUser = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row?._id).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row?._id).format("dddd"),
    },
    {
      name: "Total User Count",
      selector: (row) => row?.emp,
    },
  ];
  const columnsCountryTotalUser = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Country",
      selector: (row) => row?._id,
    },
    {
      name: "Total User Count",
      selector: (row) => row?.users,
    },
  ];
  //   new user
  const [NewUserData, setNewUserData] = useState([]);

  const columnsNewUser = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row._id).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row._id).format("dddd"),
    },
    {
      name: "Total User Count",
      selector: (row) => row.emp,
    },
  ];

  // new registercompany
  const [NewRegComData, setNewRegComData] = useState([]);
  const columnsNewRegCompany = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row.date).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row._id).format("dddd"),
    },
    {
      name: "Company Count",
      selector: (row) => row.company,
    },
  ];

  // registrecompany
  const [RegCompanyData, setRegCompanyData] = useState([]);
  const [countryRegCompanyData, setCountryRegCompanyData] = useState([]);

  const columnsRegCompany = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row?._id).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row?._id).format("dddd"),
    },
    {
      name: "Total Registered Company Count",
      selector: (row) => (
        <div className="text-center" style={{ textAlign: "center" }}>
          {row?.company}
        </div>
      ),
    },
  ];
  const columnsCountryRegCompany = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Country",
      selector: (row) => row?._id,
    },
    {
      name: "Total Registered Company Count",
      selector: (row) => row?.users,
    },
  ];
  // new employee
  const [NewEmpData, setNewEmpData] = useState([]);
  const columnsNewEmployee = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row.date).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row._id).format("dddd"),
    },
    {
      name: "Company Count",
      selector: (row) => row.emp,
    },
    // {
    //   name: "View  Details",
    //   selector: (row) => <button className="ViewBtn">View Details</button>,
    // },
  ];

  // total employee
  const [EmpData, setEmpData] = useState([]);
  const [countryEmpData, setCountryEmpData] = useState([]);
  const columnsEmployee = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row?._id).format("MMMM DD, YYYY"),
    },
    {
      name: "Day",
      selector: (row) => dayjs(row?._id).format("dddd"),
    },
    {
      name: "Total Employee Count",
      selector: (row) => row?.emp,
    },
  ];
  const columnsCountryEmployee = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Country",
      selector: (row) => row?._id,
    },
    {
      name: "Total Employee Count",
      selector: (row) => row?.users,
    },
  ];
  // ***User***
  // total user count
  useEffect(() => {
    var API_URL = "https://admin.moramba.io/api/getallusercount";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setTotalusercount(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  }, [1000]);
  const TotalUserHandle = () => {
    var API_URL = "https://admin.moramba.io/api/usercountbyday";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response.data.data);
        setTotalUserData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          errorToast("Session Expired");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  // country user
  const TotalCountryUserHandle = () => {
    var API_URL = "https://admin.moramba.io/api/usercountbycountry";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response.data.data);
        setTotalCountryUserData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  useEffect(() => {
    TotalCountryUserHandle();
  }, []);
  // show total data table
  const showTotalUserTable = () => {
    setTotaluser(!totaluser);
    // setNewuser(false);
    // setNewRegCompany(false);
    setRegCompany(false);
    // setNewEmployee(false);
    setTotalEmployee(false);
  };
  // filter Data for today
  const TodaysUserData = () => {
    const dummy = [];
    for (let i = 0; i < TotalUserData.length; i++) {
      if (
        dayjs(todayDate).format("YYYY-MM-DD") ===
        dayjs(TotalUserData[i]._id).format("YYYY-MM-DD")
      ) {
        dummy.push(TotalUserData[i]);
        console.log(1, dummy);
        setNewUserData(dummy);
      }
    }
  };

  // show Today data table

  const NewUserHandle = () => {
    setNewuser(!newuser);
    // setTotaluser(false);
    setNewRegCompany(false);
    // setRegCompany(false);
    setNewEmployee(false);
    // setTotalEmployee(false);
  };
  useEffect(() => {
    TotalUserHandle();
  }, []);
  useEffect(() => {
    TodaysUserData();
  }, [TotalUserData]);
  // ***Company***
  // total company register
  useEffect(() => {
    var API_URL = "https://admin.moramba.io/api/getallorgcount";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setRegisterCount(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  }, [1000]);
  const RegisterCompanyHandle = () => {
    var API_URL = "https://admin.moramba.io/api/orgcountbyday";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setRegCompanyData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  // country Company
  const CountryCompanyHandle = () => {
    var API_URL = "https://admin.moramba.io/api/orgcountbycountry";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setCountryRegCompanyData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  useEffect(() => {
    CountryCompanyHandle();
  }, []);
  // show total company Data
  const showTotalRegCompany = () => {
    setRegCompany(!regCompany);
    setTotaluser(false);
    // setNewuser(false);
    // setNewRegCompany(false);
    // setNewEmployee(false);
    setTotalEmployee(false);
  };
  // filter today company
  const TodaysCompanyData = () => {
    const dummy = [];
    for (let i = 0; i < RegCompanyData.length; i++) {
      if (
        dayjs(todayDate).format("YYYY-MM-DD") ===
        dayjs(RegCompanyData[i]._id).format("YYYY-MM-DD")
      ) {
        dummy.push(RegCompanyData[i]);
        setNewRegComData(dummy);
        console.log(1, dummy);
      }
    }
  };
  // show today company data
  const NewRegComHandle = () => {
    setNewRegCompany(!newRegCompany);
    setNewuser(false);
    // setTotaluser(false);
    // setRegCompany(false);
    setNewEmployee(false);
    // setTotalEmployee(false);
  };
  useEffect(() => {
    RegisterCompanyHandle();
  }, []);
  useEffect(() => {
    TodaysCompanyData();
  }, [RegCompanyData]);
  // ***Employee ***
  // total employee count
  useEffect(() => {
    var API_URL = "https://admin.moramba.io/api/getallempcount";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setAllEmpCount(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  }, [1000]);
  const TotalEmpHandle = () => {
    var API_URL = "https://admin.moramba.io/api/empcountbyday";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setEmpData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  const TotalCountryEmpHandle = () => {
    var API_URL = "https://admin.moramba.io/api/empcountbycountry";
    let headerConfig = {
      headers: {
        accept: "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then(function (response) {
        console.log(response);
        setCountryEmpData(response.data.data);
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("token");
          navigate("/");
        }
        console.log("login error***", error);
      });
  };
  useEffect(() => {
    TotalCountryEmpHandle();
  }, []);
  // Show total employee table
  const showTotalEmployee = () => {
    setTotalEmployee(!totalEmployee);
    setRegCompany(false);
    setTotaluser(false);
    // setNewuser(false);
    // setNewRegCompany(false);
    // setNewEmployee(false);
  };
  // filter today employee data
  const TodaysEmployeeData = () => {
    const dummy = [];
    for (let i = 0; i < EmpData.length; i++) {
      if (
        dayjs(todayDate).format("YYYY-MM-DD") ===
        dayjs(EmpData[i]._id).format("YYYY-MM-DD")
      ) {
        dummy.push(EmpData[i]);
        setNewEmpData(dummy);
        console.log(1, dummy);
      }
    }
  };
  // show today employee table
  const NewEmpHandle = () => {
    setNewEmployee(!newEmployee);
    setNewRegCompany(false);
    setNewuser(false);
    // setTotaluser(false);
    // setRegCompany(false);
    // setTotalEmployee(false);
  };
  // country section
  const showTotalUserCountry = () => {
    setCountryUser(!countryUser);
    setCountryCompany(false);
    setCountryEmployee(false);
  };
  const showTotalCompanycountry = () => {
    setCountryCompany(!countryCompany);
    setCountryUser(false);
    setCountryEmployee(false);
  };
  const showTotalEmployeeCountry = () => {
    setCountryEmployee(!countryEmployee);
    setCountryCompany(false);
    setCountryUser(false);
  };
  useEffect(() => {
    TotalEmpHandle();
  }, []);
  useEffect(() => {
    TodaysEmployeeData();
  }, [EmpData]);

  const logoutHandle = () => {
    sessionStorage.clear();
    Cookie.remove("token");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const Refresh = () => {
    window.location.reload(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-end gap-3">
          <button onClick={Refresh} className="sign-up-btn">
            Refresh
          </button>
          <button onClick={logoutHandle} className="sign-up-btn">
            LOGOUT
          </button>
        </div>
        <h3 className="text-center mt-2">Admin Dashboard</h3>
        <h5 className="text-center mt-3 mb-3">
          Country : {sessionStorage.getItem("country")}
        </h5>
        <Tabs defaultValue={0}>
          <StyledTabsList id="tab_mobile" className="tablist_document">
            <StyledTab value={0} id="active_tab">
              Current Data
            </StyledTab>
            <StyledTab value={1} id="active_tab">
              Total Data
            </StyledTab>
            {sessionStorage.getItem("country") === "All" ? (
              <>
                <StyledTab value={2} id="active_tab">
                  Country-wise Data
                </StyledTab>
              </>
            ) : (
              ""
            )}
          </StyledTabsList>
          <StyledTabPanel value={0} id="tabpanel_mob">
            <h3 className="text-center">
              {dayjs.utc(date).format("MMMM DD, YYYY")}
            </h3>
            <div className="d-flex flex-row justify-content-center flex-wrap mt-4 gap-5 adminboxresponsive">
              <div
                className={
                  newuser === true ? "selectedbox p-4" : "adminboxToday p-4"
                }
                onClick={NewUserHandle}
              >
                <h4>Today's User</h4>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">
                    {NewUserData.length === 0 ? (
                      <>0</>
                    ) : (
                      <>{NewUserData[0]?.emp}</>
                    )}
                  </h3>
                  <FaUserAlt className="adminicon" />
                </div>{" "}
              </div>
              <div
                className={
                  newRegCompany === true
                    ? "selectedbox p-4"
                    : "adminboxToday p-4"
                }
                onClick={NewRegComHandle}
              >
                <h3>Today's Registered company</h3>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">
                    {NewRegComData.length === 0 ? (
                      <>0</>
                    ) : (
                      <>{NewRegComData[0]?.company}</>
                    )}
                  </h3>
                  <ImOffice className="adminicon" />
                </div>
              </div>
              <div
                className={
                  newEmployee === true ? "selectedbox p-4" : "adminboxToday p-4"
                }
                onClick={NewEmpHandle}
              >
                {" "}
                <h4>Today's Employee</h4>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">
                    {NewEmpData.length === 0 ? (
                      <>0</>
                    ) : (
                      <>{NewEmpData[0]?.emp}</>
                    )}
                  </h3>
                  <FaUsers className="adminicon" />
                </div>
              </div>
            </div>{" "}
            <br />
            <br />
            {newRegCompany === true ? (
              <>
                <h4 className="text-center">
                  <u>Today's Registered company</u>
                </h4>
                <div className="tableresponsive">
                  <DataTable
                    columns={columnsNewRegCompany}
                    data={NewRegComData}
                    fixedHighlight
                    highlightOnHover
                    pagination
                    customStyleHeader
                    customStyles={customTableStyles}
                  />
                </div>
              </>
            ) : (
              <>
                {newEmployee === true ? (
                  <>
                    <h4 className="text-center">
                      <u>Today's Employee</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsNewEmployee}
                        data={NewEmpData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <h4 className="text-center">
                      <u>Today's User</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsNewUser}
                        data={NewUserData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </StyledTabPanel>
          <StyledTabPanel value={1} id="tabpanel_mob">
            {" "}
            <div className="d-flex flex-row justify-content-center adminboxresponsive flex-wrap mt-4 gap-5">
              <div
                className={
                  totaluser === true ? "selectedbox p-4" : "adminboxtotal p-4"
                }
                onClick={showTotalUserTable}
              >
                <h3>Total User</h3>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{totalusercount}</h3>
                  <FaUserAlt className="adminicon" />
                </div>
              </div>
              <div
                className={
                  regCompany === true ? "selectedbox p-4" : "adminboxtotal p-4"
                }
                onClick={showTotalRegCompany}
              >
                <h3>Total Registered company</h3>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{registerCount}</h3>
                  <ImOffice className="adminicon" />
                </div>
              </div>
              <div
                className={
                  totalEmployee === true
                    ? "selectedbox p-4"
                    : "adminboxtotal p-4"
                }
                onClick={showTotalEmployee}
              >
                <h4>Total Employee</h4>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{allEmpCount}</h3>
                  <FaUsers className="adminicon" />
                </div>
              </div>
            </div>
            {regCompany === true ? (
              <>
                <h4 className="text-center mt-4">
                  <u>Total Registered company</u>
                </h4>
                <div className="tableresponsive">
                  <DataTable
                    columns={columnsRegCompany}
                    data={RegCompanyData}
                    fixedHeader
                    selectableRowsHighlight
                    highlightOnHover
                    pagination
                    customStyles={customTableStyles}
                  />
                </div>
              </>
            ) : (
              <>
                {totalEmployee === true ? (
                  <>
                    <h4 className="text-center mt-4">
                      <u>Total Employee</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsEmployee}
                        data={EmpData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-center mt-4">
                      <u>Total User</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsTotalUser}
                        data={TotalUserData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </StyledTabPanel>
          <StyledTabPanel value={2} id="tabpanel_mob">
            <div className="d-flex flex-row justify-content-center adminboxresponsive flex-wrap mt-4 gap-5">
              <div
                className={
                  countryUser === true
                    ? "selectedbox p-4"
                    : "adminboxcountry p-4"
                }
                onClick={showTotalUserCountry}
              >
                <h3>Total User</h3>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{totalusercount}</h3>
                  <FaUserAlt className="adminicon" />
                </div>
              </div>
              <div
                className={
                  countryCompany === true
                    ? "selectedbox p-4"
                    : "adminboxcountry p-4"
                }
                onClick={showTotalCompanycountry}
              >
                <h3>Total Registered company</h3>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{registerCount}</h3>
                  <ImOffice className="adminicon" />
                </div>
              </div>
              <div
                className={
                  countryEmployee === true
                    ? "selectedbox p-4"
                    : "adminboxcountry p-4"
                }
                onClick={showTotalEmployeeCountry}
              >
                <h4>Total Employee</h4>
                <div className="d-flex justify-content-between mt-3">
                  <h3 className="">{allEmpCount}</h3>
                  <FaUsers className="adminicon" />
                </div>
              </div>
            </div>
            {countryCompany === true ? (
              <>
                <h4 className="text-center mt-4">
                  <u>Total Registered company</u>
                </h4>
                <div className="tableresponsive">
                  <DataTable
                    columns={columnsCountryRegCompany}
                    data={countryRegCompanyData}
                    fixedHeader
                    selectableRowsHighlight
                    highlightOnHover
                    pagination
                    customStyles={customTableStyles}
                  />
                </div>
              </>
            ) : (
              <>
                {countryEmployee === true ? (
                  <>
                    <h4 className="text-center mt-4">
                      <u>Total Employee</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsCountryEmployee}
                        data={countryEmpData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-center mt-4">
                      <u>Total User</u>
                    </h4>
                    <div className="tableresponsive">
                      <DataTable
                        columns={columnsCountryTotalUser}
                        data={TotalCountryUserData}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        customStyles={customTableStyles}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </StyledTabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default AdminDashboard;
