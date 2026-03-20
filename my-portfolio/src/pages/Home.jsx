
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
