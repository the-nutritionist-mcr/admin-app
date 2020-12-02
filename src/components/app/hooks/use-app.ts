import { Auth, Hub } from "aws-amplify";
import React from "react";
import { errorSelector } from "../../../lib/rootReducer";
import useDeepCompareEffect from "use-deep-compare-effect";
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

const getUser = async (): Promise<User | undefined> => {
  try {
    const currentUser: AmplifyUser = await Auth.currentAuthenticatedUser();
    const payload = currentUser.signInUserSession?.accessToken?.payload;
    return payload
      ? {
          groups: payload["cognito:groups"],
          username: payload["cognito:username"],
          email: payload["cognito:email"],
        }
      : undefined;
  } catch {
    return undefined;
  }
};

interface AppComponentState {
  error?: string;
  user?: User;
}

export const useApp = (): AppComponentState => {
  const [user, setUser] = React.useState<User | undefined>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const error = useSelector(errorSelector);

  const listener = async (): Promise<void> => {
    setUser(await getUser());
  };

  useDeepCompareEffect(() => {
    Hub.listen("auth", listener);
    (async (): Promise<void> => {
      setUser(await getUser());
    })();
    return (): void => Hub.remove("auth", listener);
  }, [user ?? {}]);

  return {
    error,
    user,
  };
};

export default useApp;
