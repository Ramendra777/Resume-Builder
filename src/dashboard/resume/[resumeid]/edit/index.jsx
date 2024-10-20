import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const {resumeid} = useParams();
    const [resumeInfo, setResumeInfo] = useState(dummy);
    // we want to execute once this useeffect that's why we add [].
    useEffect(()=>{
        // console.log(params.resumeid)
        // GetResumeInfo();
        setResumeInfo(dummy);
    },[])

    const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeid).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section  */}
        <FormSection/>
       
       {/* preview section */}
        <ResumePreview/>

    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
