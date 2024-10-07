import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function AddTraining(props: any) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Configure Own Training</Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div>
          Kommt bald...
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <Button type="submit">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}