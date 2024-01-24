import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { getDocumentAssignAPI } from "../Api/DocumentAPI/DocumentAPI";

export default function DocumentHeader() {
  const { document_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) {
      closeModal();
    }
  }, []);

  const [isLoginPage, setIsLoginPage] = useState(true);

  const location = useLocation();
  const { pathname } = location;

  const loginPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const [data, setData] = useState("");

  const getDocumentAssignFunc = (document_id) => {
    try {
      getDocumentAssignAPI(document_id).then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data);
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (document_id) {
      getDocumentAssignFunc(document_id);
    }
  }, [document_id]);

  console.log(data);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2 text-white"
            width="54"
            height="54"
            viewBox="-0.32 0 41.633 41.633"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="word"
              d="M525.849,346.772a2.763,2.763,0,0,1-2.375,2.016,150.4,150.4,0,0,1-20.195.918l-6.378,5.513h-.534a1.695,1.695,0,0,1-3.329,0h-.088l0-6.088c-1.15-.1-2.3-.212-3.449-.342a2.763,2.763,0,0,1-2.375-2.016,92.124,92.124,0,0,1,0-28.833,2.763,2.763,0,0,1,2.375-2.016,150.236,150.236,0,0,1,33.97,0,2.763,2.763,0,0,1,2.375,2.016A92.124,92.124,0,0,1,525.849,346.772Zm-26.63-16.8A2.735,2.735,0,1,0,502,332.7,2.758,2.758,0,0,0,499.219,329.969Zm13.875,0a2.735,2.735,0,1,0,2.781,2.734A2.758,2.758,0,0,0,513.094,329.969Z"
              transform="translate(-485.994 -314.961)"
              fill="#ffffff"
            />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            Document Editing System
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
          <div className="text-sm lg:flex-grow">
            <Link
              to={{ pathname: `/` }}
              className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${
                pathname === "/"
                  ? "text-white hover:text-teal-200"
                  : "text-teal-200"
              }`}
            >
              New Docs
            </Link>
            <Link
              to={{ pathname: `/document/:document_id` }}
              className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${
                pathname.includes("/alldocument/")
                  ? "text-white hover:text-teal-200"
                  : "text-teal-200"
              }`}
            >
              All Docs
            </Link>
          </div>

          {pathname.includes("document") ? (
            <div>
              <div class="flex -space-x-4 rtl:space-x-reverse">
                {data &&
                  data.map((item, index) => (
                    <a class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 flex justify-center items-center bg-teal-400 uppercase">
                      {item?.user_id?.name?.substring(0, 2)}
                    </a>
                  ))}

                {data && data.length > 2 ? (
                  <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                    {data.length - 2}+1
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          <div>
            <svg
              fill="#ffffff"
              className="w-8 h-8 cursor-pointer"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              //onClick={openModal}
            >
              <path
                fillRule="evenodd"
                d="M6.03531778,18.739764 C7.62329979,20.146176 9.71193925,21 12,21 C14.2880608,21 16.3767002,20.146176 17.9646822,18.739764 C17.6719994,17.687349 15.5693823,17 12,17 C8.43061774,17 6.32800065,17.687349 6.03531778,18.739764 Z M4.60050358,17.1246475 C5.72595131,15.638064 8.37060189,15 12,15 C15.6293981,15 18.2740487,15.638064 19.3994964,17.1246475 C20.4086179,15.6703183 21,13.9042215 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,13.9042215 3.59138213,15.6703183 4.60050358,17.1246475 Z M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M8,10 C8,7.75575936 9.57909957,6 12,6 C14.4141948,6 16,7.92157821 16,10.2 C16,13.479614 14.2180861,15 12,15 C9.76086382,15 8,13.4273743 8,10 Z M10,10 C10,12.2692568 10.8182108,13 12,13 C13.1777063,13 14,12.2983927 14,10.2 C14,8.95041736 13.2156568,8 12,8 C10.7337387,8 10,8.81582479 10,10 Z"
              />
            </svg>
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {isLoginPage ? (
                  <Login loginPage={loginPage} closeModal={closeModal} />
                ) : (
                  <Register loginPage={loginPage} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}