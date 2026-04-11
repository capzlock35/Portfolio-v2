/**
 * Long-form project blurbs keyed by slug.
 * Kept separate from the main project list so detail routing and static generation stay predictable.
 */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
        "manufacturing-admin-system": `
        A comprehensive manufacturing admin system designed to streamline production workflows,
        manage inventory, and oversee daily operations. The system provides real-time monitoring,
        reporting tools, and administrative controls to improve efficiency and decision-making.
    `,
        "worldvr-build-tools":
        `A sleek and modern landing page for a virtual reality development platform, focused on showcasing developer tools and features through clean UI/UX, responsive design, and high-quality frontend implementation.
        `,
        "streaming-platform": `
        An innovative streaming platform designed to engage audiences by turning attention into rewards. 
        The platform combines high-quality content delivery, interactive features, and real-time viewer incentives 
        to create a more immersive and rewarding entertainment experience.
    `,        
        "retail-pos-inventory-management-system": `
        A robust retail point-of-sale and inventory management system built to simplify daily store operations. It enables seamless transaction processing, real-time stock tracking, sales reporting, and centralized product management to help businesses maintain accuracy and improve overall efficiency.
    `,
        "smart-sales-inventory-platform": `
        An intelligent sales and inventory platform designed to optimize business performance through automation and data insights. It offers real-time analytics, demand forecasting, and streamlined inventory control, empowering businesses to make smarter, data-driven decisions.    `,
       
        "socia-landing-page-v2": `
        A modern and refined second version of Socia’s landing page, focused on enhanced user experience and brand presentation. It features improved UI/UX design, optimized performance, and responsive layouts to better communicate the company’s vision, services, and value proposition.    `,
       
        "pet-pos-inventory-management-system": `
        A specialized POS and inventory system tailored for pet shops and veterinary retail businesses. It supports product tracking, sales processing, and pet-related inventory management, helping store owners efficiently manage supplies, accessories, and pet care products.     `,
       
        "cross-platform-sales-monitoring-system": `
        A centralized sales monitoring system designed for omnichannel businesses. It integrates multiple sales channels into one platform, providing real-time insights, unified reporting, and synchronized inventory management to ensure consistent operations across online and offline channels.    `,
       
        "condo-airbnb-rental-booking-platform": `
        A comprehensive rental and booking platform built for condo and short-term property management. It streamlines reservations, availability tracking, payment handling, and guest communication, making it easier for property owners to manage listings and maximize occupancy.    `,
        
        "ran-online-private-server-beta": `
        A custom-built private server for Ran Online, currently in beta development. It focuses on delivering a balanced gameplay experience with optimized performance, custom features, and ongoing improvements based on player feedback and testing.    `,
       
        "medical-sales-inventory-management-system": `
        A reliable sales and inventory management system designed for medical suppliers and pharmacies. It ensures accurate stock tracking, expiration monitoring, and efficient sales processing while supporting compliance and improving operational control in healthcare-related businesses.    `,
    
    
    










    // "attendance-monitoring-system":
    //     "A web-based attendance monitoring system with real-time time-in/time-out logging, admin controls, and automated attendance reporting.",
    // "outfit-haven-ecommerce-platform":
    //     "A modern e-commerce platform for local fashion brands in the Philippines with dynamic storefront experiences and secure order handling.",
    // "burger-ka-samen-ordering-system":
    //     "A full-stack burger ordering platform with customer cart and checkout plus an admin dashboard for products, orders, and users.",
    // "omnichannel-ecommerce-analytics-system":
    //     "A full-stack omnichannel platform integrating Shopee, Lazada, TikTok Shop, and Shopify for centralized analytics and operations.",
    // "enterprise-ecommerce-crm-hris-finance-ess":
    //     "A multi-module enterprise platform centralizing CRM, HRIS, Finance, and ESS with real-time communication and operational analytics.",
    // "electronic-medical-record-system":
    //     "A full-stack EMR platform for digitized patient record management, consultation tracking, and usage analytics.",
    // "car-dealership-trading-loan-management":
    //     "A full-stack car dealership platform with customer application landing pages and admin tools for loans, leads, and role-based operations.",
};

export function getProjectDescription(slug: string): string | undefined {
    return PROJECT_DESCRIPTIONS[slug];
}
