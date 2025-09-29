import featuredImage from '@assets/generated_images/IMG_0535.jpeg';

export default function FeaturedImage() {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <img 
          src={featuredImage} 
          alt="Professional logistics facility" 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}