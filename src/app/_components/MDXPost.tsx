import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function MDXPost({content}) {
    return (
      <div>
        <MDXRemote source={content} />
      </div>
  )
}

