import React from "react";
import NavItem from "./NavItem";
const navigations = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Chat",
    link: "/chat",
  },
];

const Navigations = () => {
  return (
    <ul className="flex space-x-2">
      {navigations.map((nav, index) => (
        <NavItem key={index} name={nav.name} link={nav.link} />
      ))}
    </ul>
  );
};

export default Navigations;
