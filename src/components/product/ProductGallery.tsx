
import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  // If no images, use placeholder
  const galleryImages = images.length > 0 ? images : ['/placeholder.svg'];
  
  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
        <img 
          src={galleryImages[activeImage]} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative aspect-square bg-muted rounded border overflow-hidden ${
                activeImage === index ? 'ring-2 ring-imperio-blue' : ''
              }`}
            >
              <img 
                src={image} 
                alt={`${name} - imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
