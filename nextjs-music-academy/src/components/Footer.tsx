"use client";

import Link from "next/link";

interface quickLink {
  title: string;
  slug: string;
}
interface followUs {
  name: string;
  slug: string;
}

const footerItems = {
  quickLinks: [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "About",
      slug: "/about",
    },
    {
      title: "Courses",
      slug: "/courses",
    },
    {
      title: "Contact Us",
      slug: "/contact-us",
    },
  ],
  followUs: [
    {
      name: "Facebook",
      slug: "/",
    },
    {
      name: "X",
      slug: "/",
    },
    {
      name: "Instagram",
      slug: "/",
    },
    {
      name: "LinkedIn",
      slug: "/",
    },
  ],
};
export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            Music School is a premier institution dedicated to teaching the art
            and science of music. We nurture talent from the ground up,
            fostering a vibrant community of musicians.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          {footerItems.quickLinks.map((item: quickLink) => (
            <Link
              href={item.slug}
              className="flex flex-col hover:text-white transition-colors duration-300"
              key={item.slug}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow us</h2>
          {footerItems.followUs.map((item: followUs) => (
            <Link
              href={item.slug}
              className="flex flex-col hover:text-white transition-colors duration-300"
              key={item.slug}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>New Delhi, India</p>
          <p>Delhi 10001</p>
          <p>Email: info@musicschool.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <p className="text-center text-xs pt-8">
        © 2024 Music School. All rights reserved.
      </p>
    </footer>
  );
}
