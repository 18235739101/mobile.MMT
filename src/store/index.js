import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store=new Vuex.Store({
    state:{
        componentname:'ShopOrder',
        //商品名称
        shopTitle:'',
        // 商品图片
        imgList:[],
        //商品描述
        desc:'',
        //商品类目
        cate:{},
        priceSite:{
            // 价格类型
            ptype:'negotiable',
            //商品价格
            price:'',
            // 库存量
            inventory:'',
        },
         //店铺分类
         storeClassList:'全部'
    },
    mutations:{
        /**切换店铺订单和小程序订单 */
        changeComponent(state,name){
           state.componentname=name;
        },
        /** 保存商品名称 */
        addShopTitle(state,title){
            state.shopTitle=title;
        },
        /** 添加图片 */
        addImg(state,imgInfo){
           state.imgList.push(imgInfo);
        },
        /** 删除图片 */
        deleteImg(state,i){
          state.imgList.splice(i,1);
        },
        /**修改类目 */
        changeCate(state,cate){
            state.cate=cate;
        },
        /**修改描述 */
        changeDesc(state,desc){
            state.desc=desc;
        },
        // 保存价格设置
        changePrice(state,priceObj){
            // 修改价格
            state.priceSite=Object.assign(state.priceSite,priceObj);
        },
        /* 选择店铺分类 */
        selectSort(state,name){
            state.storeClassList=name;
        }
    }
})

export default store;