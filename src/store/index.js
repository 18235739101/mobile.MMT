import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


let store = new Vuex.Store({
    state: {
        /**
         * 留言组件状态
         */
        messageValue: 'chatList',

        /**
         * 订单状态
         */
        orderStatus:{
            name: "全部",
            state: ""
        },

        /**
         * 图片上传
         */
        productObj:{
            bcid:'',
            title: '',
            sessionid: '',
            imgList: [],
            desc: '',
            cate: {}
        },

        /**
         * 价格设置
         */
        priceObj:{
            // 价格类型
            ptype: 'negotiable',
            price: '',
            inventory: ''
        },

        /**
         * 炫铺分类
         */
        storeObj:{
            name: '全部',
            bsid: '',
            child: {
                name: '',
                seriesid: ''
            }
        },

        /**
         * 商品标题是否有违禁词
         */
        titleConfig:{
            isCheck:false,
            mes:''
        },

        /**
         * 上传图片的picstr
         */
        picstr:'',


        /**
         * 是否有新消息
         */
        messageList:[]

        
    },
    mutations: {
        /**
         * 保存是否有新消息
         * @param {*} state 
         * @param {*} hasNewMessage 
         */
        saveMessage(state,messageList){
            state.messageList=messageList;
        },
        /**
         * 保存商机标题校验配置
         * @param {*} state 
         * @param {*} titleSetUp 
         */
        saveTitle(state,titleSetUp){
            state.titleConfig={...titleSetUp};
        }, 
        
        /**
         * 保存小程序订单列表状态
         * @param {*} state 
         * @param {*} orderStete 
         */
        saveOrderState(state,orderStete){
            state.orderStatus={...orderStete};
        },

        /**
         * 保存picstr
         * @param {*} state 
         * @param {*} picstr 
         */
        savePicStr(state,picstr){
            state.picstr=picstr;
        },

        /**
         * 保存即时沟通和留言列表的标签切换
         * @param {*} state 
         * @param {*} name 
         */
        changeMessage(state, name) {
            state.messageValue = name;
        },

        /**
         * 保存商品设置
         * @param {*} state 
         * @param {*} proObj 
         */
        saveShopSet(state, proObj) {
            state.productObj = {
                ...state.productObj,
                ...proObj
            }
        },

        /**
         * 保存价格设置
         * @param {*} state 
         * @param {*} priceObj 
         */
        savePrice(state, priceObj) {
            state.priceObj = {
                ...state.priceObj,
                ...priceObj
            }
        },

        /**
         * 保存选择的店铺分类
         * @param {*} state 
         * @param {*} storeObj 
         */
        saveSort(state, storeObj) {
            state.storeObj = {
                ...state.storeObj,
                ...storeObj
            };
        },

        /**
         * 清除发布商机的存储信息 
         * @param {*} state 
         */
        clearProduct(state) {
             state.productObj={
                bcid:'', 
                title: '',
                sessionid: '',
                imgList: [],
                desc: '',
                cate: {}
            };
            state.priceObj={
                ptype: 'negotiable',
                price: '',
                inventory: ''
            };
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