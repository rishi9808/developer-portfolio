"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { config } from '@/config';
import useSWR from 'swr';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
};

const ITEMS_PER_PAGE = 6;
// const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

// const fetcher = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {
//         const errorData = await res.json();
//         const error = new Error('Failed to fetch GitHub projects');
//         error.info = errorData.message;
//         error.status = res.status;
//         throw error;
//     }

//     return res.json();
// };

const ProjectSkeleton = () => (
    <div className="rounded-xl bg-secondary/5 border border-secondary/10 p-6">
        <div className="space-y-4">
            <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    </div>
);

const ErrorAlert = ({ error, onRetry }) => (
    <Alert variant="destructive" className="col-span-full">
        <FaExclamationCircle className="w-4 h-4" />
        <AlertDescription className="flex items-center justify-between">
            <span>
                Failed to load projects. Please try again later.
                Rate limit exceeded
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="ml-4"
            >
                Try Again
            </Button>
        </AlertDescription>
    </Alert>
);

const ProjectCard = ({ project }) => {
    const topics = project.topics || [];

    return (
        <motion.div
            variants={itemAnimation}
            className="group rounded-xl bg-secondary/5 border border-secondary/10 p-6 hover:bg-secondary/10 transition-all duration-300"
        >
            <div className="space-y-4">
                {/* Project Image */}
                <div className="w-full">
                    <img
                        src={project.image}
                        alt={project.title || "Project image"}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>

                {/* Header with title and external link */}
                <div className="flex items-start justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h3 className="font-semibold text-primary truncate flex-1 mr-2">
                                    {project.title}
                                </h3>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{project.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {project.html_url && (
                            <a
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <HiExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {project.demo && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.demo, "_blank");
                                }}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <HiExternalLink className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Description and Topics */}
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.description || "No description provided"}
                    </p>

                    {topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {topics.slice(0, 3).map((topic) => (
                                <span
                                    key={topic}
                                    className="text-xs bg-secondary/20 text-primary px-2 py-1 rounded-full"
                                >
                                    {topic}
                                </span>
                            ))}
                            {topics.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                    +{topics.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const GithubProjects = () => {

    // Use projects from config.js
    const projects = config.projects || [];

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="space-y-16">
                    <div className="space-y-4 text-center">
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm"
                        >
                            <FaGithub className="w-5 h-5" />
                            <span className="text-sm font-medium">Our Latest Projects</span>
                        </motion.div> */}

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-primary"
                        >
                            Our Latest Projects
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground"
                        >
                            Check out some of our recent work. <br /> We take pride in delivering high-quality projects that meet our client&apos;s needs and exceed their expectations.
                        </motion.p>
                    </div>

                    <motion.div
                        variants={containerAnimation}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>

                    {/* <div className="flex justify-center space-x-4">
                        <Button
                            variant="expandIcon"
                            Icon={FaGithub}
                            iconPlacement="right"
                            className="rounded-full px-6 py-6 text-base"
                            asChild
                        >
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View More on Github
                            </a>
                        </Button>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default GithubProjects;