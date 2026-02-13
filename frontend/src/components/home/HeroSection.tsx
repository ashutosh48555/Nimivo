import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/constants';

// Take first 6 services for the hero grid
const heroServices = MOCK_SERVICES.slice(0, 6);

// Images for the collage
const COLLAGE_IMAGES = [
    'https://images.unsplash.com/photo-1560066984-138fa6ca0bd5?auto=format&fit=crop&q=80&w=800', // Salon
    'https://images.unsplash.com/photo-1581578731117-104f2a417954?auto=format&fit=crop&q=80&w=800', // Cleaning
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800', // Repair
];

export default function HeroSection() {
    return (
        <section className="relative bg-white pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Content: Headline + Service Grid */}
                    <div className="relative z-10 pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-[1.1] mb-6">
                                Home services at your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fp-blue-700 to-fp-blue-500">
                                    doorstep
                                </span>
                            </h1>

                            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6">
                                <h3 className="text-lg font-semibold text-slate-700 mb-4 px-2">What are you looking for?</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {heroServices.map((service) => (
                                        <Link
                                            to={`/book/${service.id}`}
                                            key={service.id}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-fp-blue-50 hover:shadow-md transition-all duration-300 border border-transparent hover:border-fp-blue-100"
                                        >
                                            <div className="w-10 h-10 mb-2 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                {/* Placeholder for real icons - using Emoji or Lucide in real app */}
                                                <div
                                                    className="w-full h-full rounded-full flex items-center justify-center text-lg"
                                                    style={{ backgroundColor: service.category === 'cleaning' ? '#fdf2f8' : service.category === 'plumbing' ? '#ecfeff' : '#fef3c7' }}
                                                >
                                                    {service.category === 'cleaning' && '🏠'}
                                                    {service.category === 'plumbing' && '🔧'}
                                                    {service.category === 'electrical' && '⚡'}
                                                    {service.category === 'carpentry' && '🪚'}
                                                    {service.category === 'painting' && '🎨'}
                                                    {service.category === 'salon' && '✂️'}
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 group-hover:text-fp-blue-700 text-center leading-tight">
                                                {service.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 px-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-fp-success" />
                                    <span>Verified Professionals</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                    <span>4.8 Average Rating</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Image Collage */}
                    <div className="relative hidden lg:block h-full">
                        <div className="grid grid-cols-2 gap-4 h-full relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-4 pt-12"
                            >
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[0]}
                                        alt="Salon Service"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <p className="text-white font-bold text-lg">Salon & Spa</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[1]}
                                        alt="Cleaning Service"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <p className="text-white font-bold text-lg">Deep Cleaning</p>
                                    </div>
                                </div>
                                <div className="aspect-[4/4] rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[2]}
                                        alt="Repair Service"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <p className="text-white font-bold text-lg">AC & Appliance</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-fp-blue-50 to-fp-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}
