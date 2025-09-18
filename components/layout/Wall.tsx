import { useAppContext } from "@/context/AppContext";
import { useEffect, useState, useTransition } from "react";
import { CopyBlock, irBlack } from "react-code-blocks";
import { toast } from "sonner";
import Canvas from "@/components/layout/Canvas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { IoClose } from "react-icons/io5";
import { Testimonial } from "@/app/products/[spaceId]/page";

interface WallProps {
  publicTestimonials:Testimonial[],
  spaceId:string,
  setWallPageToggle: (pogeToggle: boolean) => void;

  
}

const Wall = ({ publicTestimonials, setWallPageToggle, spaceId }:WallProps) => {
  const [mode, setMode] = useState(false);
  const { setField, state,setTheme } = useAppContext();
  const [isPending, startTransition]=useTransition()
  const code = ` <iframe id="starbook-${spaceId}" src="http://localhost:3000/embed/${spaceId}" frameborder="0" scrolling="no" width="100%"></iframe>
 <script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent"></script>
 <script>
  iframeResize({license: "GPLv3",log: true, checkOrigin: false,}, '#starbook-${spaceId}');
 </script>
`;
  const data = {
    isDark: mode,
    spaceId: spaceId,
    field: state?.field,
    theme:state?.theme
  };
  const handleTheme = async () => {
   startTransition(async()=>{
    const res = await fetch("/api/add-theme", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.message('Theme updated successfully',{
        description:'Copy Embed code and add the tesimonails Wall on your website or landing Pages'
      })
    }
  })
  };

  useEffect(() => {
    const handleEsc = (e:any) => {
      if (e.key === "Escape") {
        setWallPageToggle(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/fetch-theme?spaceId=${spaceId}`)
      const theme = await response.json()
      setMode(theme?.isDark)
      setField(theme?.field)
      setTheme(theme?.theme)
    })()
    
  }, [])

  return (
    <div
      className="z-40 overflow-y-auto fixed top-0 bottom-0 left-0 right-0 flex flex-col md:justify-center md:items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="absolute top-16 md:min-h-[700px] justify-center h-fit rounded-lg bg-white z-50 w-full md:w-[90%] flex flex-col">
        <button
          onClick={() => setWallPageToggle(false)}
          className="self-end text-3xl border rounded-[6px] m-4 "
        >
         <IoClose className=" text-neutral-500 hover:text-neutral-600"/>
        </button>
        <div className="flex flex-col justify-center">
          <p className="text-center font-bold text-3xl mb-4">
            Embed a Wall of Fame
          </p>
          <div className="max-w-7xl md:self-center w-full overflow-x-auto md:flex md:flex-col">
            {publicTestimonials && (
              <CopyBlock
                showLineNumbers={false}
                theme={irBlack}
                codeBlock
                language="javascript"
                text={code}
              />
            )}
            <div className="grid grid-cols-10 place-items-center w-full border my-4 p-4">
              <div className="col-span-9 flex md:gap-8 w-full h-full items-center-safe">
                <div className="flex items-center gap-2 h-full w-fit">
                  <Switch checked={mode} onCheckedChange={setMode} />
                  <label htmlFor="dark-mode">Dark mode</label>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-sm text-[#81878d]">Select a font size :</p>
                  <Separator className="my-2 mb-4" />
                  <RadioGroup value={state.field||'base'} className="flex" onValueChange={setField}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        className="border-muted"
                        value="sm"
                        id="r1"
                      />
                      <Label htmlFor="r1">Small</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        className="border-muted"
                        value="base"
                        id="r2"
                      />
                      <Label htmlFor="r2">Medium</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        className="border-muted"
                        value="lg"
                        id="r3"
                      />
                      <Label htmlFor="r3">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator orientation="vertical" />
                <Select onValueChange={setTheme} value={state.theme} >
                  <SelectTrigger className="w-[180px] border-[#e1eaef] rounded-[7px]">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[7px]">
                    <SelectGroup>
                      <SelectLabel>Themes</SelectLabel>
                      <SelectItem className="rounded-[7px]" value="basic">
                        Basic
                      </SelectItem>
                      <SelectItem className="rounded-[7px]" value="scroll">
                        Scroll
                      </SelectItem>
                      <SelectItem className="rounded-[7px]" value="vertical">
                        Animated - Vertical
                      </SelectItem>
                     
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center items-center gap-4">
                <hr className="h-20 w-[1px] bg-gray-300" />
                <Button onClick={handleTheme} className="w-fit">
                {isPending ?   <img
                    className="m-2 h-4 "
                    src="/assets/Spinner@1x-1.0s-200px-200px.svg"
                    alt=""
                  />:"Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {publicTestimonials?.length <= 0 ? (
          <p className="text-center md:mt-32 mt-20 font-semibold text-slate-200 md:text-5xl text-xl ">
            Wall of fame is empty, add some testimonials
          </p>
        ) : (
          <div className="bg-slate-500 relative mx-10 rounded-[10px] shadow-inner shadow-shadow-color">
            
          <Canvas publicTestimonials={publicTestimonials||[]} mode={mode}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wall;

