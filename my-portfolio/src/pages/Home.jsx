import React from 'react';
import Hero from '../components/sections/Hero';
import KeyMetricsBase from '../components/sections/KeyMetricsBase';
import FeaturedAchievement from '../components/sections/FeaturedAchievement';
import Services from '../components/sections/Services';
import Competencies from '../components/sections/Competencies';
import DigitalSkills from '../components/sections/DigitalSkills';

const Home = ({ t, setCurrentPage, fallbackMetrics, isDarkMode }) => {
    return (
        <div className="pt-32">
            <Hero t={t} setCurrentPage={setCurrentPage} fallbackMetrics={fallbackMetrics} />
            <KeyMetricsBase t={t} setCurrentPage={setCurrentPage} fallbackMetrics={fallbackMetrics} />
            <FeaturedAchievement t={t} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />
            <Services t={t} />
            <Competencies t={t} />
            <DigitalSkills t={t} />
        </div>
    );
};

export default Home;
