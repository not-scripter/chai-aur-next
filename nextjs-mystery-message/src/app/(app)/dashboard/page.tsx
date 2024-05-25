"use client";

import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { AcceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const { toast } = useToast();

  const [messages, setmessages] = useState<Message[]>([]);
  const [isloading, setisloading] = useState(false);
  const [isSwitchLoading, setisSwitchLoading] = useState(false);

  const handleMessageDelete = (messageId: string) => {
    setmessages(messages.filter((message) => message?._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessagesSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setisSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "failed to fetch message settings",
          variant: "destructive"
      });
    }
  }, [setValue]);

  return <div>Dashboard</div>;
}
