import * as yup from 'yup';

export const createInventoryItemSchema = yup.object({
  name: yup.string().required(),
  inventoryId: yup.string().required(),
});
