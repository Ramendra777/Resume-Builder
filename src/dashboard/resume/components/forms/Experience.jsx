import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from './../../../../../service/GlobalApi';


const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:'',

}

function Experience() {
    const [experinceList,setExperinceList]=useState([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperinceList(resumeInfo?.experience)
        
    },[])


    const handleChange=(index, event)=>{
        const newEntries=experinceList.slice();
        const {name, value}=event.target;
        newEntries[index][name]=value;
        setExperinceList(newEntries);
    }

    const AddNewExperience=()=>{
        setExperinceList([...experinceList, formField])
    }

    const RemoveExperience=()=>{
        setExperinceList(experinceList=>experinceList.slice(0,-1))
    }

    const handleRichTextEditor=(e, name, index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=e.target.value;
        setExperinceList(newEntries);
    }

    useEffect(()=>{
        // console.log(experinceList);
        setResumeInfo({
            ...resumeInfo,
            experience:experinceList
        })
    }, [experinceList])
    
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                // basically we take out the id and currentlyWorking from the experinceList and the add rest of the data to experinceList and then pass to experince
                experience:experinceList.map(({ id,
                    currentlyWorking
                     , ...rest }) => rest)
            }
        }
        console.log(data)


        GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Error! Try Again Please')
        })

    }

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your Previous Job Experience</p>

            <div>
                {experinceList.map((item, index)=>(
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label className='text-xs' >Position Title</label>
                                <Input name="title" 
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.title}
                                />
                            </div>
                            <div>
                                <label className='text-xs' >Company Name</label>
                                <Input name="companyName" 
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.companyName} />
                            </div>
                            <div>
                                <label className='text-xs' >City</label>
                                <Input name="city" 
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.city} />
                            </div>
                            <div>
                                <label className='text-xs' >State</label>
                                <Input name="state" 
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.state} />
                            </div>
                            <div>
                                <label className='text-xs' >Start Date</label>
                                <Input name="startDate" 
                                type='date'
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.startDate}/>
                            </div>
                            <div>
                                <label className='text-xs' >End Date</label>
                                <Input name="endDate" 
                                type='date'
                                onChange={(event)=>handleChange(index, event)} 
                                defaultValue={item?.endDate}/>
                            </div>
                            <div className='col-span-2'>
                                {/* Work summary */}
                                <RichTextEditor
                                index={index}
                                defaultValue={item?.workSummary}
                                onRichTextEditorChange={(event)=>handleRichTextEditor(event, 'workSummary', index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
                <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}    
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Experience
