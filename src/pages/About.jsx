import React from 'react';
import Container from '../components/Container';
import teamImage1 from '../assets/team1.webp';
import teamImage2 from '../assets/team2.webp';

function About() {
  return (
    <>
    <div className="w-full bg-gray-50 py-16 font-[Inter] ">
      <Container>
    <h1 className='text-4xl tracking-tighter font-[Inter] font-bold'>About <span className='text-rose-500'> Us</span></h1>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Images Section */}
          <div className="flex flex-col sm:flex-row gap-6 lg:w-1/2">
            <img
              src={teamImage1}
              alt="Team working"
              className="rounded-xl shadow-xl w-full sm:w-1/2 object-cover h-80 mt-30"
            />
            <img
              src={teamImage2}
              alt="Content creation"
              className="rounded-xl shadow-xl w-full sm:w-1/2 object-cover h-80"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 text-left ">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Empowering Creators Through Blogging
            </h1>
            <p className="text-gray-600 text-lg mb-6 ">
              <strong>CurioHive</strong> is a vibrant hub for storytellers, learners, and innovators.
              We help you amplify your voice through a platform that values creativity, insight, and inspiration.
              Whether you're a beginner or a pro, our tools are built to make blogging easy, impactful, and far-reaching.
            </p>

            <p className="text-gray-600 text-md mb-8">
              Our mission is to build a supportive ecosystem for idea sharing — connecting diverse communities with meaningful content.
              With a growing audience and evolving tools, your voice reaches those who truly matter.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { value: '500+', label: 'Blogs Published' },
                { value: '100+', label: 'Active Users' },
                { value: '1K+', label: 'Monthly Readers' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <p className="text-3xl font-bold text-rose-600">{stat.value}</p>
                  <p className="text-gray-700 mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
    </>
  );

}


export default About;
