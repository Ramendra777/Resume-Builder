import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
// we have to maintain that whenever we time something it will reflect immediately on resume preview section, 
// for this we need to create the context such that to share the data between these to child to the parent.
function FormSection() {
    const [activeFormIndex,setActiveFormIndex]=useState(1);
    const [enableNext,setEnableNext]=useState(true);

  return (
    <div>

        <div className='flex justify-between items-center'>
            <Button variant="outline" size="sm" className="flex gap-2"> <LayoutGrid/> Theme </Button>
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
           : null}

        {/* Summary */}
        
        
        {/* Experience */}
        
        
        {/* Educational Detail */}
        
        
        {/* Skills */}

    </div>
  )
}

export default FormSection
