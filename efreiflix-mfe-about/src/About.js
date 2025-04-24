import React from 'react';
import './styles.css';
import { Play, Info, Award, Globe, Users, Film } from "lucide-react";
import StatSection from "./components/StatSection";
import FeatureCard from "./components/FeatureCard";
import MissionSection from "./components/MissionSection";


const About = () => {
  const features = [
    {
      icon: Globe,
      title: "Divertissement mondial",
      description:
        "Des histoires extraordinaires du monde entier sur votre écran, disponibles en plusieurs langues et genres.",
    },
    {
      icon: Film,
      title: "Contenu original",
      description:
        "Créer et produire des séries originales, des films et des documentaires primés.",
    },
    {
      icon: Users,
      title: "Millions de membres",
      description:
        "Rejoignez notre communauté grandissante d'amateurs de divertissement à travers le monde.",
    },
    {
      icon: Award,
      title: "Récompensé par un prix",
      description:
        "Reconnu mondialement pour ses contributions exceptionnelles au divertissement et à l'innovation.",
    },
  ];

  const openViodeo = () => {
    window.open("https://www.youtube.com/watch?v=Xjws8nS606Q", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
    
      <div className="relative bg-black text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-90" />
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">A propos de EFREIFlix</h1>
          <p className="text-xl max-w-2xl">
            Bienvenue sur EFREIFlix - le premier service de divertissement en
            streaming au monde. Nous sommes passionnés par les histoires
            incroyables du monde entier..
          </p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={openViodeo}
              className="bg-white text-black px-8 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Play className="w-5 h-5" />
              Regarder l'intro
            </button>
            <button className="bg-gray-800/60 text-white px-8 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-800/80 transition-colors">
              <Info className="w-5 h-5" />
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <StatSection />
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Pourquoi choisir EFREIFlix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      <div className="bg-black text-white py-24 mt-16">
        <MissionSection />
      </div>
    </div>
  );
};

export default About;