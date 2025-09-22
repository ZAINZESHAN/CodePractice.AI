import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#002244] text-white py-8 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Campus Recruitment System
          </h3>
          <p className="text-sm text-gray-300 leading-6">
            Helping students and companies connect seamlessly for better career
            opportunities and hiring experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300">
            Email: zainzeeshan@gmail.com
          </p>
          <p className="text-sm text-gray-300">Phone: +92 3092140037</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-2 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Campus Recruitment System. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
