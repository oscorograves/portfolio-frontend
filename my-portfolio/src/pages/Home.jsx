import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import KeyMetricsBase from '../components/sections/KeyMetricsBase';
import FeaturedAchievement from '../components/sections/FeaturedAchievement';
import Services from '../components/sections/Services';
import Competencies from '../components/sections/Competencies';
import DigitalSkills from '../components/sections/DigitalSkills';

const Home = ({ t, navigate, fallbackMetrics, isDarkMode }) => {
    return (
        <div className="pt-32">
            <Hero t={t} navigate={navigate} fallbackMetrics={fallbackMetrics} />
            <KeyMetricsBase t={t} navigate={navigate} fallbackMetrics={fallbackMetrics} />
            <FeaturedAchievement t={t} navigate={navigate} isDarkMode={isDarkMode} />
            <Services t={t} />
            <Competencies t={t} />
            <DigitalSkills t={t} />
        </div>
    );
};

export default Home;
