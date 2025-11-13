export type User = {
  nu_user: number;
  no_user: string;
  no_email: string;
  ds_senha_hash: string;
  ic_ativo: number;
  nu_create: number;
  dh_create_at: Date;
  nu_update: number;
  dh_update_at: Date;
  access_token?: string;
};
