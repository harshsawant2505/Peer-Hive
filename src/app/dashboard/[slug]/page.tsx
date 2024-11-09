import React from 'react'


function page({params}:{params:{slug:string}}) {

    const organiser=decodeURIComponent(params.slug)
  return (
    <div>{organiser}</div>
  )
}

export default page