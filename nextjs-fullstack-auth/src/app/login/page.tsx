"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setloading] = useState(false);

  const onLogin = async () => {
    try {
      await axios.post(`/api/users/login`, user);
      toast.success("Login Success");
      router.push(`/profile`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <form
      onSubmit={onLogin}
      className="flex flex-col items-center justify-center min-h-screen py-2 px-8"
    >
      <h1 className="text-4xl font-bold pb-8">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <label htmlFor="email" className="left-0 w-full">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="Enter your Email Address"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
      />
      <label htmlFor="password" className="w-full left-0">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="Enter your Password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
      />
      <button
        type="submit"
        disabled={buttonDisabled}
        className={`py-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "opacity-50" : "opacity-100"}`}
      >
        Login
      </button>
      <p>
        Not have an Account ?{" "}
        <Link href={"/sign-up"} className="text-blue-400">
          SignUp
        </Link>
      </p>
    </form>
  );
}
