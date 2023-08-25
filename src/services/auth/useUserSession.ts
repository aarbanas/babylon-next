import { useEffect, useState } from "react";

import { useCurrentUser } from "./currentUser";
import { UserDto } from "../user/dto/user.dto";
import findOne from "../user/findOne";

export const useUserSession = () => {
  const user = useCurrentUser();
  const [userSession, setUserSession] = useState<UserDto | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      if (user?.sub) {
        const data = await findOne(user?.sub);

        return setUserSession(data);
      }

      return null;
    };

    fetchUserSession();
  }, [user]);

  return userSession;
};