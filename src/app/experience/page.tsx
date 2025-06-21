// app/experience/page.tsx
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/sidebar';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      title: "Data Science Intern",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      duration: "May 2023 - August 2023",
      description:
        "Worked on customer segmentation analysis using clustering algorithms. Developed dashboards to visualize customer behavior patterns. Collaborated with marketing team to implement targeted campaigns based on data insights.",
      skills: ["Python", "Scikit-learn", "Pandas", "Tableau", "Customer Analytics"],
      current: false,
    },
    {
      id: 2,
      title: "Research Assistant",
      company: "University Data Lab",
      location: "Remote",
      duration: "January 2023 - Present",
      description:
        "Assisting faculty with research on predictive modeling for healthcare outcomes. Preprocessing medical datasets and implementing machine learning models. Contributing to academic papers on AI applications in healthcare.",
      skills: ["Python", "R", "Statistical Analysis", "Research Methods", "Healthcare Analytics"],
      current: true,
    },
    {
      id: 3,
      title: "Data Analysis Project",
      company: "Environmental Nonprofit",
      location: "Boston, MA",
      duration: "October 2022 - December 2022",
      description:
        "Volunteer project analyzing environmental data to identify pollution patterns. Created visualizations to support advocacy efforts. Presented findings to stakeholders and community members.",
      skills: ["Data Visualization", "GIS", "Statistical Analysis", "Public Speaking"],
      current: false,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="exp" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Experience</h1>
          <p className="text-gray-600">My professional journey and work experience</p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

          {experiences.map((exp) => (
            <div key={exp.id} className="relative mb-12 last:mb-0">
              {/* Dot */}
              <div className="absolute left-4 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md z-10"></div>

              {/* Card */}
              <div className="ml-16 bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Title & Company */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                    <h4 className="text-lg text-blue-600 font-medium">{exp.company}</h4>
                  </div>
                  {exp.current && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                {/* Location & Duration */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {exp.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto text-center mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">
            Looking for new opportunities to grow and contribute to meaningful projects.
          </p>
        </div>
      </main>
    </div>
  );
}
