export default class AuditLog {
  id: number = 0;
  type: string = "";
  tableName: string = "";
  oldValues: string = "";
  newValues: string = "";
  affectedColumns: string = "";
  primaryKey: string = "";
  userID: string = "";
}
