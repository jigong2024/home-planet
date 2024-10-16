import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser(); // 현재 로그인한 사용자의 정보를 가져오기
      if (user) {
        setUserId(user.id); // userId를 state에 설정
      }
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useUserId;
