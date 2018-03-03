<template>
  <div>
      <goodhead :head-name="headname" :router-path="routerPath"></goodhead>
      <section>
		<div class="addProBox">
        	<div class="proName">
            	<span class="proAddLeft">商品名称</span>
                <input type="text" placeholder="请输入商品名称" @blur="blurname" v-model="shopname" maxlength="60">
                <section class="alertPrompt">情输入商品名称</section>
            </div>
           
        	<div class="proAddImg">
            	<h4>上传商品图片</h4>
            	<ul>
                	<li v-for="(imgs,i) in imgList" :key="i">
                        <div class="updateImg">
                        <a><img :src="imgs.url"></a>
                        <em class="delIco" @click="deleteImg(i)"></em>
                        </div>
                    </li>
                    <li v-show="imgList.length<8">
                      <div class="addImgBtn">
                        <form ref="imgForm">
                          <input type="file"  @change="inputchange" accept="image/*" name="upload" multiple capture="camera">
                        </form>   
                      </div>
                    </li>
                </ul>
            </div>
            <div class="addList1"><a href="#/addgoods/addDesc"><span class="listLeft">添加商品描述</span><p class="listRig" v-show="productObj.desc">已添加</p> </a></div>
            <div class="addList2"><a href="#/addgoods/category?bicid=121324398"><span class="listLeft">选择类目</span><p class="listRig">{{productObj.cate.name}}</p></a></div>       
        </div>
        <button type="submit" class="releasedBtn" @click="next()">下一步</button>
        <!-- <div class="addImgAlert">
            <div class="addImgAlertCon">
                <dl>
                    <dt>添加商品图片</dt>
                    <dd><a href="#">拍照</a></dd>
                    <dd><a href="#">从相册选择</a></dd>
                </dl>
                <button type="button">取消</button>
            </div>
        </div> -->
    </section>
  </div> 
</template>

