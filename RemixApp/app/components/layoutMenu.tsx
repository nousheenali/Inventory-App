import { Link } from "@remix-run/react";

export function LayoutMenu() {
  const links = [
    { to: "/", text: "HOME" },
    { to: "/Product", text: "ADD PRODUCT" },
    { to: "/Category", text: "ADD CATEGORY" },
    { to: "/ListCategories", text: "VIEW CATEGORIES" },
    { to: "/ListProducts", text: "VIEW PRODUCTS" },
  ];
  return (
    <nav className="bg-gray-800 p-4 flex justify-center">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="text-white mx-20 hover:text-yellow-400 hover:underline"
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
