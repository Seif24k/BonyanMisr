import Link from 'next/link';

export default function FooterAr() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">بنيان</span> مصر
            </h3>
            <p className="text-gray-400 mb-4">
              التميز في البناء والتصميم الداخلي والتشطيبات الفاخرة.
              نحول المساحات إلى تحف فنية في جميع أنحاء مصر.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                فيسبوك
              </a>
              <a href="https://www.instagram.com/bonyanmisr.official/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                إنستغرام
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                لينكد إن
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ar" className="text-gray-400 hover:text-primary transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/ar/services" className="text-gray-400 hover:text-primary transition">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/ar/portfolio" className="text-gray-400 hover:text-primary transition">
                  المشاريع
                </Link>
              </li>
              <li>
                <Link href="/ar/careers" className="text-gray-400 hover:text-primary transition">
                  الوظائف
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">اتصل بنا</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 القاهرة، مصر</li>
              <li>📞 +20 123 456 7890</li>
              <li>✉️ info@bonyanmisr.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} بنيان مصر. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
