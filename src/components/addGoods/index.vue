<template>
  <div>
      <goodhead :head-name="headname"></goodhead>
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
                        <img :src="imgs.url">
                        <em class="delIco" @click="deleteImg"></em>
                        </div>
                    </li>
                    <li v-show="imgList.length<8">
                      <div class="addImgBtn">
                       <input type="file" @change="inputchange" accept="image/*" name="upload" multiple capture="camera">
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
import goodhead from "./good-head.vue";
import { Toast } from "mint-ui";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headname: "添加商品",
      // 商品名称
      shopname: "",
      //上传图片需要的picstr
      picstr: "",
      //商品图片是否有违禁词
      title:{
        isCheck:false,
        mes:''
      },
      // 图片列表
      imgList:[]
    };
  },
  components: {
    goodhead
  },
  computed:mapState({
    //图片上传配置对象
    productObj:'productObj',
  }),
  methods: {
    /**@method
      * 校验商品名称
      */
    blurname(e) {
      let _this = this;
      if (_this.shopname.length == 0) {
          _this.$toast("请填写商品名称");
      } else {
        _this.$store.commit('saveShopSet',{
          title:_this.shopname
        }) 
        _this.$http("get", "http://192.168.3.52:92/mBusinChance/alfWarnCheck", {
            params: {
              title: _this.shopname
            }
          }).then(res => {
            // 标题包含广告词，违禁词，则把错误信息保存起来，点击下一步校验使用
            if (!res.success) {
               _this.title={
                 isCheck:true,
                 mes:res.returnMsg
               }
               //提示错误信息
               _this.$toast(res.returnMsg);
            }else{
               _this.title={
                 isCheck:false,
                 mes:''
               }
            }
          });
      }
    },
    /**@method
      * 图片上传
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
        if (_this.picstr) {
            _this.imgUpload(imgfile);
            return;
        }
        // 获取图片上传需要的参数picStr
        _this.$http("get","http://192.168.3.52:92/mBusinChance/getBcImgUploadParam",{
              params: {
                // 商机id，如果新发是0，修改是原有的商机id
                bcid: 0
              }
            }
          ).then(res => {
            if (!res.picstr) {
              _this.$toast("获取picstr失败");
              return;
            }
            _this.picstr = res.picstr;
            _this.$store.commit('saveShopSet',{
               sessionid:res.sessionid
            })
            _this.imgUpload(imgfile);
          });
      }
    },
    /**@method
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
      formData.append("uptype", 1);
      formData.append("id", "WU_FILE_0");
      formData.append("name", imgfile.name);
      formData.append("type", imgfile.type);
      formData.append("lastModifiedDate", imgfile.lastModified);
      formData.append("size", imgfile.size);
      formData.append("upFile", imgfile);
      /**调用imgup接口 */
      _this.$http("post","http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.businchance.BusinChanceImgUploadFileAction/eventsubmit_doupload/doUpload",formData,
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
            _this.$store.commit('saveShopSet',{
               imgList:_this.imgList
            })
            _this.deleteImg();
          } else {
            _this.$toast(res.error.message);
          }
        });
    },
    /**
      * 删除图片
      */
    deleteImg(imgInfo) {
      let _this = this,
          _imgList=JSON.parse(JSON.stringify(_this.imgList)),
          deleteIndex=null;
      /**@method
       * 此方法上传完图片和点击图片删除都要调用，
       * 如果传入imgInfo表示要删除图片
       * 没有参数表示上传图片完成后要调用此接口
       */
      if (imgInfo) {
        _imgList.forEach((val, i) => {
          if (val.url == imgInfo.url) {
            _imgList.splice(i, 1);
            deleteIndex=i;
            return;
          }
        });
      }
      _this.$http("get","http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.businchance.BusinChaceImgSaveAction/eventsubmit_dosavepic/doSavepic?callback=",
          {
            params: {
              picstr: _this.picstr,
              piclist: JSON.stringify(_imgList)
            }
          }
        ).then(res => {
          /* 这里后台返回的数据是jsonp的格式，多了一个括号，去除括号并且转换为json */
          res=res.slice(1,res.length-1);
          res=JSON.parse(res);
          /*如果删除成功，删除imgList里面的数据*/  
          if(res.state=="true"&&imgInfo){
              _this.imgList.splice(deleteIndex,1);
              _this.$store.commit('saveShopSet',{
                imgList:_this.imgList
              })
          }
        });
    },
    /**@method
      * 添加商品下一步
      */
    next() {
      let _this = this;
      /** 验证商品名称为空 */
      if (_this.shopname.length == 0) {
        _this.$toast("请填写商品名称");
        return;
      }
      if(_this.title.isCheck){
         _this.$toast(_this.title.mes);
         return;
      }
       /** 验证商品图片 */
      if(_this.imgList.length==0){
         _this.$toast("请上传图片！");
        return;
      }
        /** 验证商品描述 */
      if(_this.productObj.desc.length<15){
         _this.$toast("商品描述长度不能小于15个字,请重新填写！");
        return;
      }
       /** 验证商品类目为空 */
      if (!_this.productObj.cate.name) {
        _this.$toast("请选择类目！");
        return;
      }else if(_this.productObj.cate.hasNext=='1'){
        _this.$toast("请选择一个终极类目！");
        return;
      }
      // 跳转的设置价格页面
      _this.$router.push({
          path:'/addgoods/setPrice'
      })
    }
  },
  beforeMount(){
     this.shopname=this.productObj.title;
     this.imgList=this.productObj.imgList;
  }
};
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/releasedStyle.css";
.mint-toast-text {
  font-size: 30px;
}
</style>