import React from 'react'

interface IProps{
    tag: string,
    selectedTag: string,
    label: string,
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>
}
const TagSelector = ({tag, label, selectedTag, setSelectedTag}:IProps) => {

  return (
    <small className={`min-w-[50px] text-center border-[2px] p-1 rounded-md m-1 ml-0 cursor-pointer ${tag == selectedTag ? 'bg-secondary border-secondary' : 'bg-transparent border-off-white text-dark-green hover:border-primary'}`} onClick={()=>setSelectedTag(tag)}>{label}</small>
  )
}

export default TagSelector