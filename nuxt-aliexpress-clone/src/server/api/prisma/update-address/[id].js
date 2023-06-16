import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body  = await readBody(event);
  const { name, address, zipcode, city, country } = body;
  const res = await prisma.addresses.update({
    where: { id: Number(event.context.params.id) },
    data: { name, address, zipcode: zipcode, city, country },
  });

  return res;
});
