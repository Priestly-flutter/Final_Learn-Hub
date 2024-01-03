"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface PriceFormProps {
    initialData:course;
    courseId: string;
    options : {label: string; value:string; }[];
};

const formSchema = z.object({
    priceId: z.string().min(1),
});

export const PriceForm = ({
    initialData,
    courseId,
    options,
}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            priceId: initialData?.priceId || " "
        }, 
    });

    const { isSubmitting, isValid } = form.formState;

    let CI = courseId;

    // const response = await axios.post("/api/courses",values);//study this line of code
    //         let data = response.data.id;
    //         router.push('/teacher/courses/'+data);//check code api route error

    const onSubmit = async(values: z.infer <typeof formSchema>) => {
        try{
            await axios.patch('/api/courses/'+CI,values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh()
        }catch{
            toast.error("Something went wrong , contact the developer");
        }
    }
    //line 58 is a fragment

    const selectedOption = options.find((option) => option.value === initialData.priceId);

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medius flex items-center justify-between">
                Select Course Price Category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Set Category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2", !initialData.priceId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No price"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="priceId"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormControl>
                                        <Combobox 
                                            options={{...options}}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>

                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

