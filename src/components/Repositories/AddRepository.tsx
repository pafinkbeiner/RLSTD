import { useState } from "react";
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ReporitoryManager } from "@/lib/RepositoryManager";

const AddRepository = () => {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    function addRepository(){
        const repositoryManager = new ReporitoryManager();
        repositoryManager.add({
            name,
            url
        });
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Add Repository</Button>
            </SheetTrigger>
            <SheetContent className="bg-background text-primary" side={"bottom"}>
                <SheetHeader>
                    <SheetTitle>Add new Repository</SheetTitle>
                    <SheetDescription>
                        Add a name and url to define a custom training repository
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='flex flex-col  t-3 overflow-y-auto max-h-[40rem] pr-5'>
                    <div className="flex flex-col gap-3 p-3 max-w-96">
                        <div className="flex gap-4 items-center">
                            <Label>Name</Label>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Label>Url</Label>
                            <Input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
                        </div>
                    </div>
                </ScrollArea>
                <SheetFooter className="flex gap-2">
                    <SheetClose asChild>
                        <Button variant={"outline"}>Close</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button type="submit" onClick={addRepository}>Save Changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AddRepository