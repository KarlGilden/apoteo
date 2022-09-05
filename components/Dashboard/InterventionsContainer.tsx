import React, { useEffect, useState } from 'react'
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
      }, [dateFrom, dateTo])

      const getSum = async () => {
        await fetch('/api/logs/sumInterventions/' + `${dateFrom}/${dateTo}`, {
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
            setInterventionsSum(d)
        })
      }

      const getInterventions = async () => {
        await fetch('/api/logs/getInterventions/' + `${dateFrom}/${dateTo}`, {
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
              setInterventions(d)
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
        <InterventionModal show={showModal} handleClose={closeModal} intervention={selectedIntervention}/>
        <div className=''>            
            <div className='p-2'></div>
            
            <h2 className='text-4xl text-dark-green'>Interventions</h2>
            <p className='text-dark-green'>Total interventions: {interventionsSum}</p>

            <div className='py-3 flex flex-wrap'>
              <TagSelector label={"All"} tag={""} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Improved Serious Harm"} tag={"Improved serious harm"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Improved Harm"} tag={"Improved harm"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Improved Efficacy"} tag={"Improved efficacy"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Improved Compliance"} tag={"Improved compliance"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
              <TagSelector label={"Incomplete / illegible"} tag={"Incomplete / illegible"} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
            </div>

            <p className='text-dark-green'>Selected interventions: {interventions?.filter((value)=>{
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

        <div className='h-[150px] overflow-y-scroll shadow-inner'>
            {interventions?.filter((value)=>{
              if(selectedTag == ""){
                return value.tags.includes(selectedTag)
              }
              const tags = value.tags.split(",");
              return tags.includes(selectedTag)
              })?.map((value:any, index:number)=>{
                return (
                    <InterventionItem key={index} openModal={setShowModal} setIntervention={setSelectedIntervention} intervention={value}/>
                )
            })}       
        </div>

    </div>
  )
}

export default InterventionsContainer