import React from 'react'
import BlogPosts from './BlogPosts'
import { CardTitle, CardHeader, CardDescription, CardContent, Card  } from '~/components/ui/card';
import { CalendarIcon, BookOpenIcon } from "lucide-react"
import {useTransform, motion } from "framer-motion";

const ThoughtsAndRants = ({scrollYProgress}) => {

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])
    const opacity = useTransform(scrollYProgress,[0, 1], [0, 1])
  
  return (
    <motion.div style={{scale, rotate, opacity}} className="relative h-auto">
    <div className="mb-12 opacity-0">
      <h2 className="text-3xl font-bold mb-4">Daily Thoughts</h2>
      <Card className="bg-gray-900 text-white">
        
        <CardHeader>
          <CardTitle>Embracing Change in Tech</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
        </CardHeader>
        <CardContent>
          <p>
            Today, I'm reflecting on the rapid pace of change in the tech industry. It's both exciting and challenging to keep up with new frameworks, languages, and methodologies. The key is to focus on core principles and adapt quickly.
          </p>
        </CardContent>
      </Card>
    </div>
    
      <BlogPosts />

    
    </motion.div>
  )
}

export default ThoughtsAndRants
