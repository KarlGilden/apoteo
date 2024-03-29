import React, { useEffect, useState } from 'react'
import { Issue } from '../../types/Log';
import DatesChanger from './DatesChanger';
import InterventionItem from './InterventionItem'
import InterventionModal from './InterventionModal';
import TagSelector from './TagSelector'
interface IProps{
  dateFrom:string,
  dateTo:string
}
const InterventionsContainer = ({dateFrom, dateTo}:IProps) => {
    const [showModal, setShowModal] = useState(false);

    const [selectedError, setSelectedError] = useState({
      id: 0,
      title: "",
      description: "",
      tags: ""
    })

    const [errors, setErrors] = useState<Issue[]>([])
    
    const [selectedTag, setSelectedTag] = useState("")

    useEffect(()=>{
        getInterventions();
      }, [dateFrom, dateTo])


      const getInterventions = async () => {
        await fetch('/api/errors/' + `${dateFrom}/${dateTo}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
          }).then(response => {
            if(!response.ok){
              throw new Error("error")
            }
            else{
              return response.json()
            }
          })
          .then(d => {
              console.log(d)
              setErrors(d)
          })
          .catch(e => {
            console.log(e)
          })
      }

    const openModal = () => {
      setShowModal(true)
      document.querySelector('body')?.classList.add('overflow-hidden')
    }
  
    const closeModal = () => {
        setShowModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }

  return (
    <div className='bg-white p-5'>
        <InterventionModal show={showModal} handleClose={closeModal} intervention={selectedError}/>
        <div className=''>
            
            <div className='p-2'></div>
            
            <h2 className='text-4xl text-dark-green'>Errors</h2>

            <p className='text-dark-green'>Total errors: {errors.length}</p>

            <div className='py-3 flex flex-wrap'>
              <TagSelector label={"All"} tag={""} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Near miss"} tag={"Near miss"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Incident"} tag={"Incident"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
            </div>

            <p className='text-dark-green'>Selected interventions: {errors?.filter((value)=>{
              if(selectedTag == ""){
                return value.tags.includes(selectedTag)
              }
              if(selectedTag == "All"){
                return value.tags.includes("")
              }
              const tags = value.tags.split(",");
              return tags.includes(selectedTag)
              }).length}</p>
        </div>


        

        <div className='h-[150px] overflow-y-scroll'>
            {errors?.filter((value)=>{
              if(selectedTag == ""){
                return value.tags.includes(selectedTag)
              }
              const tags = value.tags.split(",");
              return tags.includes(selectedTag)
              })?.map((value:any, index:number)=>{
                return (
                    <InterventionItem key={index} openModal={setShowModal} setIntervention={setSelectedError} intervention={value}/>
                )
            })}       
        </div>

    </div>
  )
}

export default InterventionsContainer