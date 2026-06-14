import React from 'react';
import { motion } from 'framer-motion';
import { DownloadSimple, MicrosoftExcelLogo, ArrowUpRight } from 'phosphor-react';

const Resources = ({ t }) => (
    <section className="py-12 mt-8 border-t border-zinc-800">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-white mb-6">Resources</h2>
            <div className="grid md:grid-cols-2 gap-3">
                <motion.a href="/Professional_LOR.pdf" target="_blank" whileHover={{ y: -3 }}
                    className="bento-card flex items-start gap-4 p-5 cursor-pointer group">
                    <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <DownloadSimple className="w-5 h-5 text-blue-400" weight="duotone" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Professional Reference</h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Letter of Recommendation detailing professional impact.</p>
                    </div>
                </motion.a>
                <motion.a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTDn-lJIO3TJJ1TQLIFIbFLYzGo-nYZUv0ID45PnaV-OqqrH8GvU88k-Fvd117bCOKZNcsRH_l79FPd/pubhtml" target="_blank" whileHover={{ y: -3 }}
                    className="bento-card flex items-start gap-4 p-5 cursor-pointer group">
                    <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <MicrosoftExcelLogo className="w-5 h-5 text-emerald-400" weight="duotone" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Promotions Monitoring Sheet - 2024</h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Ad performance sheet from 2024</p>
                    </div>
                </motion.a>
            </div>
        </div>
    </section>
);

export default Resources;
