import {useState, useEffect} from 'react'

import { CardTitle, CardHeader, CardDescription, CardContent, Card  } from '~/components/ui/card';
import { CalendarIcon, BookOpenIcon } from "lucide-react"
import { Skeleton } from '~/components/ui/skeleton';
const Thoughts = () => {
    const [thought, setThoughts] = useState("");

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('/api/dailythought'); 
        const data = await response.json();
        setThoughts(data.lastMessage)
      };
      fetchPosts();
    }, []);
  
    if (!thought) {
        return (
            <Skeleton className="rounded-t-lg w-full h-32 mb-12 bg-gray-700" />
        );
      }

  return (
    <div className="mb-12 ">
      <Card className="bg-gray-900 text-white">
        
        <CardHeader>
          <CardTitle>Daily Thoughts</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
        </CardHeader>
        <CardContent>
          <p>
            {thought}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Thoughts
