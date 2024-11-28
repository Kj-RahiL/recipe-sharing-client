
import React, { Suspense } from "react";
import LoginForm from "./LoginFrom";
import bgLogin from "../../../../public/assets/recipe2.jpg";

const LogInPage = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgLogin.src})` }}
      >
        <LoginForm/>
      </div>
    </Suspense>
  );
};

export default LogInPage;
