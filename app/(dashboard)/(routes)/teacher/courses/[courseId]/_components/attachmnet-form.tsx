"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { attachment, course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
    initialData:course & { attachment: attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    let CI = courseId;

    // const response = await axios.post("/api/courses",values);//study this line of code
    //         let data = response.data.id;
    //         router.push('/teacher/courses/'+data);//check code api route error

    const onSubmit = async(values: z.infer <typeof formSchema>) => {
        try{
            await axios.post('/api/courses/'+CI+'/attachment',values);
            toast.success("course updated");
            toggleEdit();
            router.refresh()
        }catch{
            toast.error("Something went wrong , contact the developer");
        }
    }
    //line 58 is a fragment

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medius flex items-center justify-between">
                Course Attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}  
                    
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachment.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachment Yet
                        </p>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4"> 
                        Add anything a student might need to complete the course
                    </div>
                </div>
            )}
        </div>
    )
}