import React from "react";

export default function Header() {
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
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
