import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-green-700">
        About Coconut BD
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">About Our Shop</h2>
            <p className="text-gray-700 leading-relaxed">
              🥥 Coconut BD is your one-stop shop for fresh coconuts, coconut
              oil, and tropical products. We are dedicated to providing the
              highest quality natural products delivered straight to your home.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We value your privacy. Any information collected through our
              website, including contact details or orders, is securely stored
              and never shared with third parties without your consent.
            </p>
          </section>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 space-y-6">
          {/* Contact Form */}
          <div className=" p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-amber-100 p-2 rounded w-full"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="bg-amber-100 p-2 rounded w-full"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Helpline Number */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Helpline</h3>
              <p className="text-gray-700 text-lg">📞 +880 1234 567 890</p>
            </div>

            {/* Map */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <iframe
                title="Coconut BD Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.406!3d23.810!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f0a0e0e0e1%3A0xabcdef1234567890!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                width="100%"
                height="250"
                className=" rounded-3xl"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
