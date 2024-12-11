import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';

const ResizableImage = ({url,title}) => {
    
    const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  return (
                      <img
                      className="object-cover rounded-t-lg w-full h-auto"
                        src={url}
                        alt={title}
                        whileHover={{ scale: 1.1 }}
                        transition={transition}
                      />
                      )
}

export default ResizableImage
