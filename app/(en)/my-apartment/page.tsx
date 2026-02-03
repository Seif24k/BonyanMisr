import { Metadata } from 'next';
import ApartmentCalculator from '@/components/ApartmentCalculator';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';

export const metadata: Metadata = {
    title: 'My Apartment - Cost Calculator | BonyanMisr',
    description: 'Estimate your apartment finishing costs with our professional calculator. Get instant price ranges for economic, standard, and luxury finishing levels.',
    keywords: 'apartment finishing, cost calculator, Egypt construction, interior design pricing, finishing estimate',
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
            <section className="relative py-20 md:py-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {/* Hero Content */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-2xl">
                            My Apartment
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto drop-shadow-xl">
                            Estimate Your Finishing Costs
                        </p>
                        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary to-yellow-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Calculator Component */}
                    <ApartmentCalculator locale="en" />

                    {/* Additional Info Section */}
                    <div className="mt-20 text-center">
                        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
                            Our calculator provides quick estimates based on industry standards in Egypt.
                            For a precise quotation tailored to your specific requirements,{' '}
                            <a href="/contact" className="text-primary hover:text-primary-dark font-semibold underline">
                                contact our team
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
