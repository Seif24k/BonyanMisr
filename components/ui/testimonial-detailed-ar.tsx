'use client';

import { Star } from 'lucide-react';

interface DetailedTestimonialProps {
  image: string;
  rating: number;
  quote: string;
  author: string;
}

const DetailedTestimonial = ({ image, rating, quote, author }: DetailedTestimonialProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <img
        className="h-60 w-full md:w-auto rounded-lg object-cover"
        src={image}
        alt={author}
      />
      <div className="flex flex-col justify-between h-60">
        <div>
          <div className="flex items-center gap-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FF532E] text-[#FF532E]" />
            ))}
          </div>
          <p className="max-w-[280px] text-gray-600 dark:text-gray-400 mt-6">
            "{quote}"
          </p>
        </div>
        <p className="text-lg font-medium text-gray-900 dark:text-white">{author}</p>
      </div>
    </div>
  );
};

export default function TestimonialDetailedAr() {
  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400",
      rating: 5,
      quote: "بنيان مصر تجاوزت كل توقعاتنا. جودة البناء والاهتمام بالتفاصيل رائعة. أكملوا مشروعنا التجاري في الوقت المحدد وضمن الميزانية.",
      author: "خالد أحمد",
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400",
      rating: 5,
      quote: "العمل مع بنيان مصر كان متعة من البداية للنهاية. فريق التصميم الداخلي أنشأ مساحة تعكس هوية علامتنا التجارية بشكل مثالي.",
      author: "كريم محمد",
    },
  ];

  return (
    <div className="flex flex-col items-center text-gray-800 dark:text-gray-200">
      <p className="text-[#d4af37] font-medium mb-2">+500 عميل سعيد</p>
      <p className="text-4xl font-bold max-w-160 mb-[72px] text-gray-900 dark:text-white text-center">
        لا تأخذ كلامنا فقط
      </p>
      <div className="flex items-center justify-center gap-10 overflow-x-auto pb-4 w-full">
        {testimonials.map((testimonial, index) => (
          <DetailedTestimonial key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
