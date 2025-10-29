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
    
      <PortfolioGallery items={items} />
    </>
  );
}
