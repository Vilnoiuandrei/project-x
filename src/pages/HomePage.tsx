function Homepage() {
  return (
    <div
      className="h-screen font-semibold"
      style={{
        backgroundImage: "url(/img/f40img.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section>
        <div className="  flex items-center justify-center">
          <h1 className="mt-16 text-5xl font-bold md:text-7xl">
            Welcome to <span className="text-red-600">Car</span>Hub
          </h1>
        </div>
        <div className="mt-28 px-14">
          <p className="mb-4  text-2xl  md:text-4xl">
            Explore our vast collection of car specifications, browse through
            stunning images, and connect with fellow enthusiasts. At CarHub,
            we're passionate about cars, and we're here to fuel your passion
            too.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
