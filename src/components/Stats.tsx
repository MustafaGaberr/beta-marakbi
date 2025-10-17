const Stats = () => {
  return (
    <section className="relative py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/wmap.png"
          alt="World Map Background"
          className="w-[1600px] h-[300px] object-contain"
        />
      </div>

      {/* Stats Cards */}
      <div className="relative container mx-auto px-4 mt-16 mb-16">
        <div className="flex justify-center gap-6 max-w-6xl mx-auto">
            {/* Boat Owners */}
            <div className="w-64 h-46 bg-purple-700 rounded-2xl flex flex-col justify-center items-center shadow-lg ">
              <div className="text-white text-[66px] font-bold font-poppins capitalize break-words">100 +</div>
              <div className="text-white text-[23px] font-normal font-poppins text-center capitalize break-words">Boat Owners</div>
            </div>

            {/* Water Activities */}
            <div className="w-64 h-46 bg-orange-300 rounded-2xl flex flex-col justify-center items-center shadow-lg mt-16">
              <div className="text-white text-[66px] font-bold font-poppins capitalize break-words">100 +</div>
              <div className="text-white text-[23px] font-normal font-poppins text-center capitalize break-words">Water Activities</div>
            </div>

            {/* Available Trips */}
            <div className="w-64 h-46 bg-teal-500 rounded-2xl flex flex-col justify-center items-center shadow-lg">
              <div className="text-white text-[66px] font-bold font-poppins capitalize break-words">157 +</div>
              <div className="text-white text-[23px] font-normal font-poppins text-center capitalize break-words">Available Trips</div>
            </div>

            {/* Trips Done */}
            <div className="w-64 h-46 bg-red-500 rounded-2xl flex flex-col justify-center items-center shadow-lg mt-16">
              <div className="text-white text-[66px] font-bold font-poppins capitalize break-words">10 +</div>
              <div className="text-white text-[23px] font-normal font-poppins text-center capitalize break-words">Trips Done</div>
            </div>
        </div>
      </div>

    </section>
  );
};

export default Stats;