import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function Summary({enabledNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext) 
    const [summary, setSummary]=useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    }, [summary])

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);
        
        const data={
            // here we don't use resumeInfo as it store so much info through usecontext that's why we make formData like resumeInfo and we pass it.
            data:{
                summary:summary
            }
        }

        // console.log("Saving resume:", params?.resumeid, data);

        GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated")
        },(error)=>{
            setLoading(false);
        })
    }
  return (
    <div>

        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your Job Title</p>

            <form className='mt-5' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button variant="outline" type="button" size="sm" className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4'/> Generate From AI</Button>
                </div>
                <Textarea className="mt-5" required
                defaultValue={resumeInfo?.summary}
                onChange={(e)=>setSummary(e.target.value)}
                />
                <div className='mt-2 flex justify-end'>
                   <Button type="submit"
                    disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                    </Button> 
                </div>
            </form>

        </div>
        
    </div>
  )
}

export default Summary
