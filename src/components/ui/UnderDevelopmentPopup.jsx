'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function UnderDevelopmentPopup() {
    const t = useTranslations('UnderDevelopment');
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(true);
    }, [pathname]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rtl:right-auto rtl:left-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 18 18" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-main/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative p-4 bg-gradient-to-br from-main-light to-main rounded-full shadow-lg text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <path d="M12 13V8" />
                                        <path d="M12 17h.01" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {t('title')}
                                </h2>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('message')}
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="w-full py-3 px-6 bg-main text-white font-bold rounded-xl shadow-lg shadow-main/30 hover:bg-main-dark hover:shadow-main/50 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main/20"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
