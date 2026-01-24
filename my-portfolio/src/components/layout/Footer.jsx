import React from 'react';
import { motion } from 'framer-motion';
import { Film, Camera, Plane, BookOpen, Mail, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer className="border-t border-gray-300 dark:border-gray-800 py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                            <motion.a
                                href="https://www.instagram.com/oscorograves/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800 shrink-0 cursor-pointer block hover:border-amber-600 dark:hover:border-yellow-400 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src="/profile.jpeg"
                                    alt="Kanishk Singh"
                                    className="w-full h-full object-cover object-bottom scale-[1.75]"
                                    loading="lazy"
                                />
                            </motion.a>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('hero.name')}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('hero.role')}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                            {t('hero.description')}
                        </p>

                        <div className="flex gap-4">
                            <motion.a
                                href="mailto:oscoro.graves@gmail.com"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/oscorograves/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://github.com/oscorograves"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.contact')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <motion.a
                                    href="mailto:oscoro.graves@gmail.com"
                                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    oscoro.graves@gmail.com
                                </motion.a>
                            </li>
                            <li>
                                <motion.a
                                    href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    LinkedIn
                                </motion.a>
                            </li>
                            <li>
                                <motion.a
                                    href="https://www.instagram.com/oscorograves/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Instagram
                                </motion.a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                            This site was completely designed and created, including the logo, from scratch by Kanishk Singh. It is open source, and all related files can be found on GitHub. All rights and UI design are retained by Kanishk. Plagiarism will lead to legal charges.
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                            © {new Date().getFullYear()} {t('hero.name')}. {t('footer.rights')}
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-500 flex items-center gap-2">
                            {t('footer.offClock')}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-2 hover:text-amber-600 dark:hover:text-white transition-colors cursor-default">
                                <Film className="w-4 h-4" /> {t('footer.hobbies.film')}
                            </span>
                            <span className="flex items-center gap-2 hover:text-amber-600 dark:hover:text-white transition-colors cursor-default">
                                <Camera className="w-4 h-4" /> {t('footer.hobbies.photography')}
                            </span>
                            <span className="flex items-center gap-2 hover:text-amber-600 dark:hover:text-white transition-colors cursor-default">
                                <Plane className="w-4 h-4" /> {t('footer.hobbies.travel')}
                            </span>
                            <span className="flex items-center gap-2 hover:text-amber-600 dark:hover:text-white transition-colors cursor-default">
                                <BookOpen className="w-4 h-4" /> {t('footer.hobbies.journaling')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
