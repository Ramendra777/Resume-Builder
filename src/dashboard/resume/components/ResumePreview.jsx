import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';

function ResumePreview() {
// here we accesing the data that's why we use curly braces after const
    const {resumeInfo, SetResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div>
        
      {/* Personal Detail */}
        
        <PersonalDetailPreview resumeInfo={resumeInfo}/>

      {/* Summary */}

      {/* Professional Experience */}

      {/* Educational */}

      {/* Skills */}

    </div>
  )
}

export default ResumePreview
