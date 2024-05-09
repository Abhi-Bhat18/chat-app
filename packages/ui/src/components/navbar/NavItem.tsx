import React from "react";
import Link from "next/link";
interface Props {
  link: string;
  name: string;
}
const NavItem: React.FC<Props> = ({ name, link }) => {
  return (
    <li className="font-sans font-medium text-lg">
      <Link href={link}> {name} </Link>
    </li>
  );
};

export default NavItem;
