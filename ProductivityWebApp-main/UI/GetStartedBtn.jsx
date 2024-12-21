function GetStartedBtn({ className }) {
  return (
    <button
      className={`px-5 py-2 bg-black rounded-full  flex items-center justify-center gap-4 hover:bg-black ${className}`}>
      Get Started <span className="">✨😁</span>
    </button>
  );
}

export default GetStartedBtn;
