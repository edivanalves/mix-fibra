import React from 'react';

const Testimonials = ({ loading }) => {
  const testimonials = [
    {
      text: "A Mix Fibra transformou minha experiência com a internet. Velocidade incrível e sem quedas! Recomendo a todos.",
      author: "Maria S.",
      city: "Sumé",
      color: "orange"
    },
    {
      text: "Excelente atendimento e uma internet que realmente entrega o que promete. Agora consigo trabalhar de casa sem preocupações.",
      author: "João P.",
      city: "Congo",
      color: "cyan"
    }
  ];

  return (
    <section className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-lg">
        O Que Nossos <span className="text-orange-400">Clientes</span> Dizem
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="relative bg-gradient-to-br from-blue-800/80 to-blue-900/80 glass rounded-2xl p-8 shadow-2xl flex flex-col items-start group hover:scale-105 transition-transform duration-300 overflow-hidden">
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-30 ${testimonial.color === 'orange' ? 'bg-orange-400' : 'bg-cyan-400'} pointer-events-none`}></div>
            <p className="text-blue-100 italic mb-4 text-lg md:text-xl">"{testimonial.text}"</p>
            <div className="flex items-center mt-auto">
              <div>
                <p className={`font-bold ${testimonial.color === 'orange' ? 'text-orange-400' : 'text-cyan-300'} text-lg`}>{testimonial.author}</p>
                <p className="text-blue-300 text-sm">{testimonial.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;