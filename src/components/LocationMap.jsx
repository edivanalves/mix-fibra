import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

const LocationMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      name: "Sumé",
      address: "Centro, Sumé - PB",
      phone: "(83) 99641-1187",
      hours: "24/7 Suporte",
      coordinates: { lat: -7.6717, lng: -36.8800 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.03!2d-36.8800!3d-7.6717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac78c0c0c0c0c0c%3A0x0!2sSumé%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
    },
    {
      name: "Congo",
      address: "Centro, Congo - PB", 
      phone: "(83) 99641-1187",
      hours: "24/7 Suporte",
      coordinates: { lat: -7.7917, lng: -36.6600 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.03!2d-36.6600!3d-7.7917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac78c0c0c0c0c0c%3A0x0!2sCongo%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
    },
    {
      name: "Camalaú",
      address: "Centro, Camalaú - PB",
      phone: "(83) 99641-1187", 
      hours: "24/7 Suporte",
      coordinates: { lat: -7.8833, lng: -36.8167 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.03!2d-36.8167!3d-7.8833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac78c0c0c0c0c0c%3A0x0!2sCamalaú%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
    },
    {
      name: "Caraúbas",
      address: "Centro, Caraúbas - PB",
      phone: "(83) 99641-1187",
      hours: "24/7 Suporte", 
      coordinates: { lat: -7.7167, lng: -36.4833 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.03!2d-36.4833!3d-7.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac78c0c0c0c0c0c%3A0x0!2sCaraúbas%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Nossas Localidades</h3>
            <p className="text-white/70 text-sm">Atendimento em toda região</p>
          </div>
        </div>

        {/* Location Tabs */}
        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => setSelectedLocation(index)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedLocation === index
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Map */}
        <div className="relative h-80 lg:h-96">
          <iframe
            src={locations[selectedLocation].mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${locations[selectedLocation].name}`}
            className="w-full h-full"
          />
          
          {/* Map Overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">
                {locations[selectedLocation].name}
              </span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">
              {locations[selectedLocation].name}
            </h4>
            <p className="text-white/80 text-lg">
              {locations[selectedLocation].address}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Telefone</p>
                <p className="text-white/70">{locations[selectedLocation].phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Atendimento</p>
                <p className="text-white/70">{locations[selectedLocation].hours}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-xl">
                <Navigation className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-white font-medium">Cobertura</p>
                <p className="text-white/70">Toda a cidade e região</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-white/20">
            <a
              href={`https://wa.me/5583996411187?text=Olá! Gostaria de contratar internet em ${locations[selectedLocation].name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Contratar em {locations[selectedLocation].name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;