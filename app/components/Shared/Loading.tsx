const Loading = () => {
  return (
    <div className=" h-screen w-screen bg-gray-100 opacity-80 fixed grid place-items-center z-30">
      <div className="loading loading-spinner w-24 h-24 text-center absolute"></div>
    </div>
  );
};

export default Loading;
