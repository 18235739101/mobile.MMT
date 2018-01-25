const routeConfig = [
    {
      name: '根',
      path: '/',
      redirect: '/manage',
      hidden: true
    },
    {
      name:'慧聪微店管理后台',
      path:'/manage',
      component:resolve => {
        require.ensure(['../components/manage/index.vue'],() => {
          resolve(require('../components/manage/index.vue'))
        })
      }
    }
  ];
  
  export default routeConfig;
  