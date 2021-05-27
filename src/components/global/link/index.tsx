import React from "react";
import { Link } from "react-router-dom";

interface PageLinkInterface {
  path: string;
  className?: any;
  children: any;
  key?: string;
}

export const PageLink = ({
  path,
  className,
  children,
  key,
}: PageLinkInterface) => {
  return (
    <Link key={key} to={path} className={className}>
      {children}
    </Link>
  );
};
