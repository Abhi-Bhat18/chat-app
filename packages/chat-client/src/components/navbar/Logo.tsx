import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  width: number;
  height: number;
}
import logo from "../../../public/ChatC.png";

const Logo: React.FC<Props> = ({ width = 50, height = 50 }) => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          className="rounded-full"
          src={logo}
          width={width}
          height={height}
          alt="ChatC Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
