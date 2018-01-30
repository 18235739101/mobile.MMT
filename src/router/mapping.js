const routeConfig = [
    {
      name: '根',
      path: '/',
      redirect: '/order',
      hidden: true
    },{
      name:'店铺订单',
      path:'/order',
      component:resolve => {
        require.ensure(['../component/order'], () => {
          resolve(require('../component/order'));
        });
      }
    },    
    {
      name:'店铺订单详情页',
      path:'/order/detail',
      component:resolve => {
        require.ensure(['../component/order/shop-order-detail.vue'], () => {
          resolve(require('../component/order/shop-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序订单',
      path:'/smallOrder',
      component:resolve => {
        require.ensure(['../component/order/small-order.vue'], () => {
          resolve(require('../component/order/small-order.vue'));
        });
      }
    },
    {
      name:'小程序订单详情页',
      path:'/smallOrder/detail',
      component:resolve => {
        require.ensure(['../component/order/small-order-detail.vue'], () => {
          resolve(require('../component/order/small-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序发货页面',
      path:'/smallOrder/delivery',
      component:resolve => {
        require.ensure(['../component/order/small-delivery.vue'], () => {
          resolve(require('../component/order/small-delivery.vue'));
        });
      }
    }
  ];
  
  export default routeConfig;
  