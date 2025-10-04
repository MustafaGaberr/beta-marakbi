const Stats = () => {
  return (
    <section className="relative py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/image 3.png"
          alt="Stats Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Stats Cards */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Boat Owners */}
          <div className="w-full h-52 bg-purple-700 rounded-2xl flex flex-col justify-center items-center shadow-lg">
            <div className="text-white text-4xl md:text-6xl font-bold font-poppins capitalize">100 +</div>
            <div className="text-white text-lg md:text-2xl font-normal font-poppins capitalize text-center">Boat Owners</div>
          </div>

          {/* Water Activities */}
          <div className="w-full h-52 bg-orange-300 rounded-2xl flex flex-col justify-center items-center shadow-lg">
            <div className="text-white text-4xl md:text-6xl font-bold font-poppins capitalize">100 +</div>
            <div className="text-white text-lg md:text-2xl font-normal font-poppins capitalize text-center">water Activities</div>
          </div>

          {/* Available Trips */}
          <div className="w-full h-52 bg-teal-500 rounded-2xl flex flex-col justify-center items-center shadow-lg">
            <div className="text-white text-4xl md:text-6xl font-bold font-poppins capitalize">157 +</div>
            <div className="text-white text-lg md:text-2xl font-normal font-poppins capitalize text-center">available trips</div>
          </div>

          {/* Trips Done */}
          <div className="w-full h-52 bg-red-500 rounded-2xl flex flex-col justify-center items-center shadow-lg">
            <div className="text-white text-4xl md:text-6xl font-bold font-poppins capitalize">10 +</div>
            <div className="text-white text-lg md:text-2xl font-normal font-poppins capitalize text-center">trips done</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;