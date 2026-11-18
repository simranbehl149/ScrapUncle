import React from 'react';
import { FaLeaf, FaHandshake, FaRecycle, FaChartLine } from 'react-icons/fa';

const values = [
  { icon: FaLeaf, title: 'Planet first', description: 'Every decision is measured against carbon impact.' },
  { icon: FaHandshake, title: 'Fair to all', description: 'Best price to sellers, fair wages to collectors.' },
  { icon: FaRecycle, title: 'Truly circular', description: 'We close the loop — collect, process, sell, repeat.' },
  { icon: FaChartLine, title: 'Built to scale', description: 'From households to entire enterprises.' },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-xl max-w-3xl mx-auto">We're building the infrastructure of a circular planet.</p>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          ScrapUncle started in a Bengaluru garage in 2021. Today, we operate in 120+ cities and
          have diverted over 2.4 million kilograms from landfill — and we're just getting started.
        </p>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div><div className="text-4xl font-bold">2.4M+</div><div className="mt-2">kg Waste Recycled</div></div>
          <div><div className="text-4xl font-bold">1.8M+</div><div className="mt-2">kg CO₂ Saved</div></div>
          <div><div className="text-4xl font-bold">120+</div><div className="mt-2">Cities Served</div></div>
        </div>
      </section>
    </div>
  );
}