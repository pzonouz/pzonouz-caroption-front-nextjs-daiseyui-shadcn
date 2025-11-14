"use client";

import Link from "next/link";
import { Search } from "../Shared/Search";

const Navbar = () => {
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem instanceof HTMLElement) {
      elem?.blur();
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={1}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 leading-10 shadow"
          >
            <li onClick={handleClick}>
              <Link href={"/"}>خانه</Link>
            </li>
            <li onClick={handleClick}>
              <Link href={"/products"}>محصولات</Link>
            </li>
            <li onClick={handleClick}>
              <Link href={"/articles"}>مقالات</Link>
            </li>
            <li onClick={handleClick}>
              <Link href={"/aboutus"}>درباه ما</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">
          کارآپشن
        </Link>
      </div>
      <div className="navbar-end">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
