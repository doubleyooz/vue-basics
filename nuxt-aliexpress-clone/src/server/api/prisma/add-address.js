import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, products, name, address, zipCode, city, country } = body;
  const order = await prisma.addresses.create({
    data: {
      userId,
      name,
      address,
      zipcode: zipCode,
      city,
      country,
    },
  });

  return order;
});
