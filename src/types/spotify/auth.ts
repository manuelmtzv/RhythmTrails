export type AuthCallbackQuery = {
  code: string;
  state: string;
  error?: string;
};
