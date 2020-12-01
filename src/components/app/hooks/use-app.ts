import { Auth, Hub } from "aws-amplify";
import React from "react";
import { errorSelector } from "../../../lib/rootReducer";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface User {
  groups: string[];
  email: string;
  username: string;
}

interface AmplifyUser {
  signInUserSession?: {
    accessToken?: {
      payload?: {
        "cognito:groups": string[];
        "cognito:username": string;
        "cognito:email": string;
      };
    };
  };
}

const getUser = async (): Promise<AmplifyUser | undefined> => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
};

interface AppComponentState {
  error?: string;
  user?: User;
  location: ReturnType<typeof useLocation>;
}

export const useApp = (): AppComponentState => {
  const [user, setUser] = React.useState<User | undefined>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const error = useSelector(errorSelector);
  const location = useLocation();

  useDeepCompareEffect(() => {
    (async (): Promise<void> => {
      const payload = (await getUser())?.signInUserSession?.accessToken
        ?.payload;

      setUser(
        payload
          ? {
              groups: payload["cognito:groups"],
              username: payload["cognito:username"],
              email: payload["cognito:email"],
            }
          : undefined
      );
    })();
  }, [user ?? {}]);

  return {
    error,
    location,
    user,
  };
};

export default useApp;
