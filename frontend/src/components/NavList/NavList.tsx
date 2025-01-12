import React from 'react';
import { FaRobot } from 'react-icons/fa';
import { GrDocumentTest } from 'react-icons/gr';
import NavItem from './NavItem';

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navList: NavItemType[] = [
    {
      id: 1,
      label: 'AutoTest',
      link: '/',
      icon: <FaRobot className="size-5" />,
    },
    {
      id: 2,
      label: 'Test Result',
      link: '/test-result',
      icon: <GrDocumentTest className="size-5" />,
    },
  ];
  return (
    <div className="mt-12">
      {navList.map((navItem) => {
        return (
          <NavItem
            label={navItem.label}
            link={navItem.link}
            icon={navItem.icon}
            key={navItem.id}
          />
        );
      })}
    </div>
  );
};

export default NavList;
