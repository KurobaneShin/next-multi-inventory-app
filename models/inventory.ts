import prisma from '../src/services/prisma';

type createInventoryParams = {
  name: string;
  userId: string;
};

export async function createInventory(params: createInventoryParams) {
  return prisma.inventory.create({
    data: {
      name: params.name,
      User: {
        connect: {
          id: params.userId,
        },
      },
    },
  });
}

export async function getInventoriesFromUser(userId: string) {
  return prisma.inventory.findMany({
    where: {
      userId,
    },
  });
}
