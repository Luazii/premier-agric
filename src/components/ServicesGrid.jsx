export default function ServicesGrid() {
  const services = [
    {title:'Precision Mapping', body:'Drone multispectral mapping & analysis', img:'/images/service-1.jpg' },
    {title:'Drone Operations', body:'Surveying, monitoring, spraying (licensed ops)', img:'/images/service-2.jpg' },
    {title:'Data Insights', body:'Actionable dashboards & DaaS for sugarcane and more', img:'/images/service-3.jpg' },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-6 py-12">
      {services.map((s, i) => (
        <article key={i} className="rounded-xl overflow-hidden shadow-lg">
          <div className="h-44 bg-gray-100">
            <img src={s.img} alt={s.title} className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-xl text-primary">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{s.body}</p>
            <div className="mt-4">
              <a className="text-sm font-semibold text-bright" href="/services">Learn more →</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
