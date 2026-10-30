const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <a href="/">
        <img src="/assets/logos/logo.png" alt="logo" className="w-28" />
      </a>
      <h1 className=" text-gray-700 font-bold">Welcome to ekazi portal</h1>
    </div>
  );
};

export default AuthLogo;
