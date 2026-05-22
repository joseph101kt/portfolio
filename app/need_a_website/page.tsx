import ContactSection from "@/components/Hero/ContactSection";
import FaqSection from "@/components/Hero/FaqSection";
import Footer from "@/components/Hero/Footer";
import HeroSection from "@/components/Hero/HeroSection";
import HowItWorksSection from "@/components/Hero/HowItWorks";
import ThemeToggleFab from "@/components/Hero/ThemeToggleFab";
import WhatYouGetSection from "@/components/Hero/WhatYouGet";


export default function need_a_website() {
    return (
        <>
        <HeroSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <ContactSection />
        <FaqSection />
        <Footer />
        <ThemeToggleFab/>

        </>
    )
}