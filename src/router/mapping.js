const routeConfig = [
    {
      name: '根',
      path: '/',
      redirect:'/manage',
      //redirect:'/addgoods?bcid=47372256',
      hidden: true
    },{      
      name:'订单管理',
      path:'/order',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order'], () => {
          resolve(require('../components/order'));
        });
      }
    },
    {
      name:'店铺订单',
      path:'/shopOrder',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order/shop-order.vue'], () => {
          resolve(require('../components/order/shop-order.vue'));
        });
      }
    },   
    {
      name:'店铺订单详情页',
      path:'/shopOrder/detail',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order/shop-order-detail.vue'], () => {
          resolve(require('../components/order/shop-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序订单',
      path:'/smallOrder',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order/small-order.vue'], () => {
          resolve(require('../components/order/small-order.vue'));
        });
      }
    },
    {
      name:'小程序订单详情页',
      path:'/smallOrder/detail',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order/small-order-detail.vue'], () => {
          resolve(require('../components/order/small-order-detail.vue'));
        });
      }
    },
    {
      name:'小程序发货页面',
      path:'/smallOrder/delivery',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/order/small-delivery.vue'], () => {
          resolve(require('../components/order/small-delivery.vue'));
        });
      }
    },
    {
      name:'商品发布页面',
      path:'/addgoods',
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/addGoods/index.vue'], () => {
          resolve(require('../components/addGoods/index.vue'));
        });
      }
    },
    {
      name:'选择类目',
      path:'/addgoods/category',  
      meta: { 
        requireAuth: true
      },  
      component:resolve => {
        require.ensure(['../components/addGoods/category.vue'], () => {
          resolve(require('../components/addGoods/category.vue'));
        });
      }
    },
    {
      name:'添加描述',
      path:'/addgoods/addDesc',  
      meta: { 
        requireAuth: true
      },   
      component:resolve => {
        require.ensure(['../components/addGoods/addDesc.vue'], () => {
          resolve(require('../components/addGoods/addDesc.vue'));
        });
      }
    },    
    {
      name:'价格设置',
      path:'/addgoods/setPrice',   
      meta: { 
        requireAuth: true
      },  
      component:resolve => {
        require.ensure(['../components/addGoods/setPrice.vue'], () => {
          resolve(require('../components/addGoods/setPrice.vue'));
        });
      }
    },
    {
      name:'炫铺分类',
      path:'/addgoods/storeClass',     
      meta: { 
        requireAuth: true
      },
      component:resolve => {
        require.ensure(['../components/addGoods/storeClass.vue'], () => {
          resolve(require('../components/addGoods/storeClass.vue'));
        });
      }
    },
    {
      name:'发布成功',
      path:'/addgoods/releaseSuccess', 
      meta: { 
        requireAuth: true
      },    
      component:resolve => {
        require.ensure(['../components/addGoods/releaseSuccess.vue'], () => {
          resolve(require('../components/addGoods/releaseSuccess.vue'));
        });
      }
    },
    {
      name:'留言管理',
      path:'/message', 
      meta: { 
        requireAuth: true
      },    
      component:resolve => {
        require.ensure(['../components/message/index.vue'], () => {
          resolve(require('../components/message/index.vue'));
        });
      }
    },
    {
      name:'留言详情',
      path:'/message/detail', 
      meta: { 
        requireAuth: true
      },    
      component:resolve => {
        require.ensure(['../components/message/messageInfo.vue'], () => {
          resolve(require('../components/message/messageInfo.vue'));
        });
      }
    },
    {
      name:'聊天界面',
      path:'/message/chatInfo', 
      meta: { 
        requireAuth: true
      },    
      component:resolve => {
        require.ensure(['../components/message/chatInfo.vue'], () => {
          resolve(require('../components/message/chatInfo.vue'));
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
      name:'宣传页',
      path:'/notice',
      component:resolve => {
        require.ensure(['../components/manage/notice.vue'], () => {
          resolve(require('../components/manage/notice.vue'));
        });
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
    },
    {
      name: '店铺管理',
      path: '/shopManage',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/shopManage/index.vue'], () => {
          resolve(require('../components/shopManage/index.vue'))
        })
      }
    },

    {
      name: '店铺资料',
      path: '/shopManage/info',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/shopManage/shopInfo.vue'], () => {
          resolve(require('../components/shopManage/shopInfo.vue'))
        })
      }
    },

    {
      name: '店铺二维码',
      path: '/shopManage/code',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/shopManage/shopCode.vue'], () => {
          resolve(require('../components/shopManage/shopCode.vue'))
        })
      }
    },

    {
      name: '小程序管理',
      path: '/xcxManage',
      meta: { 
        requireAuth: true,
        requireXCXAuth:true
      }
      
    },

    {
      name: '小程序已授权',
      path: '/xcxManage/authen',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxAuthen.vue'], () => {
          resolve(require('../components/xcxManage/xcxAuthen.vue'))
        })
      }
    },

    {
      name: '小程序未授权',
      path: '/xcxManage/unAuthen',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxUnAuthen.vue'], () => {
          resolve(require('../components/xcxManage/xcxUnAuthen.vue'))
        })
      }
    },

    {
      name: '小程序账户',
      path: '/xcxManage/account',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxAccount.vue'], () => {
          resolve(require('../components/xcxManage/xcxAccount.vue'))
        })
      }
    },

    {
      name: '小程序客服帮助',
      path: '/xcxManage/help',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxHelp.vue'], () => {
          resolve(require('../components/xcxManage/xcxHelp.vue'))
        })
      }
    },

    {
      name: '小程序客二维码',
      path: '/xcxManage/code',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxCode.vue'], () => {
          resolve(require('../components/xcxManage/xcxCode.vue'))
        })
      }
    },

    {
      name: '小程序装修',
      path: '/xcxManage/decorate',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/xcxDecoration.vue'], () => {
          resolve(require('../components/xcxManage/xcxDecoration.vue'))
        })
      }
    },

    {
      name: '小程序店铺模板预览',
      path: '/xcxManage/preview',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/xcxManage/tplPreview.vue'], () => {
          resolve(require('../components/xcxManage/tplPreview.vue'))
        })
      }
    },

    {
      name: '商品管理',
      path: '/goodsManage',
      meta: { 
        requireAuth: true
      },
      component: resolve => {
        require.ensure(['../components/goodsManage/goodsList.vue'], () => {
          resolve(require('../components/goodsManage/goodsList.vue'))
        })
      }
    }

    
  ];
  
  export default routeConfig;
  