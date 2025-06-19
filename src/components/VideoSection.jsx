// Caminho do arquivo: src/components/VideoSection.jsx

import React from 'react';

const VideoSection = React.forwardRef(({ loading }, ref) => {
  const videos = [
    {
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemplo de link embed
      title: "Promoção Ultra Velocidade",
      borderColor: "border-orange-400",
      textColor: "text-orange-300",
      gridSpan: "md:col-span-1"
    },
    {
      src: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG", // Exemplo de playlist
      title: "Atendimento Técnico",
      borderColor: "border-cyan-400",
      textColor: "text-cyan-300",
      gridSpan: "md:col-span-1"
    },
    {
      src: "https://www.youtube.com/embed/5qap5aO4i9A", // Exemplo de link embed
      title: "Playlist Mix Fibra",
      borderColor: "border-yellow-300",
      textColor: "text-yellow-300",
      gridSpan: "md:col-span-2 mt-4"
    }
  ];

  return (
    <section
      id="video-section"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-lg">
        Mix Fibra em <span className="text-orange-400">Ação</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {videos.map((video, index) => (
          <div key={index} className={`relative group aspect-video overflow-hidden shadow-xl border-4 ${video.borderColor}/20 hover:${video.borderColor} transition-all duration-300 rounded-2xl ${video.gridSpan}`}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={video.src}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className={`absolute bottom-3 left-3 bg-blue-900/80 px-4 py-2 rounded-full text-sm font-bold ${video.textColor} shadow-lg backdrop-blur-md`}>
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default VideoSection;