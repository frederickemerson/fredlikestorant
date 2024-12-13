import React from 'react'
import BlogPosts from './BlogPosts'
import {useTransform, motion } from "framer-motion";
import Thoughts from './Thoughts';

const ThoughtsAndRants = ({scrollYProgress}) => {

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])
    const opacity = useTransform(scrollYProgress,[0, 1], [0, 1])
  
  return (
    <motion.div style={{opacity}} className="relative h-auto">
      <Thoughts /> 
      <BlogPosts />    
    </motion.div>
  )
}

export default ThoughtsAndRants
