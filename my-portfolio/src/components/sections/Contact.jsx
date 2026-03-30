import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    // Re-initialize embeds dynamically when the component mounts ensuring it resizes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Tally) {
            window.Tally.loadEmbeds();
        }
    }, []);

    return (
        <section id="contact" className="py-20 border-t border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Looking to scale responsibly and profitably? Fill out this quick form so we can map out a growth plan.
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg relative overflow-hidden"
                >
                    {/* The Tally integration natively reads data-tally-src and dynamically updates height when loaded */}
                    <iframe 
                        data-tally-src="https://tally.so/embed/dWlBGr?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                        loading="lazy" 
                        width="100%" 
                        height="300"
                        title="Freelance Client Capture Phase"
                        style={{ border: 'none', margin: 0 }}
                        className="w-full relative z-10 p-2 md:p-6"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
