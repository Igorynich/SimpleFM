export interface ConfirmationDialogData {
  header?: string;
  yes?: {
    txt: string;
    value: boolean | number | string;
  };
  no?: {
    txt: string;
    value: boolean | number | string;
  };
}
