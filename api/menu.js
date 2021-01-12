console.log(window.lang)
var Menu
if (window.location.pathname.slice("/", 3) == "/en") {

  Menu = [
    { header: 'IAM System' },
    {
      title: 'Dashboard',
      group: 'apps',
      icon: 'dashboard',
      name: 'Dashboard',
      href: '/en/dashboard'
    },
    {
      title: 'Organizations',
      group: 'organization',
      icon: 'corporate_fare',
      items: [

        {name: 'createowner', title: 'Add organization owner', href: '/en/forms/organization/owner/create'},
        { name: 'listorg', title: 'Organization List', href: '/en/forms/organization/list' },
        { name: 'suborglist', title: 'Client  List', href: '/en/forms/organization/external-client-list' },


      ]
    },
    {
      title: 'Projects',
      group: 'projects',
      icon: 'grading',
      items: [
        { name: 'createmember', title: 'Add Member', href: '/en/forms/projects/create-member' },
        { name: 'createproject', title: 'Project List', href: '/en/forms/projects/list' },
      ]
    },
    {
      title: 'Clients',
      group: 'clients',
      icon: 'vpn_key',
      items: [
        { name: 'clientlist', title: 'Client list', href: '/en/forms/clients/list' },
      ]
    },
    {
      title: 'Resources',
      group: 'resources',
      icon: 'hourglass_empty',
      items: [
        { name: 'listresources', title: 'Resource list', href: '/en/forms/resources/list' },
      ]
    },
    {
      title: 'Permissions',
      group: 'permission',
      icon: 'verified_user',
      items: [
        // {name: 'createpermission', title: 'Add new permission', href: '/en/forms/permissions/create'},
        { name: 'permissionlist', title: 'Permission list', href: '/en/forms/permissions/list' },
      ]
    },
    {
      title: 'Roles',
      group: 'roles',
      icon: 'system_update_alt',
      items: [
        { name: 'rolelist', title: 'Role list', href: '/en/forms/roles/list' },
      ]
    },
  ];

  Menu.forEach((item) => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase();
        let textB = y.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  });
} else {
  Menu = [
    { header: 'سیستم مدیریت درسترسی' },
    {
      title: 'داشبورد',
      group: 'apps',
      icon: 'dashboard',
      name: 'Dashboard',
      href: '/fa/dashboard'
    },
    {
      title: 'سازمان ها',
      group: 'organization',
      icon: 'edit',
      items: [
        {name: 'createowner', title: 'افزودن مدیر سازمان جدید', href: '/fa/forms/organization/owner/create'},
        { name: 'listorg', title: 'لیست سازمان ها', href: '/fa/forms/organization/list' },
        { name: 'suborglist', title: 'لیست کلاینت ها', href: '/fa/forms/organization/external-client-list' },
        // {name: 'createsuborg', title: 'اضافه کردن سازمان خارجی', href: '/fa/forms/organization/sub'},
      ]
    },
    {
      title: 'پروژه ها',
      group: 'projects',
      icon: 'edit',
      items: [
        { name: 'createmember', title: 'ایجاد عضو جدید', href: '/en/forms/projects/create-member' },
        { name: 'createproject', title: 'لیست پروژه ها', href: '/fa/forms/projects/list' },
      ]
    },
    {
      title: 'کلاینت ها',
      group: 'clients',
      icon: 'edit',
      items: [
        { name: 'clientlist', title: 'لیست کلاینت ها', href: '/fa/forms/clients/list' },
      ]
    },
    {
      title: 'منابع',
      group: 'resources',
      icon: 'edit',
      items: [
        { name: 'listresources', title: 'لیست منابع', href: '/fa/forms/resources/list' },
      ]
    },
    {
      title: 'نقش ها و دسترسی ها',
      group: 'permission',
      icon: 'edit',
      items: [
        { name: 'createpermission', title: 'اضافه کردن دسترسی جدید', href: '/fa/forms/permissions/create' },
        { name: 'permissionlist', title: 'لیست دسترسی ها', href: '/fa/forms/permissions/list' },
      ]
    },
  ];

  Menu.forEach((item) => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase();
        let textB = y.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  });

}


export default Menu;