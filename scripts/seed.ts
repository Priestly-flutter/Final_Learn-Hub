const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try{
        await db.price.createMany({
            data: [
                {cost: "$25",
                 id:"1"
                },
                {cost:"$100",
                 id:"2"
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