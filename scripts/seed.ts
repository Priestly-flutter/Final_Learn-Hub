

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try{
        await db.price.createMany({
            data: [
                {
                    cost: "$25",
                    period: "30",
                },
                {
                    cost: "$100",
                    period: "365",
                }
            ]
        })

        console.log("success");
    } catch (error){
        console.log("Error seeding the database categories", error);
    }finally{
        await db.$disconnect();
    }
}

main();