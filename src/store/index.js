import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 图片上传
let productObj = {
        bcid:'',
        //商品标题
        title: '',
        //调用picstr返回的商品id
        sessionid: '',
        //图片列表
        imgList: [],
        // 商品描述
        desc: '',
        // 商品类目
        cate: {}
    },
    //价格设置
    priceObj = {
        // 价格类型
        ptype: 'negotiable',
        //商品价格
        price: '',
        // 库存量
        inventory: ''
    },
    //炫铺分类
    storeObj = {
        name: '全部',
        bsid: '',
        child: {
            name: '',
            seriesid: ''
        }
    };

let store = new Vuex.Store({
    state: {
        // 留言组件状态
        messageValue: 'chatList',

        // 图片上传
        productObj:{...productObj},

        //价格设置
        priceObj:{...priceObj},

        //炫铺分类
        storeObj:{...storeObj},

        //商品标题是否有违禁词
        titleConfig:{
            isCheck:false,
            mes:''
        },

        // 上传图片所需要的picstr
        picstr:''
        
    },
    mutations: {
        /** 保存标题设置 **/
        saveTitle(state,titleSetUp){
            state.titleConfig={...titleSetUp}
        }, 
        
        /** 保存picstr **/
        savePicStr(state,picstr){
            state.picstr=picstr;
        },

        /**即时沟通和留言列表*/
        changeMessage(state, name) {
            state.messageValue = name;
        },

        // 保存商品设置
        saveShopSet(state, proObj) {
            state.productObj = {
                ...state.productObj,
                ...proObj
            }
        },

        // 保存价格设置
        savePrice(state, priceObj) {
            state.priceObj = {
                ...state.priceObj,
                ...priceObj
            }
        },

        /* 选择店铺分类 */
        saveSort(state, storeObj) {
            state.storeObj = {
                ...state.storeObj,
                ...storeObj
            };
        },

        //清除发布商机的state
        clearProduct(state) {
             // 图片上传
             state.productObj={
                bcid:'', 
                title: '',
                sessionid: '',
                imgList: [],
                desc: '',
                cate: {}
            };
             //价格设置
             state.priceObj={...priceObj};
        
             //炫铺分类
             state.storeObj={
                name: '全部',
                bsid: '',
                child: {
                    name: '',
                    seriesid: ''
                }
             };

             state.picstr='';
        
        }
    }
})

export default store;