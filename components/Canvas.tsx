import { Testimonial } from "@/lib/schemas/testimonial.schema"
import { useWindowDimensions } from "@/lib/dimension";
import Testimonials from "./Testimonials";
import { useAppContext } from "@/context/AppContext";
import BasicTheme from "./theme/BasicTheme";
import ScrollTheme from "./theme/ScrollTheme";
import VerticalTheme from "./theme/VerticalTheme";

export interface CanvasProps {
  publicTestimonials:[Testimonial],
  mode:boolean
}



const Canvas = ({publicTestimonials, mode}:CanvasProps) => {
      const {state} = useAppContext()
console.log(state.theme)
      const themeComp={
        basic:<BasicTheme publicTestimonials={publicTestimonials} mode={mode}/>,
        scroll:<ScrollTheme publicTestimonials={publicTestimonials} mode={mode}/>,
        vertical:<VerticalTheme publicTestimonials={publicTestimonials} mode={mode}/>,
      }
  
  return (
    <>
    <div >
      <div className="flex justify-center">
       {themeComp[state.theme as keyof typeof themeComp] || themeComp.basic}
      </div>
    </div>
  </>
  )
}

export default Canvas