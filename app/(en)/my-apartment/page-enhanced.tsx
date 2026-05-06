import { Metadata } from 'next';
import ApartmentCalculator from '@/components/ApartmentCalculator';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';
import { CheckCircle, Shield, Clock, Award, MessageCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Unit Finishing Cost Calculator - Transparent Pricing | BonyanMisr',
    description: 'Get instant, honest finishing cost estimates for your Egyptian unit. No hidden fees. 15+ years of trusted construction experience.',
    keywords: 'unit finishing Egypt, cost calculator, transparent pricing, construction estimate, interior finishing',
};

export default function MyApartmentPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Blueprint Background */}
            <BlueprintBackground />

            {/* Animated Floating Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
            </div>

            {/* Mouse Follow Light */}
            <MouseFollowLight />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    
                    {/* SECTION 1: HEADLINE & SUBHEADLINE */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-2xl">
                            Know Your Exact Finishing Costs
                            <span className="block text-primary mt-2">Before You Start</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto drop-shadow-xl leading-relaxed">
                            No surprises. No hidden fees. Get an instant, transparent estimate based on 15+ years of real Egyptian construction data.
                        </p>
                        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary to-yellow-600 mx-auto rounded-full"></div>
                    </div>
                    
                    {/* Trust Indicators Bar */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>200+ Projects Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-500" />
                            <span>Licensed & Insured</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <span>On-Time Delivery</span>
                        </div>
                    </div>

                    {/* Calculator Component */}
                    <ApartmentCalculator locale="en" />

                    {/* SECTION 2: TRUST-BUILDING MICROCOPY UNDER CTA */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            Your information is secure. We never share your data.
                        </p>
                    </div>

                    {/* SECTION 3: OUR PROMISE (Fear Removal) */}
                    <div className="mt-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Our Promise to You
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Transparent Pricing
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Every cost itemized. No hidden charges. What you see is what you pay.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                    On-Schedule Delivery
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We commit to timelines. Delays cost you money—we respect that.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-blue-500" />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Quality Guaranteed
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Premium materials. Certified contractors. 2-year workmanship warranty.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: HOW WE HANDLE YOUR PROJECT */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                            How We Handle Your Project
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            From estimate to handover, we make finishing your unit stress-free.
                        </p>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: '1', title: 'Free Consultation', desc: 'Share your vision. We listen, advise, and provide a detailed quote.' },
                                { step: '2', title: 'Material Selection', desc: 'Choose from our curated catalog or bring your own. We source everything.' },
                                { step: '3', title: 'Execution & Updates', desc: 'Weekly progress reports. Photos. Direct line to your project manager.' },
                                { step: '4', title: 'Final Inspection', desc: 'Walk-through together. We fix any issues before you pay the final installment.' },
                            ].map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {idx < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 5: TESTIMONIALS */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                            What Our Clients Say
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    name: 'Ahmed M.',
                                    location: 'New Cairo',
                                    text: 'They finished my 120m² unit in 45 days. No delays, no excuses. The estimate was accurate to the pound.',
                                    rating: 5
                                },
                                {
                                    name: 'Mariam S.',
                                    location: 'Sheikh Zayed',
                                    text: 'I was terrified of hidden costs. BonyanMisr broke down every expense upfront. Zero surprises at the end.',
                                    rating: 5
                                },
                                {
                                    name: 'Khaled H.',
                                    location: '6th October',
                                    text: 'Best decision I made. They handled everything—permits, materials, workers. I just showed up for the final inspection.',
                                    rating: 5
                                }
                            ].map((testimonial, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-500">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 6: WHY CHOOSE US (Authority) */}
                    <div className="mt-20 bg-gradient-to-r from-primary/10 to-yellow-600/10 rounded-2xl p-8 md:p-12 border border-primary/20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Why Egyptian Homeowners Trust BonyanMisr
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        15+ Years in Egyptian Construction
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We know the local market, suppliers, and regulations inside out. No learning curve on your project.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        200+ Units Delivered
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        From studios to penthouses. Economic to ultra-luxury. We've done it all—and done it right.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        Licensed & Fully Insured
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        All permits handled. All workers insured. Your property is protected from day one.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        Direct Communication, Always
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        No middlemen. Your project manager is one WhatsApp away. Questions answered within hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 7: FINAL CTA */}
                    <div className="mt-20 text-center bg-gradient-to-br from-navy-deep to-navy-light rounded-2xl p-12 border-t-2 border-primary">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get a detailed, personalized quote in 24 hours. No obligation. No pressure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/201234567890"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Us Now
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                Schedule a Call
                            </a>
                        </div>
                        <p className="text-sm text-gray-400 mt-6">
                            💬 Average response time: Under 2 hours
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            <strong>Important:</strong> This calculator provides estimated cost ranges based on current market rates in Egypt. 
                            Final pricing depends on material selection, design complexity, site conditions, and project timeline. 
                            For an accurate, binding quote, <a href="/contact" className="text-primary hover:underline">contact our team</a> for a free on-site consultation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
