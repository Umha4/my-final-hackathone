import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Product {
  _id: string;
  _type: string;
  name: string;
  slug: { current: string };
  inStock: boolean;
  image: SanityImageSource; // Use the appropriate type for Sanity image
  description: string;
  price: number;
  discountPrice?: number;
  colors: string[];
  department: string;
  rating: number;
  stock: number;
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Fallback image URL in case product.image is missing
  const imageUrl = product.image ? urlFor(product.image).url() : "/placeholder.png";

  return (
    <div className="flex flex-col items-center p-4 mt-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg wrapper">
      {/* Image Container */}
      <div className="w-[250px] h-[350px] relative overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={product.name || "Product Image"}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 text-center">
        <h3 className="text-[#252B42] text-[16px] font-bold">
          {product.name || "Product Name"}
        </h3>
        <p className="text-[#737373] text-[14px]">
          {product.department || "Department"}
        </p>
        <p className="text-[#BDBDBD] text-[18px] font-bold mt-2 space-x-2">
          {/* Display original price with strikethrough if discounted */}
          {product.discountPrice && product.discountPrice < product.price ? (
            <>
              <span className="line-through text-[#BDBDBD]">
                ${product.price}
              </span>
              <span className="text-[#23856D]"> ${product.discountPrice}</span>
            </>
          ) : (
            `$${product.price}`
          )}
        </p>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
                aria-label={`Color option: ${color}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;