
import { Button } from "~/components/ui/button"
import { DrawerTrigger, DrawerDescription, DrawerContent, Drawer } from "~/components/ui/drawer"
import { Textarea } from "~/components/ui/textarea"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function PostComment() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button  className="rounded-full bg-white hover:bg-gray-100 " >
          <span className="sr-only">Open Drawer</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M6 12h12M12 18V6" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-screen max-h-1/2 p-4">
        <SignedIn>
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
            <Textarea className="min-h-[100px] text-sm text-black font-medium" id="message" placeholder="Enter your message" />
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
        </SignedIn>
        <SignedOut>
        <div className="grid gap-4">
          <div className="flex items-left justify-between mb-4">
            <div className="flex flex-col">
              <div className="text-gray-800 font-semibold text-3xl">Oops,</div>
              <DrawerDescription>You need to sign in to comment</DrawerDescription>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M10.49 2.23 5.5 4.11c-1.15.43-2.09 1.79-2.09 3.01v7.43c0 1.18.78 2.73 1.73 3.44l4.3 3.21c1.41 1.06 3.73 1.06 5.14 0l4.3-3.21c.95-.71 1.73-2.26 1.73-3.44V7.12c0-1.23-.94-2.59-2.09-3.02l-4.99-1.87c-.85-.31-2.21-.31-3.04 0Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.15 13.44 9.9 9.19M14.1 9.24l-4.25 4.25" stroke="#808080" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </div>
        </div>
        </SignedOut>
      </DrawerContent>
    </Drawer>
  )
}




