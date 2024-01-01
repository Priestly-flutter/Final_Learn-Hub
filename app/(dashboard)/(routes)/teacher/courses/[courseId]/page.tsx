import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";

const CourseIdPage = async ({
    params
}: {
    params : { courseId: string }
}) => {

    const { userId } = auth();

    if (!userId){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where:{
            id : params.courseId
        }
    });

    if (!course){
        return redirect("/");
    }

    const requireFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.typeId,
    ];

    // const totalFields = requireFields.length;
    // const completeFields = requireFields.filter(Boolean).length;
//D NOT MESS WITH ANYTHING HERE IF YOU CAN'T DO GOOD TS
    let TF = requireFields.length;
    let CF = requireFields.filter(Boolean).length;

    const completionTextA = CF;
    const completionTextB = TF;
    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields ({completionTextA}/{completionTextB})
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData = {course}
                        courseId = {course.id}
                    />
                </div>
            </div>
        </div>

     );
}
 
export default CourseIdPage;