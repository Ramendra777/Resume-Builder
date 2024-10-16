import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    
    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log("---",resumeInfo)
        // console.log(params)
    },[])

    const handleInputChange=(e)=>{
        enabledNext(false);
        const {name, value} = e.target;
        
        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault(); // this will prevent getting refresh during save.
        setLoading(true);

        const data={
            // here we don't use resumeInfo as it store so much info through usecontext that's why we make formData like resumeInfo and we pass it.
            data:formData
        }
        // console.log("Saving resume:", params?.resumeid, data);
        GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated")
        },(error)=>{
            // console.log(error);
            // console.log("---", formData)
            setLoading(false);
        })
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>

        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave} >
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Jobtitle</label>
                    <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" defaultValue={resumeInfo?.phone}  required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mt-5 flex justify-end'>
                <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                    </Button> 
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail
