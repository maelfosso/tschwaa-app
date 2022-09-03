import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Protected: NextPage = (): JSX.Element => {
  const { data, status } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth/sign-in")
    }
  });

  if (status === "authenticated") {
    return (
      <div>
        This is Protected for special people. {"\n"}
        {JSON.stringify(data.user, null, 2)}
      </div>
    );
  }

  return (
    <div>Loading ...</div>
  );
}

export default Protected;
