import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, products, name, address, zipcode, city, country } = body;
  const order = await prisma.addresses.create({
    data: {
      userId,
      name,
      address,
      zipcode: zipcode,
      city,
      country,
    },
  });

  return order;
});
