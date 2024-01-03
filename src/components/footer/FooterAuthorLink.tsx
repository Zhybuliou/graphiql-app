import React from 'react';
import { Link } from 'react-router-dom';
import { IconGitHub } from '../ui/icons/IconGitHub';

export default function FooterAuthorLink({
  link,
  name,
  className,
}: {
  link: string;
  name: string;
  className: string;
}) {
  return (
    <Link to={link} className={className}>
      <IconGitHub className="w-8 h-8 mr-2" />
      <p>{name}</p>
    </Link>
  );
}
