
import { Button } from "~/components/ui/button"
import { DrawerTrigger, DrawerTitle, DrawerDescription, DrawerHeader, DrawerFooter, DrawerContent, Drawer } from "~/components/ui/drawer"
import { Textarea } from "~/components/ui/textarea"


export default function Comment() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button  className="right-0.5 rounded-full -translate-x-full" >
          <span className="sr-only">Open Drawer</span>
          <svg
    className= "w-8 h-8"       
    xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill=""
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path xmlns="http://www.w3.org/2000/svg" d="M7.5 4h9c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v6c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-9c-.62 0-1.17-.02-1.66-.09C3.21 19.62 2.5 18.38 2.5 15V9c0-3.38.71-4.62 3.34-4.91C6.33 4.02 6.88 4 7.5 4ZM13.5 10H17M7 15.5h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path xmlns="http://www.w3.org/2000/svg" d="M10.095 10h.009M7.095 10h.009" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-screen p-4">
        <div className="grid gap-4">
          <div className="flex items-left justify-between mb-4">
            <div className="flex flex-col">
              <div className="text-gray-800 font-semibold text-3xl">Feedback</div>
              <DrawerDescription>I'd love to hear your thoughts...</DrawerDescription>
            </div>
            <svg
        className="w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#808080"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Textarea className="min-h-[100px] text-sm font-medium" id="message" placeholder="Enter your message" />
          </div>
        </div>
        <div className="border-t pt-4 gap-2 sm:flex sm:justify-end sm:flex-row sm:items-center">
        <Button
            className="bg-gray-950 text-gray-50 border-gray-800 hover:bg-gray-800 hover:text-gray-50 w-full sm:w-1/2"
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="bg-gray-50 text-gray-950 hover:bg-gray-200 hover:text-gray-950 w-full sm:w-1/2">Submit</Button>
        </div> 
      </DrawerContent>
    </Drawer>
  )
}




