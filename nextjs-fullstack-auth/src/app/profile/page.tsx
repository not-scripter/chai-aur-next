"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [data, setdata] = useState<any>(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(`/api/users/me`);
      setdata(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onLogout = async () => {
    try {
      await axios.get(`/api/users/logout`);
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <hr />
      {data && (
        <>
          <div className="flex justify-between p-4 w-full">
            <h2>Username: {data.username}</h2>
          </div>
          <Link
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            href={`/profile/${data._id}`}
          >
            View your Profile
          </Link>
        </>
      )}
      <hr />
      <button
        type="button"
        onClick={onLogout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
    </div>
  );
}
