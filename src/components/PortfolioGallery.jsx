export default function PortfolioGallery({ items = [] }) {
  // items: [{img:'/images/portfolio-1.jpg', igUrl:'https://instagram.com/p/xxxxxxxx', caption:'...'}]
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      {(items.length ? items : [
        {img:'/images/portfolio-1.jpg', igUrl:'#', caption:'Trial 1'},
        {img:'/images/portfolio-2.jpg', igUrl:'#', caption:'Trial 2'},
        {img:'/images/portfolio-3.jpg', igUrl:'#', caption:'Trial 3'},
        {img:'/images/portfolio-1.jpg', igUrl:'#', caption:'Trial 4'},
      ]).map((it, idx) => (
        <a key={idx} href={it.igUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-lg overflow-hidden">
          <div className="h-40 md:h-48 w-full overflow-hidden">
            <img src={it.img} alt={it.caption} className="w-full h-full object-cover transform group-hover:scale-105 transition"/>
          </div>
          <div className="p-2 text-xs text-gray-600">{it.caption}</div>
        </a>
      ))}
    </div>
  );
}
