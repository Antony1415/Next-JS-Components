import { ImageSlider } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div className='px-5 py-3'>
      <h1 className='font-bold text-[30px]'>Image Slider</h1>

      <div className='flex w-[1000px] h-[500px]'>
        <ImageSlider />
      </div>
    </div>
  )
}

export default page