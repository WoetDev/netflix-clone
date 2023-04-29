import React from "react";

interface NavBarItemsProps {
  label: string;
}

const NavBarItem: React.FC<NavBarItemsProps> = ({ label }) => {
  return (
    <div className="text-white transition cursor-pointer hover:text-gray-300">
      {label}
    </div>
  );
};

export default NavBarItem;
