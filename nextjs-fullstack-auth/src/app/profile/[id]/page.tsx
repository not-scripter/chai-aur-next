"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function page({ params }: any) {
  const [user, setuser] = useState<any>(null);

  const getUser = async () => {
    const response = await axios.post(`/api/users/getUser`, {
      userId: params.id,
    });
    setuser(response.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (
      <form className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold">User not Found</h1>
      </form>
    );
  }

  return (
    <form className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <h2 className="flex justify-between p-4 w-full">
        UserId: <span>{user._id}</span>
      </h2>
      <h2 className="flex justify-between p-4 w-full">
        Username: <span>{user.username}</span>
      </h2>
    </form>
  );
}
