import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
// we have to maintain that whenever we time something it will reflect immediately on resume preview section, 
// for this we need to create the context such that to share the data between these to child to the parent.
function FormSection() {
    const [activeFormIndex,setActiveFormIndex]=useState(1);
    const [enableNext,setEnableNext]=useState(true);
    const {resumeid} = useParams();
  return (
    <div>

        <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
              <Link to={"/dashboard"}>
                  <Button size="sm" ><Home/></Button>
              </Link>
              <ThemeColor/>
            </div>

            <div className='flex gap-2'>
                {activeFormIndex>1 && <Button size="sm"
                onClick={()=>setActiveFormIndex(activeFormIndex-1)}
                > <ArrowLeft/> </Button>}

                <Button
                disabled={!enableNext}
                className= "flex gap-2" size="sm"
                onClick={()=>setActiveFormIndex(activeFormIndex+1)}
                > Next
                <ArrowRight/> </Button>
            </div>
        </div>
        {/* Personal Detail */}
            
          {activeFormIndex===1 ? <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />  
           : activeFormIndex===2? <Summary enabledNext={(v)=>setEnableNext(v)} /> 
           : activeFormIndex===3? <Experience />
           : activeFormIndex===4? <Education/>
           : activeFormIndex===5? <Skills/>
           : activeFormIndex===6? <Navigate to={'/my-resume/'+resumeid+'/view'} />
           : null}

        {/* Summary */}
        
        
        {/* Experience */}
        
        
        {/* Educational Detail */}
        
        
        {/* Skills */}

    </div>
  )
}

export default FormSection
