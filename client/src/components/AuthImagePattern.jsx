const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col w-1/2 h-full items-center justify-center bg-base-300 px-12 py-4 rounded-lg">
      <div className=" w-[60%] h-[85%] grid grid-cols-3 grid-rows-3 gap-3 mb-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`w-full h-full rounded-md bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""}`}
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">{title}</h2>

      {/* Subtitle */}
      <p className="text-base-content/60">{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;
