const routeConfig = [
    {
      name: '根',
      path: '/',
      redirect: '/addgoods',
      hidden: true
    },{
      name:'店铺订单',
      path:'/order',
      component:resolve => {
        require.ensure(['../components/order'], () => {
          resolve(require('../components/order'));
        });
      }
    },
    {
      name:'店铺订单',
      path:'/shopOrder',
      component:resolve => {
        require.ensure(['../components/order/shop-order.vue'], () => {
          resolve(require('../components/order/shop-order.vue'));
        });
      }
    },   
    {
      name:'店铺订单详情页',
      path:'/shopOrder/detail',
      component:resolve => {
        require.ensure(['../components/order/shop-order-detail.vue'], () => {
          resolve(require('../components/order/shop-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序订单',
      path:'/smallOrder',
      component:resolve => {
        require.ensure(['../components/order/small-order.vue'], () => {
          resolve(require('../components/order/small-order.vue'));
        });
      }
    },
    {
      name:'小程序订单详情页',
      path:'/smallOrder/detail',
      component:resolve => {
        require.ensure(['../components/order/small-order-detail.vue'], () => {
          resolve(require('../components/order/small-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序发货页面',
      path:'/smallOrder/delivery',
      component:resolve => {
        require.ensure(['../components/order/small-delivery.vue'], () => {
          resolve(require('../components/order/small-delivery.vue'));
        });
      }
    },
    {
      name:'商品发布页面',
      path:'/addgoods',
      component:resolve => {
        require.ensure(['../components/addGoods/index.vue'], () => {
          resolve(require('../components/addGoods/index.vue'));
        });
      }
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
  