import React from 'react';
import { DSSection, DSHeading, DSCard, DSText, DSIconContainer } from '../components';
import { motion } from 'framer-motion';
import { animations } from '../theme';

/**
 * Page Template
 * Use this as a starting point for all new pages
 * Automatically follows the design system rulebook
 * 
 * Usage:
 * 1. Copy this file to src/pages/YourNewPage.jsx
 * 2. Replace the example content with your page content
 * 3. Keep the structure (DSSection, DSHeading, DSCard pattern)
 * 4. Import icons from 'phosphor-react' with weight="duotone"
 */

const PageTemplate = ({ t }) => {
    return (
        <div className="min-h-screen py-24">

            {/* Hero Section */}
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32 relative pt-8 md:pt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <DSHeading level="h1" className="mb-6">
                    Page Title
                </DSHeading>
                <DSText size="large" className="max-w-3xl mx-auto">
                    Page subtitle or description goes here
                </DSText>
            </motion.div>

            {/* Main Content Section */}
            <DSSection divider={true}>
                <DSHeading level="h2" accent>
                    Section Title
                </DSHeading>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.variants.container}
                >
                    {/* Example Card 1 */}
                    <DSCard>
                        <DSIconContainer>
                            {/* Import your icon: import { YourIcon } from 'phosphor-react' */}
                            {/* <YourIcon size={32} weight="duotone" /> */}
                        </DSIconContainer>
                        <DSHeading level="h4" className="mb-2">
                            Card Title
                        </DSHeading>
                        <DSText size="small">
                            Card description text goes here. This follows the design system typography.
                        </DSText>
                    </DSCard>

                    {/* Example Card 2 */}
                    <DSCard>
                        <DSIconContainer>
                            {/* <YourIcon size={32} weight="duotone" /> */}
                        </DSIconContainer>
                        <DSHeading level="h4" className="mb-2">
                            Card Title
                        </DSHeading>
                        <DSText size="small">
                            Card description text goes here.
                        </DSText>
                    </DSCard>

                    {/* Example Card 3 */}
                    <DSCard>
                        <DSIconContainer>
                            {/* <YourIcon size={32} weight="duotone" /> */}
                        </DSIconContainer>
                        <DSHeading level="h4" className="mb-2">
                            Card Title
                        </DSHeading>
                        <DSText size="small">
                            Card description text goes here.
                        </DSText>
                    </DSCard>
                </motion.div>
            </DSSection>

            {/* Additional Section (if needed) */}
            <DSSection divider={true}>
                <div className="text-center mb-16">
                    <DSHeading level="h2Section" className="mb-4">
                        Another Section
                    </DSHeading>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>

                <DSText size="base" className="max-w-4xl mx-auto text-center">
                    Additional content goes here...
                </DSText>
            </DSSection>

        </div>
    );
};

export default PageTemplate;
