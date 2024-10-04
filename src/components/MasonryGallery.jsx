import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MasonryGallery = () => {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 768) setColumns(3);
      else if (window.innerWidth < 1024) setColumns(4);
      else setColumns(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = [...Array(15)].map((_, index) => ({
    src: `/assets/${index + 1}.jpeg`,
    alt: `Farm image ${index + 1}`,
    aspectRatio: Math.random() * (1.5 - 0.5) + 0.5,
  }));

  const getColumns = () => {
    const cols = [...Array(columns)].map(() => []);
    images.forEach((image, i) => cols[i % columns].push(image));
    return cols;
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Farm Gallery</h2>
        <div className="flex flex-wrap -mx-2">
          {getColumns().map((column, colIndex) => (
            <div key={colIndex} className="w-1/2 md:w-1/3 lg:w-1/5 px-2">
              {column.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="mb-4 overflow-hidden rounded-lg shadow-md"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{ paddingBottom: `${100 / image.aspectRatio}%` }}
                    className="relative"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