<script>
import goodhead from "../header.vue";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headname: "添加商品",
      /*
       * 商品名称
       */ 
      shopname: "",     
      
      /**
       * 图片列表
       */
      imgList: [],

      /**
       * 新发和修改的商品bcid
       */
      bcid: 0,

      /**
       * 返回跳转的路由
       */
      routerPath:'/goodsManage'
    };
  },
  components: {
    goodhead
  },
  computed: mapState({
    //图片上传配置对象
    productObj: "productObj",

    // 标题是否验证通过的配置
    titleConfig: "titleConfig",

    // 上传图片所需要的picstr
    picstr: "picstr"
  }),
  methods: {
    /**
     *  校验商品名称
     */
    blurname(e) {
      let _this = this,
          titleConfig = {
            isCheck: false,
            mes: ""
          };
      if (_this.shopname.length == 0) {
        _this.$toast("请填写商品名称");
      } else {
        _this.$store.commit("saveShopSet", {
          title: _this.shopname
        });
        _this
          .$http("get", "//wsproduct.hc360.com/mBusinChance/alfWarnCheck", {
            params: {
              title: _this.shopname
            }
          })
          .then(res => {
            // 标题包含广告词，违禁词，则把错误信息保存起来，点击下一步校验使用
            if (!res.success) {
              //保存标题是否通过验证
              _this.$store.commit("saveTitle", {
                isCheck: true,
                mes: res.returnMsg
              });
              //提示错误信息
              _this.$toast(res.returnMsg);
            } else {
              //保存标题是否通过验证
              _this.$store.commit("saveTitle", titleConfig);
            }
          });
      }
    },

    /**
     *  图片上传
     */
    inputchange(event) {
      let _this = this,
        _files = event.target.files;

      if (_files.length > 0) {
        let imgfile = _files[0];
        if (imgfile.type.split("/")[0] != "image") {
          _this.$toast("请上传图片");
          return;
        }
        /**获取picstr成功后**/
        if (!_this.picstr) {
          _this.$toast("picstr为空！");
          return;
        }
        _this.imgUpload(imgfile);
      }
    },

    /**
     * 调用imgup接口,上传图片
     */
    imgUpload(imgfile) {
      let _this = this,
        formData = new FormData();
      /** 组装formdata */
      formData.append("picstr", _this.picstr);
      formData.append("watermark_showCompanyName", 1);
      formData.append("watermark_showCompanyURL", 1);
      formData.append("watermark_showPosition", 1);
      formData.append("uptype", 5);
      formData.append("id", "WU_FILE_0");
      formData.append("name", imgfile.name);
      formData.append("type", imgfile.type);
      formData.append("lastModifiedDate", imgfile.lastModified);
      formData.append("size", imgfile.size);
      formData.append("upFile", imgfile);
      /**调用imgup接口 */
      _this
        .$http(
          "post",
          "http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.businchance.BusinChanceImgUploadFileAction/eventsubmit_doupload/doUpload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.state == "true") {
            let imgObj = res.result;
            imgObj.url = imgObj.url.replace(/(\.\.)(\d+x\d+)/g, "$1220x220a");
            _this.imgList.push(res.result);
            _this.$store.commit("saveShopSet", {
              imgList: _this.imgList
            });
            _this.deleteImg();
          } else {
            _this.$toast(res.error.message);
          }
          // 清空上次图片上传的input值，修复上传同一张图片，不触发onchange事件
          _this.$refs.imgForm.reset();
        });
    },
    /**
     * 删除图片
     */
    deleteImg(i) {
      let _this = this,
        _imgList = JSON.parse(JSON.stringify(_this.imgList));
      /**@method
       * 此方法上传完图片和点击图片删除都要调用，
       * 如果传入imgInfo表示要删除图片
       * 没有参数表示上传图片完成后要调用此接口
       */
      i ? _imgList.splice(i, 1) : "";
      _this.$http("get","http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.businchance.BusinChaceImgSaveAction/eventsubmit_dosavepic/doSavepic?callback=",
          {
            params: {
              picstr: _this.picstr,
              piclist: JSON.stringify(_imgList)
            }
          }
        ).then(res => {
          /* 这里后台返回的数据是jsonp的格式，多了一个括号，去除括号并且转换为json */
          res = res.slice(1, res.length - 1);
          res = JSON.parse(res);
          /*如果删除成功，删除imgList里面的数据*/
          if (res.state == "true" && i != undefined) {
            _this.imgList.splice(i, 1);
            _this.$store.commit("saveShopSet", {
              imgList: _this.imgList
            });
          }
        });
    },

    /**
     * 添加商品下一步
     */
    next() {
      let _this = this;
      /** 验证商品名称为空 */
      if (_this.shopname.length == 0) {
        _this.$toast("请填写商品名称");
        return;
      }
      if (_this.titleConfig.isCheck) {
        _this.$toast(_this.titleConfig.mes);
        return;
      }
      /** 验证商品图片 */
      if (_this.imgList.length == 0) {
        _this.$toast("请上传图片！");
        return;
      }
      /** 验证商品描述 */
      if (_this.productObj.desc.length < 15) {
        _this.$toast("商品描述长度不能小于15个字,请重新填写！");
        return;
      }
      /** 验证商品类目为空 */
      if (!_this.productObj.cate.name) {
        _this.$toast("请选择类目！");
        return;
      } else if (_this.productObj.cate.hasNext == "1") {
        _this.$toast("请选择一个终极类目！");
        return;
      }
      // 跳转的设置价格页面
      _this.$router.push({
        path: "/addgoods/setPrice"
      });
    },
    /**
     * 获取picstr
     * 
     */
    getPicstr() {
      let _this = this,
        bcid = (this.$route.query || {}).bcid;

      bcid ? (_this.bcid = bcid) : "";
      
      // 如果有picstr,不调用获取picstr接口
      if(_this.picstr){
        if(_this.bcid != 0){
          _this.initBusiness();
        }
        return;
      }

      // 获取picstr
      _this.$http("get","http://wsproduct.hc360.com/mBusinChance/getBcImgUploadParam",
          {
            params: {
              bcid: _this.bcid
            }
          }
        ).then(res => {
          if (!res.picstr) {
            _this.$toast("获取picstr失败");
            return;
          }
          _this.$store.commit('savePicStr',res.picstr)
          _this.$store.commit("saveShopSet", {
            sessionid: res.sessionid
          });
          if (_this.bcid != 0) {
             _this.initBusiness();
          }
        });
    },
    /**
     * 获取商机详情
     */
    getShopInfo(){
        let _this=this,
            getShopDetailUrl = "http://wsproduct.hc360.com/mBusinChance/obtainbusin";
        return new Promise((resolve,reject)=>{
           _this.$http('get',getShopDetailUrl,{
             params:{
                bcid: _this.bcid
             }
           }).then((res)=>{
              resolve(res);
           })
        }) 
    },
    /**
     * 获取商机图片
     */
    getShopImg(){
        let _this=this,
            _url = "http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.businchance.GetBusinChanceImgListAction/eventsubmit_dogetpic/doGetpic";
        return new Promise((resolve,reject)=>{
           _this.$http('get',_url,{
             params:{
                picstr: _this.picstr,
                callback: ""
             }
           }).then((res)=>{
              resolve(res);
           })
        }) 
    },
    /**
     * 初始化商机默认信息 
     */
    initBusiness() {
      let _this = this;
          _this.getShopInfo().then((res)=>{
               let shopDetail = {
                     title: res.title,
                     desc: res.introduce,
                     cate: {
                        name: res.supcatname,
                        sid:res.supcatid
                      }
                    },
                    shopPrice = {
                      // 价格类型
                      ptype: res.pricerange1&&res.pricerange1!='0' ? "onePrice" : "negotiable",
                      price: res.pricerange1,
                      // 库存量
                      inventory: res.num
                    };
              // 初始化商品名称
              _this.shopname = res.title;
             
             _this.getShopImg().then((res)=>{
              res = JSON.parse(res.slice(1, res.length - 1) || "{}");
              if (res.result.length > 0) {
                _this.imgList = [...res.result];
                shopDetail.imgList = [...res.result];
                // 保存商品标题图片描述和类目
                _this.$store.commit("saveShopSet", {
                  ...shopDetail
                });
                // 保存价格设置
                _this.$store.commit("savePrice", {
                  ...shopPrice
                });
              }
             }) 
        })
        
    }
  },
  beforeMount() {
    this.shopname = this.productObj.title;
    this.imgList = this.productObj.imgList;
    this.getPicstr();
  }
};
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/releasedStyle.css";
.mint-toast-text {
  font-size: 30px;
}
</style>