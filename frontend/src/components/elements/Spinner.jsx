import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center relative'>
      <h1 className='absolute font-bold text-gray-700 font-mono sm:text-3xl'>PLEASE WAIT WHILE WE FETCH YOUR ITEMS</h1>
      <div className='animate-ping w-56 h-56 m-8 rounded-full bg-sky-600'>
    </div>

    </div>
  )
}

export default Spinner