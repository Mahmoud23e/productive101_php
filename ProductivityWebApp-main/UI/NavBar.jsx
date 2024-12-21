"use client";
import Link from "next/link";
import GetStartedBtn from "./GetStartedBtn";
import { motion } from "framer-motion";
import { fadeUpAnimationVariant } from "@/app/page";
function NavBar() {
  return (
    <div className="w-full p-4 py-6 flex items-center justify-around bg-transparent">
      <Link href="/" className="text-3xl font-bold">
        Productive <span className="text-2xl">101</span>
      </Link>
      <ul
        role="list"
        className="flex items-center justify-center gap-5 capitalize text-lg transition-all">
        <Link
          href="/"
          className="cursor-pointer hover:font-bold transition-all">
          Home 🏠
        </Link>
        <li className="cursor-pointer transition-all relative group">
          App 🖥️
          <div className="fade trnasfrom -translate-x-[50%] left-1/2 top-0 absolute hidden z-10 shadow-lg text-white bg-black/[0.6] backdrop-blur-sm rounded-[20px] flex-col items-start p-5 justify-center gap-2 group-hover:flex w-max">
            <Link
              href="/Notes"
              className="flex items-start justify-between w-full gap-5  hover:translate-x-1 transition-all">
              Notes <span>📒</span>
            </Link>
            <Link
              className="flex items-start justify-between w-full gap-5 hover:translate-x-1 transition-all "
              href="/Timer">
              Pomodoro Timer
              <span>🕛</span>
            </Link>
            <Link
              className="flex items-start justify-between w-full gap-5 hover:translate-x-1 transition-all "
              href="/Todo">
              To-Do List <span>✔️</span>
            </Link>
          </div>
        </li>

        <Link
          href="/contact-us"
          className="cursor-pointer hover:font-bold transition-all">
          Contact Us 🤙
        </Link>
      </ul>
      <div className="">
        <GetStartedBtn className="text-white" />
      </div>
    </div>
  );
}

export default NavBar;
