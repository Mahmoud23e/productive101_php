"use client";
import Image from "next/image";
import GetStartedBtn from "../../UI/GetStartedBtn";
import { motion } from "framer-motion";
import Header from "../../UI/Header";
import Link from "next/link";

export const fadeUpAnimationVariant = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-[0px]">
      <Hero />
      <Features />
      <WhyChooseSection />
      <Footer />
    </div>
  );
}

const featuresData = [
  {
    title: "Pomodoro Timer",
    body: "Boost your focus with the scientifically-proven Pomodoro technique. Break work into intervals, track your progress, and stay efficient.",
    href: "/Timer",
    image: "/images/Timer.png",
    emoji: "🕛",
  },
  {
    title: "Notes Taking",
    body: "Quickly jot down your thoughts, ideas, or meeting notes. Organize everything in one place and never miss an important detail again.",
    href: "/Notes",
    image: "/images/Timer.png",
    emoji: "📒",
  },
  {
    title: "To-do List",
    body: "Plan your tasks, prioritize, and check them off as you go. Stay on top of your day, every day.",
    href: "/Todo",
    image: "/images/Notes.jpg",
    emoji: "✔️",
  },
];

function Hero() {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap w-full px-[20px]">
      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, delay: 0 }}
        className="w-full border overflow-hidden rounded-[20px] bg-[url('/images/pexels-monstera-3363098.jpg')] bg-cover bg-center h-[85vh]">
        <div className="w-full h-full backdrop-blur-sm bg-[#1f2225c0] flex flex-col items-center justify-center gap-36 px-14 text-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <motion.h1
              variants={fadeUpAnimationVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[70px] font-bold leading-snug text-white">
              Maximize Your Productivity with{" "}
              <span className="text-[80px]">Productive 101 🙌</span>
            </motion.h1>
            <motion.p
              variants={fadeUpAnimationVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-white w-[80%]">
              Stay focused, organized, and on track with a simple, all-in-one
              productivity tool that combines time management, task tracking,
              and note-taking in one place. Whether you’re managing your daily
              tasks or working on long-term goals, this app helps you stay
              efficient and in control.
            </motion.p>
          </div>
          <motion.div
            variants={fadeUpAnimationVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.4, delay: 0.3 }}>
            <GetStartedBtn className="px-10 text-xl font-bold bg-white transition-all hover:text-white" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ item, index }) {
  return (
    <div className="w-full flex even:flex-row-reverse items-center justify-center flex-wrap gap-20 mt-20">
      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-start gap-5 justify-between h-full basis-[400px] grow text-start ">
        <div
          className={`font-extrabold  text-[50px] flex  items-end justify-end rounded-full w-full p-2 pr-10 gap-5 ${
            index !== 1 ? "flex-row-reverse" : "flex"
          }`}>
          <div className="rounded-full grow text-center bg-gradient-to-r from-[#ffffff] to-[#b3b3b3]">
            {item.emoji}
          </div>
          <span className="flex items-center justify-center text-[100px] border rounded-full p-3 w-[200px] h-[200px]">
            #{index + 1}
          </span>
        </div>
        <div className="w-full flex items-center  justify-center gap-5">
          <h3 className="font-bold text-[40px]">{item.title}</h3>
          <hr className="border-none outline-none h-[1px] grow bg-[#F2F2F0] mt-3" />
        </div>

        <p className="px-2">{item.body}</p>
        <Link
          href={item.href}
          className={`rounded-full ${
            index === 1 ? "flex-row-reverse self-end" : "flex"
          } flex items-center justify-between gap-2 px-6 py-2 border font-bold transition-w hover:w-full w-40 duration-[350ms]`}>
          <span>Try it</span>
          <span className="">{index === 1 ? "👈" : "👉"}</span>
        </Link>
      </motion.div>
      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-3xl overflow-hidden basis-[400px] grow">
        <Image
          src={item.image}
          alt="Timer"
          width={800}
          height={801}
          quality={100}
        />
      </motion.div>
    </div>
  );
}

function Features() {
  return (
    <motion.div
      variants={fadeUpAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="w-full py-10 px-[40px] bg-[#1F2225] text-[#F2F2F0]">
      <Header>Features that Keep You Ahead</Header>
      <div className="flex flex-col items-center justify-center gap-10">
        {featuresData.map((item, i) => (
          <Feature key={i} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function WhyChooseSection() {
  return (
    <section className="w-full flex flex-col px-[40px] items-center justify-center gap-10 py-20">
      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center">
        <h1 className="text-[50px] font-extrabold">
          Why Choose <span className="text-gradient">Our App</span>?
        </h1>
        <p className="text-[20px] mt-5">
          Stay focused, get organized, and achieve more with our productivity
          app. Explore its features and customize it to suit your needs.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

const reasons = [
  {
    title: "Seamless Workflow",
    description:
      "Switch between tasks, notes, and the Pomodoro timer effortlessly.",
    icon: "💼",
  },
  {
    title: "Minimalist Design",
    description:
      "A clean, intuitive interface to keep you focused on what matters.",
    icon: "🎨",
  },
  {
    title: "Fully Customizable",
    description: "Tailor your workspace to your unique needs.",
    icon: "⚙️",
  },
  {
    title: "Across Devices",
    description: "Access your notes and tasks on the go, wherever you are.",
    icon: "📱",
  },
];

function ReasonCard({ reason, index }) {
  return (
    <motion.div
      variants={fadeUpAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.4, delay: index * 0.2 }}
      className="p-8 bg-white border-2  shadow-lg rounded-[50px] flex flex-col items-center justify-center text-center gap-5">
      <div className="text-[50px] border-b  border-black w-full">
        {reason.icon}
      </div>
      <h3 className="text-[30px] font-bold">{reason.title}</h3>
      <p className="text-[18px]">{reason.description}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.footer
      variants={fadeUpAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="w-full bg-[#1F2225] text-[#F2F2F0] py-10 px-[40px] mt-10">
      <motion.div
        variants={fadeUpAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-center md:text-left">
          <h2 className="text-[40px] font-extrabold leading-snug">
            Stay Organized with{" "}
            <span className="text-gradient">Productive 101</span>
          </h2>
          <p className="text-[18px] mt-3">
            Manage tasks, track time, and take notes efficiently.
          </p>
        </div>
        <motion.div
          variants={fadeUpAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.3 }}>
          <Link
            href="/GetStarted"
            className="px-10 py-4 bg-white text-[#1F2225] font-bold rounded-full transition-all hover:bg-[#F2F2F0]">
            Get Started Now
          </Link>
        </motion.div>
      </motion.div>

      <div className="border-t border-[#F2F2F0] mt-10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <nav className="flex gap-5">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/Features" className="hover:underline">
              Features
            </Link>
            <Link href="/Pricing" className="hover:underline">
              Pricing
            </Link>
            <Link href="/Contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
        <p className="text-center text-[16px] mt-5">
          &copy; 2024 Productive 101. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}
