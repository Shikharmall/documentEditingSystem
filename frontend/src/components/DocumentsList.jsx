import React from "react";
import { Link } from "react-router-dom";

export default function DocumentsList({ data }) {
 
  return (
    <>
      <div className="flex flex-col items-center">
        {data && data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <div
                style={{
                  width: "50%",
                }}
                className="border border-2 border-solid border-teal-500 m-2 p-4 rounded flex "
                key={index}
              >
                <div className="flex-1 flex items-center uppercase">
                  {item?.name}
                </div>
                <div className="flex-2">
                  <Link className="cursor-pointer text-teal-300 underline" to={`/document/${item._id}`}>
                    {" "}
                    Open{" "}
                  </Link>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
