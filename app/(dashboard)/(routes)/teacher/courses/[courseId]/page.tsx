import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";

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

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
    });

    const prices = await db.price.findMany ({
        orderBy: {
            cost: "asc"
        }
    })

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
                    <DescriptionForm 
                        initialData = {course}
                        courseId = {course.id}
                    />
                    <ImageForm 
                        initialData = {course}
                        courseId = {course.id}
                    />
                    <CategoryForm 
                        initialData = {course}
                        courseId = {course.id}
                        options= {categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                {/* will add the payement feature that will pop upasking the user to pay for a course, well this will be done once since the 
                    user will choose between 2 options to pay for, either he choose to get the 12 months for 100$ or 1 month for 25$  */}
                <div className=" space-y-6">
                    <div>
                        <div className="flex item-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Course chapters
                            </h2>
                        </div>
                        <div>
                            TODO: Chapters
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2>
                                Set course price category to sell your course
                            </h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId ={course.id}
                            options= {prices.map((price) => ({
                                label: price.cost,
                                value: price.id,
                            }))}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CourseIdPage;