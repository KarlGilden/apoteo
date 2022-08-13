import React, { useEffect, useState } from 'react'
import InterventionItem from './InterventionItem'
import InterventionModal from './InterventionModal';
import TagSelector from './TagSelector'

const InterventionsContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState({
      id: 0,
      title: "",
      description: "",
      tags: ""
    })
    const [interventionsSum, setInterventionsSum] = useState(0)
    const [interventions, setInterventions] = useState([{
      id: 0,
      title: "",
      description: "",
      tags: ""
    }])
    const [selectedTag, setSelectedTag] = useState("")

    useEffect(()=>{
        getSum();
        getInterventions();
      }, [])

      const getSum = async () => {
        await fetch('/api/logs/sumInterventions', {
          method: 'GET',
          headers: {"Content-Type": "application/json"}
        }).then(response => response.json())
        .then(d => {
            console.log(d)
            setInterventionsSum(d)
        })
      }

      const getInterventions = async () => {
        await fetch('/api/logs/allInterventions', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
          }).then(response => response.json())
          .then(d => {
              console.log(d)
              setInterventions(d)
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
    <div className='bg-primary-light p-10 w-[50%]'>
        <InterventionModal show={showModal} handleClose={closeModal} intervention={selectedIntervention}/>
        <div className=''>
            <h2 className='text-3xl text-white'>Interventions</h2>
            <p className='text-white'>Total interventions: {interventionsSum}</p>
            <div className='py-3 flex flex-wrap'>
              <TagSelector label={"All"} tag={""} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Example 1"} tag={"tag1"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Example 2"} tag={"b"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
            </div>
            <p className='text-white'>Selected interventions: {interventions?.filter((value)=>{
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
        <div className='max-h-[150px] overflow-y-scroll'>
            {interventions?.filter((value)=>{
              if(selectedTag == ""){
                return value.tags.includes(selectedTag)
              }
              const tags = value.tags.split(",");
              return tags.includes(selectedTag)
              })?.map((value:any)=>{
                return (
                    <InterventionItem openModal={setShowModal} setIntervention={setSelectedIntervention} intervention={value}/>
                )
            })}       
        </div>
    </div>
  )
}

export default InterventionsContainer