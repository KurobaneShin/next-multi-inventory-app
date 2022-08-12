import prisma from '../src/services/prisma';

type createInventoryParams = {
  name: string;
  inventoryId: string;
};

export async function createInventoryItem(params: createInventoryParams) {
  return prisma.inventoryItem.create({
    data: {
      name: params.name,
      Inventory: {
        connect: {
          id: params.inventoryId,
        },
      },
    },
  });
}

export async function getInventoryItemFromInventory(inventoryId: string) {
  return prisma.inventoryItem.findMany({
    where: {
      inventoryId,
    },
  });
}
