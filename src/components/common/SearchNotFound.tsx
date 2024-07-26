import Lottie from 'lottie-react'
import React from 'react'
import searchSad from "../../assets/animation/searchSad.json"

const SearchNotFound = () => {
  return (
    <div className='flex w-28'>
      <Lottie
                                animationData={searchSad}
                                loop={true}
                                className=""
                            />
    </div>
  )
}

export default SearchNotFound
