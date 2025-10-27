import Header from '../../components/Header';
import PortfolioGallery from '../../components/PortfolioGallery';

export default function Portfolio(){
  const items = [
    {img:'/images/portfolio-1.jpg', igUrl:'https://instagram.com/p/XXXXXXXX', caption:'Drone mapping - farm A'},
    {img:'/images/portfolio-2.jpg', igUrl:'https://instagram.com/p/YYYYYYYY', caption:'NDVI - trial'},
    {img:'/images/portfolio-3.jpg', igUrl:'https://instagram.com/p/ZZZZZZZZ', caption:'Yield scouting'},
  ];
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-gray-600 mt-2">Click any item to open the Instagram post (video & reels live there).</p>
      </div>
      <PortfolioGallery items={items} />
    </>
  );
}
