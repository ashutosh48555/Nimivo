import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/constants';

// Take first 6 services for the hero grid
const heroServices = MOCK_SERVICES.slice(0, 6);

// Reliable, working Unsplash images
const COLLAGE_IMAGES = [
    'https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
];

export default function HeroSection() {
    return (
        <section className="relative bg-white pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Content: Headline + Service Grid */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 leading-[1.05] mb-5 tracking-tight">
                                Home services{' '}
                                <br className="hidden sm:block" />
                                at your{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fp-blue-700 via-fp-blue-600 to-fp-blue-500">
                                    doorstep
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
                                Book verified professionals for cleaning, repairs, salon & more — guaranteed arrival in <span className="font-semibold text-fp-orange-500">15 minutes</span>.
                            </p>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-5">
                                <h3 className="text-base font-semibold text-slate-800 mb-4">What are you looking for?</h3>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {heroServices.map((service) => (
                                        <Link
                                            to={`/book/${service.id}`}
                                            key={service.id}
                                            className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 hover:bg-fp-blue-50 hover:shadow-md transition-all duration-200 border border-transparent hover:border-fp-blue-100"
                                        >
                                            <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center text-xl shadow-sm bg-white group-hover:scale-110 transition-transform"
                                                style={{
                                                    backgroundColor:
                                                        service.category === 'cleaning' ? '#fdf2f8' :
                                                        service.category === 'plumbing' ? '#ecfeff' :
                                                        service.category === 'electrical' ? '#eff6ff' :
                                                        service.category === 'carpentry' ? '#fef3c7' :
                                                        service.category === 'painting' ? '#f0fdf4' :
                                                        service.category === 'salon' ? '#faf5ff' : '#f1f5f9'
                                                }}
                                            >
                                                {service.category === 'cleaning' && '🏠'}
                                                {service.category === 'plumbing' && '🔧'}
                                                {service.category === 'electrical' && '⚡'}
                                                {service.category === 'carpentry' && '🪚'}
                                                {service.category === 'painting' && '🎨'}
                                                {service.category === 'salon' && '✂️'}
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 group-hover:text-fp-blue-700 text-center leading-tight">
                                                {service.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-fp-success" />
                                    <span className="font-medium">Verified Professionals</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                    <span className="font-medium">4.8 Average Rating</span>
                                </div>
                                <Link to="/book" className="flex items-center gap-1 text-fp-orange-500 font-semibold hover:text-fp-orange-600 transition-colors ml-auto">
                                    View all services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Image Collage */}
                    <div className="relative hidden lg:block">
                        <div className="grid grid-cols-2 gap-4 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="pt-10"
                            >
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[0]}
                                        alt="Salon & Spa"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                                        <p className="text-white font-bold text-base">Salon & Spa</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[1]}
                                        alt="Electrical & Repair"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                                        <p className="text-white font-bold text-base">Electrical Work</p>
                                    </div>
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={COLLAGE_IMAGES[2]}
                                        alt="Carpentry"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                                        <p className="text-white font-bold text-base">Carpentry</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-fp-blue-50 to-fp-orange-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}
