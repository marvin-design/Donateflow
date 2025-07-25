// about.jsx
import React from 'react';

const About = () => {
  return (
    <div className="about-page p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        <strong>Donate Flow</strong> is a purpose-driven donation platform dedicated to tackling two of the most pressing issues affecting girls in underserved communities: 
        lack of menstrual hygiene support and access to clean water.
      </p>

      <p className="mb-4">
        We believe that every girl deserves dignity, health, and opportunity—regardless of where she is born. Our mission is to break the cycle of poverty and inequality by 
        delivering sustainable menstrual health education, products, and clean water solutions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">What We Do</h2>

      <h3 className="text-xl font-semibold mt-4">🌸 Menstrual Hygiene Support</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Distribute safe, reusable sanitary pads to school-age girls</li>
        <li>Provide menstrual health workshops to educate and break taboos</li>
        <li>Train local women in pad-making and community health advocacy</li>
        <li>Advocate for menstrual equity in schools and public health policy</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">💧 Clean Water Projects</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Build and restore clean water wells, boreholes, and rainwater systems</li>
        <li>Install handwashing and hygiene stations in schools and communities</li>
        <li>Promote WASH education (Water, Sanitation, and Hygiene) for children and families</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Why It Matters</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1 in 10 girls in low-income regions misses school due to her period</li>
        <li>Unsafe water and lack of hygiene contribute to illness and absenteeism</li>
        <li>Access to hygiene and clean water helps girls stay in school and reach their potential</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Impact</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Supported over 60,000 girls with menstrual care kits and health education</li>
        <li>Delivered clean water systems to over 100 schools and communities</li>
        <li>Empowered local women through training and job creation</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Join the Flow of Change</h2>
      <ul className="list-disc list-inside mb-4">
        <li>💖 Give monthly to support a girl's hygiene and school attendance</li>
        <li>🚰 Sponsor a water system for a school or community</li>
        <li>📢 Raise awareness through your voice, social media, and events</li>
        <li>🛠️ Partner or volunteer your time, skills, or organization</li>
      </ul>

      <p className="mt-6 font-medium">
        Let’s flow forward—<em>for dignity, for health, for every girl</em>.
      </p>
    </div>
  );
};

export default About;
