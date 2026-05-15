import React from 'react';
import { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

// Project data (same as in portfolio)
export const projectsData = [
  {
    id: 1,
    title: 'Modern Residential Complex',
    subtitle: 'Luxury Living Spaces',
    description: 'Contemporary residential development featuring premium finishes, spacious layouts, and modern amenities in the heart of New Cairo.',
    category: 'Construction',
    images: [
      '/images/projects/01.jpg.jpeg',
      '/images/projects/02.jpg.jpeg',
      '/images/projects/03.jpg.jpeg',
      '/images/projects/04.jpg.jpeg',
      '/images/projects/05.jpg.jpeg',
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
    ]
  },
  {
    id: 2,
    title: 'Executive Office Tower',
    subtitle: 'Commercial Excellence',
    description: 'State-of-the-art office building with cutting-edge design, smart building technology, and panoramic city views.',
    category: 'Construction',
    images: [
      '/images/projects/02.jpg.jpeg',
      '/images/projects/03.jpg.jpeg',
      '/images/projects/04.jpg.jpeg',
      '/images/projects/05.jpg.jpeg',
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
    ]
  },
  {
    id: 3,
    title: 'Luxury Villa Interior',
    subtitle: 'Elegant Design',
    description: 'Sophisticated interior design combining modern aesthetics with traditional Egyptian elements and premium materials.',
    category: 'Interior Design',
    images: [
      '/images/projects/03.jpg.jpeg',
      '/images/projects/04.jpg.jpeg',
      '/images/projects/05.jpg.jpeg',
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
    ]
  },
  {
    id: 4,
    title: 'Premium Apartment Finishing',
    subtitle: 'High-End Details',
    description: 'Exquisite finishing work featuring marble flooring, custom cabinetry, and designer lighting fixtures.',
    category: 'Finishing',
    images: [
      '/images/projects/04.jpg.jpeg',
      '/images/projects/05.jpg.jpeg',
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
    ]
  },
  {
    id: 5,
    title: 'Commercial Plaza',
    subtitle: 'Retail & Entertainment',
    description: 'Multi-level commercial complex with modern architecture, spacious retail areas, and entertainment facilities.',
    category: 'Construction',
    images: [
      '/images/projects/05.jpg.jpeg',
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
    ]
  },
  {
    id: 6,
    title: 'Contemporary Living Room',
    subtitle: 'Modern Comfort',
    description: 'Stylish living space design with open-plan layout, natural lighting, and contemporary furniture selection.',
    category: 'Interior Design',
    images: [
      '/images/projects/06.jpg.jpeg',
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
      '/images/projects/12.jpg.jpeg',
    ]
  },
  {
    id: 7,
    title: 'Residential Tower',
    subtitle: 'Urban Living',
    description: 'High-rise residential building with modern facade, energy-efficient systems, and luxury amenities.',
    category: 'Construction',
    images: [
      '/images/projects/07.jpg.jpeg',
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
      '/images/projects/12.jpg.jpeg',
      '/images/projects/13.jpg.jpeg',
    ]
  },
  {
    id: 8,
    title: 'Master Bedroom Suite',
    subtitle: 'Luxury & Comfort',
    description: 'Elegant bedroom design featuring premium textiles, custom furniture, and sophisticated lighting design.',
    category: 'Interior Design',
    images: [
      '/images/projects/08.jpg.jpeg',
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
      '/images/projects/12.jpg.jpeg',
      '/images/projects/13.jpg.jpeg',
      '/images/projects/14.jpg.jpeg',
    ]
  },
  {
    id: 9,
    title: 'Corporate Headquarters',
    subtitle: 'Business Excellence',
    description: 'Modern corporate building with impressive lobby, flexible office spaces, and advanced infrastructure.',
    category: 'Construction',
    images: [
      '/images/projects/09.jpg.jpeg',
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
      '/images/projects/12.jpg.jpeg',
      '/images/projects/13.jpg.jpeg',
      '/images/projects/14.jpg.jpeg',
      '/images/projects/15.jpg.jpeg',
    ]
  },
  {
    id: 10,
    title: 'Penthouse Finishing',
    subtitle: 'Ultimate Luxury',
    description: 'Premium finishing work for exclusive penthouse featuring imported materials, custom details, and smart home integration.',
    category: 'Finishing',
    images: [
      '/images/projects/10.jpg.jpeg',
      '/images/projects/11.jpg.jpeg',
      '/images/projects/12.jpg.jpeg',
      '/images/projects/13.jpg.jpeg',
      '/images/projects/14.jpg.jpeg',
      '/images/projects/15.jpg.jpeg',
      '/images/projects/16.jpg.jpeg',
    ]
  },
];

// Required for static export with dynamic routes
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Project not found</p>
      </div>
    );
  }

  return <ProjectDetailClient project={project} />;
}
