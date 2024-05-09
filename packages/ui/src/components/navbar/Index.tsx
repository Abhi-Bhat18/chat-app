import React from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import Logo from "./Logo";
import Navigations from "./Navigations";
import Searchbar from "./Searchbar";
import AvatarComponent from "../avatar/Avatar";

const avatarUrl = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'

const Navbar = () => {
  return (
    <nav className="w-full py-2 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5">
        <div className="flex space-x-10 items-center">
          <Logo width={60} height={60} />
          <Searchbar />
        </div>
        <div className="flex space-x-10 items-center">
          <Navigations />
          <AvatarComponent url={avatarUrl}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
