import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">BONYAN</span> MISR
            </h3>
            <p className="text-gray-400 mb-4">
              Excellence in Construction, Interior Design, and High-End Finishing.
              We transform spaces into masterpieces across Egypt.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                Facebook
              </a>
              <a href="https://www.instagram.com/bonyanmisr.official/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-primary transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-primary transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Cairo, Egypt</li>
              <li>📞 +20 123 456 7890</li>
              <li>✉️ info@bonyanmisr.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} BonyanMisr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
