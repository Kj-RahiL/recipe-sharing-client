import React, { Suspense } from "react";
import LoginFrom from "./LoginFrom";

const LogInPage = () => {
  return<Suspense fallback={<div>Loading...</div>}>
  <LoginFrom />
</Suspense>;
};

export default LogInPage;
