import React from "react";
import { Link } from "react-router-dom";

export default function DocumentsList() {
  return (
    <>
      <div className="w-full">
        <div>
          <Link
            className="border border-2 border-solid border-teal-500 m-2 rounded cursor-pointer w-full"
            to={`/`}
          >
            {" "}
            heloo34{" "}
          </Link>
        </div>
        <div>
          <Link
            className="border border-2 border-solid border-teal-500 m-2 rounded cursor-pointer w-full"
            to={`/`}
          >
            {" "}
            heloo34{" "}
          </Link>
        </div>
        <div>
          <Link
            className="border border-2 border-solid border-teal-500 m-2 rounded cursor-pointer w-full"
            to={`/`}
          >
            {" "}
            heloo34{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
