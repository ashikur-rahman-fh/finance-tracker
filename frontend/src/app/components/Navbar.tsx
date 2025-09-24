import React from "react";

import Image from "next/image";
import Link from "next/link";

const MenuItem = ({ name, link }: { name: string, link: string }) => {
  return (
    <React.Fragment>
      <Link href={link}>
        <span className="px-2 rounded-2xl hover:bg-emerald-600 hover:text-white">{name}</span>
      </Link>
    </ React.Fragment>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-emerald-200 p-2 rounded-sm shadow-gray-300 shadow-xl fixed w-dvw h-[50px] flex items-center">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={140}
            height={120}
          />
        </Link>
        <div className="flex items-center gap-4 text-md">
          <MenuItem name="Accounts" link="/accounts" />
          <MenuItem name="Category" link="/categories" />
          <MenuItem name="Transactions" link="/transactions" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
