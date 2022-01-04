export enum EnumActionTypes {
  Empty,
  Add,
  Slot,
  Update,
  Delete,
  Move,
  NavUpdate,
  UpdateWithMockData,
  ClearEmpModules,
}

export const getParentId = (id: string) => id.substr(0, id.lastIndexOf('_'))
