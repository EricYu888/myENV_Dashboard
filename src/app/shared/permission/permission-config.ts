export class PermissionDirectiveConfig {
  permissions = {
    models: {},
    commonMenuKey: '',
    commonActionsKey: '',
    commonActionKey: '',
    commonSubMenusKey: ''
  };

  public static getTemplate() {
    return {
      models: {},
      commonMenuKey: '',
      commonActionsKey: '',
      commonActionKey: '',
      commonSubMenusKey: ''
    };
  }
}
