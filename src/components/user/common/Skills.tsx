import React from 'react'
type SkillType = {
    skill:String
}

const Skills = ({skill}:SkillType) => {
  return (
    <div className='bg-blue-400 rounded-full pe-3 inline-flex flex-row items-center text-white m-1'>
        <span className="h-4 w-4 bg-white inline-block rounded-full mx-2"></span>
      {skill}
    </div>
  )
}

export default Skills
