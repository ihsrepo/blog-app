import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="flex w-full justify-start space-x-8">
        <Link
          to="/"
          className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
        >
          Create
        </Link>
      </header>
      {pathname === "/" && (
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl pt-6">
          Blog
        </h2>
      )}
      {pathname.includes("edit") && (
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl pt-6">
          Edit
        </h2>
      )}
      {pathname.includes("create") && (
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl pt-6">
          Create
        </h2>
      )}
    </>
  );
};
