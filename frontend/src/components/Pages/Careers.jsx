// src/components/Pages/Careers.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import WorkIcon from '@mui/icons-material/Work';

const Careers = () => {
  return (
    <>
      <MetaData title="Careers - Join Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <WorkIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Best2Buy</h1>
            <p className="text-xl text-blue-100">
              Shape the future of e-commerce with a talented, growth-focused team.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            {/* Why work with us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Work With Us?</h2>
              <p className="text-gray-600 leading-relaxed">
                Best2Buy is more than just an e-commerce platform; we are a community of innovators dedicated to delivering the best online shopping experience. We offer challenging work, a collaborative environment, and opportunities for continuous professional growth.
              </p>
            </section>

            {/* Company culture */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Company Culture</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>**Innovation:** We encourage out-of-the-box thinking and embrace new technologies.</li>
                <li>**Inclusion:** A diverse and respectful workplace is paramount to our success.</li>
                <li>**Integrity:** We operate with transparency and the highest ethical standards.</li>
              </ul>
            </section>

            {/* Benefits and perks */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits and Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <p>✅ Comprehensive health, dental, and vision plans</p>
                <p>✅ Generous paid time off and flexible schedules</p>
                <p>✅ 401(k) matching and stock options</p>
                <p>✅ Annual training and development budget</p>
              </div>
            </section>
            
            {/* Open positions (list with "Apply" buttons) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Open Positions</h2>
              <div className="space-y-4">
                {/* Job Card 1 */}
                <div className="bg-blue-50 rounded-lg p-5 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-blue">Senior Frontend Developer</h3>
                    <p className="text-gray-600">Engineering | New York, Remote</p>
                  </div>
                  <a href="/apply/frontend" className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all font-semibold">
                    Apply Now
                  </a>
                </div>
                {/* Job Card 2 */}
                <div className="bg-blue-50 rounded-lg p-5 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-blue">Marketing Specialist</h3>
                    <p className="text-gray-600">Marketing | Remote</p>
                  </div>
                  <a href="/apply/marketing" className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all font-semibold">
                    Apply Now
                  </a>
                </div>
              </div>
            </section>

            {/* Application process */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">The Application Process</h2>
              <p className="text-gray-600 leading-relaxed">
                Our process is simple: **Apply Online** → **Initial Screening** → **Interview Stage (2-3 rounds)** → **Offer**. We aim to provide feedback within two weeks of your application.
              </p>
            </section>

            {/* Contact HR CTA */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions for our HR Team?</h2>
              <p className="text-gray-600 mb-6">
                If you can't find the answer in our FAQs, feel free to reach out to us directly.
              </p>
              <a
                href="mailto:hr@best2buy.com"
                className="inline-block px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold"
              >
                Contact HR
              </a>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Careers;