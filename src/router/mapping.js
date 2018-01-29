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
      meta: { 
          requireAuth: true
      },
      query:'level',
      component:resolve => {
        require.ensure(['../components/manage/index.vue'],() => {
          resolve(require('../components/manage/index.vue'))
        })
      }
    },
    {
      name: '运营日报',
      path: '/operationDaily',
      meta: { 
        requireAuth: true
      },
      query:'level',
      component: resolve => {
        require.ensure(['../components/operationDaily/index.vue'], () => {
          resolve(require('../components/operationDaily/index.vue'))
        })
      }
    },
    {
      name: '曝光量详情',
      path: '/operationDaily/exposure',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/operationDaily/exposure.vue'], () => {
          resolve(require('../components/operationDaily/exposure.vue'))
        })
      }
    },
    {
      name: '在售商品数',
      path: '/operationDaily/onsale',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/operationDaily/onsale.vue'], () => {
          resolve(require('../components/operationDaily/onsale.vue'))
        })
      }
    },
    {
      name: '30天询盘详情',
      path: '/operationDaily/inqueryFor30',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/operationDaily/inqueryFor30.vue'], () => {
          resolve(require('../components/operationDaily/inqueryFor30.vue'))
        })
      }
    }
  ];
  
  export default routeConfig;
  