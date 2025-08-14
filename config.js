import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail } from "react-icons/hi";

export const config = {
    developer: {
        name: "The Designs Vault",
    },
    social: {
        github: null,
        discord: null,
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: false, // Enable/disable Spotify recent tracks
    projects: [
        {
            id: 1,
            title: "Viya Shop: A Luxury Women's Fashion Store ",
            description: "A modern and responsive e-commerce website for luxury women's fashion, featuring a sleek design and user-friendly interface.",
            image: "/projects/viya.png",
            demo: "https://viya.shop"
        },
        {
            id: 2,
            title: "House of Trendz: Fashion & Lifestyle Store",
            description: "A modern and stylish e-commerce platform for fashion and lifestyle products, offering a seamless shopping experience.",
            image: "/projects/houseoftrendz.png",
            demo: "https://shophouseoftrendz.com"
        },
        {
            id: 3,
            title: "FlowMatrix",
            description: "A  landing page for FlowMatrix, showcasing their products and services.",
            image: "/projects/flowmatrix.png",
            demo: "https://flowmatrix.ae"
        },
        {
            id: 4,
            title: "The KettleFolks",
            description: "A beautifully designed landing page for The KettleFolks, featuring their products and services.",
            image: "/projects/kettlefolks.png",
            demo: "https://kettlefolks.com"
        }
    ],
    skills: [
        {
            title: "Frontend",
            icon: <HiCode />,
            description: "Modern web interfaces",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "Next.js 15", level: "Advanced", hot: true },
                { name: "React", level: "Advanced" },
                { name: "Shopify", level: "Expert", hot: true },
                { name: "WordPress", level: "Expert", hot: true },
                { name: "TailwindCSS", level: "Expert" },
                { name: "Framer Motion", level: "Intermediate" }
            ]
        },
        {
            title: "Backend",
            icon: <HiDatabase />,
            description: "Server & Database",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Node.js", level: "Advanced", hot: true },
                { name: "MongoDB", level: "Advanced" },
                { name: "Express.js", level: "Advanced", hot: true }
            ]
        },
        // {
        //     title: "Programs & Tools",
        //     icon: <HiCube />,
        //     description: "Development & Productivity Tools",
        //     bgClass: "bg-orange-500/10",
        //     iconClass: "text-orange-500",
        //     skills: [
        //         { name: "VS Code", level: "Expert", hot: true },
        //         { name: "Postman", level: "Advanced" },

        //         { name: "Git", level: "Advanced" }
        //     ]
        // }
    ],
    contactInfo: [
        {
            icon: <FaLinkedinIn className="w-5 h-5" />,
            label: "LinkedIn",
            value: "The Designs Vault",
            link: `https://www.linkedin.com/company/the-designs-vault-uae`
        },
        {
            icon: <FaInstagram className="w-5 h-5" />,
            label: "Instagram",
            value: "@thedesignsvaultuae",
            link: `https://www.instagram.com/thedesignsvaultuae`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "hello@thedesignsvault.com",
            link: "mailto:hello@thedesignsvault.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "UAE",
            link: "https://g.co/kgs/eayxmTJ"
        }
    ]
}