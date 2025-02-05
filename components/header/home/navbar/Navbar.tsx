import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="flex justify-center mt-4">
          <ul className="navbar-container mx-auto overflow-hidden bg-[var(--secondary-color)]">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li className="dropdown">
              <a className="dropbtn">Resources</a>
              <div className="dropdown-content">
                <Link href="#">Link 1</Link>
                <Link href="#">Link 2</Link>
                <Link href="#">Link 3</Link>
              </div>
            </li>
            <li>
              <Link href="/user/login">Login</Link>
            </li>
            <li>
              <Link href="/user/register">Sign Up Free</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
