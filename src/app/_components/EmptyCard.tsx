import React from 'react'

function EmptyCard() {
  return (
    <div className="bg-gray-900 pt-4 border-0 rounded-xl shadow-2xl dark:bg-gray-1000">
              <div className="animate-pulse flex flex-col justify-center items-center rounded-t-xl">
                <div className="w-48 h-48 rounded-lg bg-gray-600"></div> 
                <div className="mt-2 h-6 w-48 bg-gray-600"></div> 
              </div>
            </div>
  )
}

export default EmptyCard