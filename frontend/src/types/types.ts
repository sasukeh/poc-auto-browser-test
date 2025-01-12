export type MessageType = {
  message: string;
  isMan: boolean;
};

export type ItemType = {
  id: string;
  query: string;
  result: string;
  isError: boolean;
  dueDate: string;
};
