"use client";
import Input from "@/components/Input";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn } from "next-auth/react";
import { compare } from "bcrypt";
import { useRouter } from "next/router";

type ErrorCheck = {
  [key: string]: any;
  // response: Object;
};

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [username, setUsername] = useState("");
  const [errorCheck, setErrorCheck] = useState<ErrorCheck>();
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  const notify = () => {
    toast("Please fill up the details given below before proceed", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const register = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const user = await axios.post("/api/register", {
          email,
          username,
          password,
        });
      } catch (error) {
        console.log(error);

        setErrorCheck(error!);
      }
    },
    [email, username, password]
  );

  const login = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        const result = await signIn("credentials", {
          email: email,
          password: password,
          // callbackUrl: "/profiles",
          redirect: false,
        });
        console.log(result);
        if (result?.status !== 200) {
          setFlag(true);
          console.log("Error");
        } else {
          router.push("/profiles");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [email, password]
  );

  const toggleVariant = useCallback(() => {
    setVariant((varian) => (varian === "register" ? "login" : "register"));
    setEmail("");
    setPassword("");
    setUsername("");
    setFlag(false);
    setErrorCheck([]);
  }, [email, password, username]);

  return (
    <div className="relative top-0 bg-no-repeat bg-cover bg-fixed bg-[url('/images/hero-background.jpg')] w-screen h-screen ">
      <nav className="flex flex-row items-center bg-[#050614] justify-between px-20">
        <div className="relative h-20 w-20">
          <Image src={"/images/logo.svg"} className="" fill alt="logo" />
        </div>
        <button
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-white    "
          onClick={notify}
        >
          <span className="absolute w-64 h-0 transition-all duration-500 group-hover:origin-center origin-center rotate-90 -translate-x-[98px]   bg-white top-2/3 group-hover:h-64 group-hover:-translate-y-32 ease-in-out"></span>
          <span className="relative text-white transition duration-300 group-hover:text-black ease">
            Sign up
          </span>
        </button>
      </nav>
      <div className="md:w-[470px] relative top-[24%] mx-auto translate-y-[-24%] bg-black/60  flex flex-col px-16 py-12">
        <h2 className="text-white text-4xl font-medium pb-8">
          {variant === "login" ? "Sign in" : "Register"}
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => (variant === "login" ? login(e) : register(e))}
        >
          <div className="flex flex-col gap-4 relative bottom-5">
            {variant !== "login" && (
              <Input
                label="Username"
                id="username"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            )}
            <Input
              label="Email"
              id="email"
              type="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          {errorCheck?.response?.status === 422 && (
            <p className="absolute top-[290px] duration-200 transform transition-all ease-out text-[14px] text-red-500 left-[80px] ">
              {errorCheck?.response?.data?.error}
            </p>
          )}
          {flag && (
            <p className="absolute top-[225px] duration-200 transform transition-all ease-out text-[14px] text-red-500 left-[80px] ">
              Email or Password entered wrong
            </p>
          )}
          <button
            className="bg-white bg-gradient-to-tr hover:from-pink-400 transform duration-500 ease-out transition hover:to-indigo-400 p-2 rounded hover:bg-[#050614] hover:text-white"
            type="submit"
          >
            {variant === "login" ? "Login" : "Sign up"}
          </button>
        </form>
        <p className="text-white text-center py-2">Or</p>
        <div className="w-full group relative ">
          <div className="flex group justify-center relative  items-center rounded-full transform duration-500 ease-out transition cursor-pointer  w-[100px]  mx-auto  group-hover:bg-indigo-500">
            <button className="bg-white rounded-full">
              <Icon
                width={38}
                className="py-1 rounded-full"
                icon="flat-color-icons:google"
              />
            </button>
          </div>
        </div>
        <p className="text-neutral-500 text-center pb-10 cursor-default text-sm relative top-10">
          {variant !== "register"
            ? "First time using Disney+hotstar?"
            : "Already have an account?"}
          <span
            className="text-white ml-1 hover:underline cursor-pointer"
            onClick={toggleVariant}
          >
            {variant !== "register" ? "Create an Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
