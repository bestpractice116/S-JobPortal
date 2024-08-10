"use client"

interface SkillBarProps {
    color: string;
}

const SkillBar = ({color}: SkillBarProps) => {
  return (
    <div className={`bg-[${color}] w-14 h-1.5 rounded`}>
      
    </div>
  )
}

export default SkillBar
