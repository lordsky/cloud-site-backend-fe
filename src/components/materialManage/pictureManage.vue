<template>
  <div class="pictureManage">
    <div class="picture-head">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">图片素材</el-menu-item>
        <el-menu-item index="2">视频素材</el-menu-item>
        <el-menu-item index="3">文件素材</el-menu-item>
      </el-menu>
      <div class="line"></div>
      </el-menu>
    </div>
    <div class="picture-box">
      <div class="picture-check" v-show="listLabel==1">
        <span class="check-item"><el-checkbox v-model="checked" :indeterminate="picAllStatu"  @change="picAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel('pic')" :disabled="btnPic">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==1">
        <div class="picture-list-item update" >
         <el-upload class="avatar-uploader"  :on-success="imgSuccess" :action="host.hostUrl+'/common/upload'">
           <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传图片支持jpg,png,gif等格式，不超过10M</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in picList" @mouseleave="itemShow = null" @mouseenter="itemShow = i" :key="i">
        	  <img :src="x.filePath" @click="choose(i,checkShow[i],x)"/>
        	  <div class="picture-list-item-check">
        	    <el-checkbox v-model="checkList[i]" v-show="checkShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop" v-show="itemShow==i" :class="{topBar:itemShow==i}"><span>{{x.name}}</span></div>
        	  <div class="picture-list-item-hoverFoot" v-show="itemShow==i" :class="{footBar:itemShow==i}">
        	  	<span class="el-icon-view" @click="lookItem(x)"></span>
        	  	<span class="el-icon-edit" @click="editItem(x,'pic')"></span>
        	  	<span class="el-icon-delete" @click="delItem(x,'pic')"></span>
        	  </div>
        </div>
      </div>
      <div class="picture-check" v-show="listLabel==2">
        <span class="check-item"><el-checkbox v-model="checkVideo":indeterminate="videoAllStatu"  @change="videoAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel('video')" :disabled="btnVideo">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==2">
        <div class="picture-list-item update" >
          <el-upload class="avatar-uploader"  :on-success="videoSuccess" :action="host.hostUrl+'/common/upload'">
          	<i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传视频支持MP4,wma等格式，不超过10M</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in videoList"  :key="i"  @mouseleave="itemShow = null" @mouseenter="itemShow = i">
        	  <div class="mask-list" @click="videoChoose(i,checkVideoShow[i],x)"></div>
        	  <video :src="x.filePath" controls="controls" style="width: 100%;height: 100%;z-index: 1;">
			您的浏览器不支持 video 标签。
		  </video>
        	  <div class="picture-list-item-check">
        	    <el-checkbox v-model="checkVideoList[i]" v-show="checkVideoShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop"  v-show="itemShow==i" :class="{topBar:itemShow==i}"><span>{{x.name}}</span></div>
        	  <div class="picture-list-item-hoverFoot" v-show="itemShow==i" :class="{footBar:itemShow==i}">
        	  	<span class="el-icon-view"  @click="lookItem(x)"></span>
        	  	<span class="el-icon-edit" @click="editItem(x,'video')"></span>
        	  	<span class="el-icon-delete" @click="delItem(x,'video')"></span>
        	  </div>
        </div>
      </div>
       <div class="picture-check" v-show="listLabel==3">
        <span class="check-item"><el-checkbox v-model="checkedText" :indeterminate="textAllStatu"  @change="textAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel('text')" :disabled="btnText">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==3">
        <div class="picture-list-item update" >
         <el-upload class="avatar-uploader"  :on-success="textSuccess" :action="host.hostUrl+'/common/upload'">
           <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传文件支持doc、pdf、zip等格式</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in textList" @mouseleave="itemShow = null" @mouseenter="itemShow = i" :key="i">
        	  <div class="list-text" @click="chooseText(i,checkTextShow[i],x)">
        	  	 <img src="../../assets/img/test3.png"  id="text_ico"/>
        	  </div>
        	  <div class="picture-list-item-check">
        	    <el-checkbox v-model="checkTextList[i]" v-show="checkTextShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop"><span>{{x.name}}</span></div>
        	  <div class="picture-list-item-hoverFoot">
        	  	<!--<span class="el-icon-view" @click="lookItem(x)"></span>-->
        	  	<span class="el-icon-edit" @click="editItem(x,'text')"></span>
        	  	<span class="el-icon-delete" @click="delItem(x,'text')"></span>
        	  </div>
        </div>
      </div>
      <div class="pictrue-page" v-show="listLabel==1">
      	<el-pagination
		  background
		  @current-change="handlePic"
		  layout="prev, pager, next, jumper"
		  :page-size="pageSize"
		  :total="totalPic">
		</el-pagination>
      </div>
       <div class="pictrue-page"v-show="listLabel==2">
      	<el-pagination
      background
      @current-change="handleVideo"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalVideo">
        </el-pagination>
      </div>
       <div class="pictrue-page"v-show="listLabel==3">
      	<el-pagination
      background
      @current-change="handleText"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalText">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
	import host from '../config/host'
  export default {
    name: 'pictureManage',
    data() {
      return {
        checked: '',
        checkVideo:'',
        checkedText:'',
        imageUrl: '',
        itemShow:null,
        checkShow:[],
        checkList:[],
        checkTextList:[],
        checkTextShow:[],
        listLabel:'1',
        currentPage:1,
        checkVideoShow:[],
        checkVideoList:[],
        picAllStatu:false,
        videoAllStatu:false,
        textAllStatu:false,
        picList:[],
        videoList:[],
        textList:[],
        host:host,
        pageNumPic:1,
        pageNumVideo:1,
        pageNumText:1,
        pageSize:7,
        totalPic:0,
        totalVideo:0,
        totalText:0,
        btnPic:true,
        btnVideo:true,
        btnText:true
      }
    },
    watch:{
    	  checkList(val){
    	  	for(let i =0;i<val.length;i++){
    	  		if(val[i]){
    	  			this.btnPic = false
    	  			return
    	  		}
    	  	}
    	  	this.btnPic = true
    	  },
    	  checkVideoList(val){
    	  	for(let i =0;i<val.length;i++){
    	  		if(val[i]){
    	  			this.btnVideo = false
    	  			return
    	  		}
    	  	}
    	  	this.btnVideo = true
    	  },
    	  checkTextList(val){
    	  	for(let i =0;i<val.length;i++){
    	  		if(val[i]){
    	  			this.btnText = false
    	  			return
    	  		}
    	  	}
    	  	this.btnText = true
    	  }
    },
    created(){
    	    this.getpicList()
    	    this.getVideo()
    	    this.getText()
    	 },
    methods: {
    	// 获取列表数据
    	  getList(type,success){
    	  	let pageNum 
    	  	type===1?pageNum=this.pageNumPic:type===2?pageNum=this.pageNumVideo:pageNum=this.pageNumText
    	  	this.$http.get(this.$API.getMaterials+'?materialsType='+type+'&pageNum='+pageNum+'&pageSize='+this.pageSize,(res)=>{
    	  		success(res)
    	  	})
    	  	},
    	 //上传数据
    	  uploadList(type,file,success){
    	  	this.$http.post(this.$API.materialsUpload,{
        	   	filePath:file.response,
        	   	materialsType:type,
        	   	name:file.name
        	   },(res)=>{
        	   	if(res.data.data){
        	   		this.$message({type:'success',message:'添加成功'})
        	   		success(res)
        	   	}else{
        	   		this.$message({type:'warning',message:'添加失败'})
        	   	}
        	   })
    	  },
    	  	//获取图片
    	  getpicList(){
          this.getList(1,(data)=>{
          	 console.log(data)
          	 this.totalPic = data.data.data.totalElements
          	 this.picList = data.data.data.content
             this.checkShow = []
             this.picAllStatu = false
          })
    	  },
    	  //获取视频
    	  getVideo(){
    	  	this.getList(2,(data)=>{
          	 this.videoList = data.data.data.content
          	 this.totalVideo = data.data.data.totalElements
          	 this.checkVideoShow = []
          	 this.videoAllStatu = false
          })
    	  },
    	  //获取文本
    	  getText(){
    	  	this.getList(3,(data)=>{
          	 this.textList = data.data.data.content
          	 this.totalText = data.data.data.totalElements
          	 this.checkTextShow = []
          	 this.textAllStatu = false
          })
    	  },
    	  //查看图片
    	  lookItem(val){
    	  	window.open(val.filePath)
    	  },
    	 //全选
    	  picAllChange(val){
    	  	if(this.picAllStatu){
    	  	    this.picAllStatu = false
    	  	    this.checked = val
    	  	}
    	  	this.setcheckAll(val,'pic',this.picList)
    	  },
    	  videoAllChange(val){
    	  	if(this.videoAllStatu){
    	  	    this.videoAllStatu = false
    	  	    this.checkVideo = val
    	  	}
    	  	this.setcheckAll(val,'video',this.videoList)
    	  },
    	  textAllChange(val){
    	  	console.log(val)
    	  	if(this.textAllStatu){
    	  	    this.textAllStatu = false
    	  	    this.checkedText = val
    	  	}
    	  	this.setcheckAll(val,'text',this.textList)
    	  },
    	//批量删除
    	  allDel(val){
    	  	if(val==='pic'){
    	  		this.setDel(this.checked,val)
    	  	}else if(val=='video'){
    	  		this.setDel(this.checkVideo,val)
    	  	}else if(val=='text'){
    	  		this.setDel(this.checkedText,val)
    	  	}
    	  },
    	  setDel(stu,text){
    	  	let arr 
    	  	let id =[]
    	    if(text=='pic'){
    	    	   arr = this.picList
    	    }else if(text=='video'){
    	    	   arr = this.videoList
    	    }else if(text=='text'){
    	    	   arr = this.textList
    	    }
    	  	if(stu){
    	  			for(var i =0;i<arr.length;i++){
    	  				id.push(arr[i].id)
    	  			}
    	  		}else{
    	  			for(var i =0;i<arr.length;i++){
    	  				if(arr[i].idItem){
    	  					id.push(arr[i].idItem)
    	  				}
    	  			}
    	  		}
    	    console.log(id)
		this.$http.delete(this.$API.materialsAllDel+'?materialsIds='+id,{},(res)=>{
			        console.log(res)
					if(res.data.data){
						if(text=='pic'){
							this.getpicList()
						}else if(text=='video'){
							this.getVideo()
						}else{
							this.getText()
						}
					}
					this.$message({ type: 'success',message:'删除成功!'})
			})
    	  },
    	  
    	  //删除
    	  delItem(res,val){
    	  	console.log(res)
    	  	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	  this.$http.delete(this.$API.materialsAllDel+'?materialsIds='+res.id,{},res=>{
        	  	console.log(res)
        	  	 if(res.data.data){
        	  	 	if(val=='pic'){
        	  	 		this.getpicList()
        	  	 	}else if(val=='video'){
        	  	 		this.getVideo()
        	  	 	}else{
        	  	 		this.getText()
        	  	 	}
        	  	 	this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
        	  	 }
        	  })
    	   })
    	 },
    	  //修改
    	  editItem(val,text){
    	  	console.log(val)
    	  	this.$prompt('文件名修改:', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
        	  this.$http.post(this.$API.setMaterials,{
        	  	id:val.id,
        	  	name:value
        	  },(response)=>{
        	  	 console.log(response)
        	  	 if(response.data.code===200){
        	  	 	if(text=='pic'){
        	  	 		this.getpicList()
        	  	 	}else if(text=='video'){
        	  	 		this.getVideo()
        	  	 	}else{
        	  	 		this.getText()
        	  	 	}
        	  	 	this.$message({
		            type: 'success',
		            message: '修改成功'
		          });
        	  	 }
        	  })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    	  },
    	  //导航
      handleSelect(key) {
        this.listLabel = key
      },
      imgSuccess(res, file) {
        if(!this.imgUpload(file))return
        this.uploadList(1,file,(response)=>{
        	    console.log(response)
        	    this.getpicList()
        })
      },
      videoSuccess(file,fileList){
    	  	   if(!this.videoUpload(fileList))return
    	  	   this.uploadList(2,fileList,(response)=>{
        	    console.log(response)
        	    this.getVideo()
           })
    	  },
    	  textSuccess(res,file){
    	  	 if(!this.textUpload(file))return
    	  	this.uploadList(3,file,(response)=>{
        	    console.log(response)
        	    this.getText()
           })
    	  },
      //图片上传
      imgUpload(file) {
      	console.log(file.raw.type)
        const imgType = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png'||file.raw.type === 'image/gif';
        const isLt = file.size / 1024 / 1024 < 10;
        if (!imgType) {
          this.$message.error('上传图片只能是 jpg,png,gif 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过 10MB!');
          return false
        }
        return true
      },
      //文本上传
      textUpload(file) {
      	console.log(file.raw.type)
        const textType = file.raw.type === 'application/pdf'||file.raw.type === 'application/msword'||file.raw.type === 'application/zip';
        const isLt = file.size / 1024 / 1024 < 10;
        if (!textType) {
          this.$message.error('上传文件只能是 doc、pdf、zip 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传文件大小不能超过 10MB!');
          return false
        }
        return true
      },
      //视频上传
      videoUpload(file) {
        	console.log(file.raw.type)
        const videoType = file.raw.type === 'video/mp4'||file.raw.type === 'video/wma';
        const isLt = file.size / 1024 / 1024 < 10;
        if (!videoType) {
          this.$message.error('上传视频只能是 MP4,WMA 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传视频大小不能超过 10MB!');
          return false
        }
        return true
      },
      //图片选择
      choose(key,stu,val){
      	if(stu){
      		this.setArray('pic',key,false)
      		this.picList[key].idItem = ''
      	}else{
      		this.setArray('pic',key,true)
      		this.picList[key].idItem = val.id
      	}
      	this.picAllStatu = true
      	this.checked = false
      },
      //视频选择
      videoChoose(key,stu,val){
      	if(stu){
      		this.setArray('video',key,false)
      		this.videoList[key].idItem = ''
      	}else{
      		this.setArray('video',key,true)
      		this.videoList[key].idItem = val.id
      	}
      	this.videoAllStatu = true
      	this.checkVideo = false
      },
      //文本选择
      chooseText(key,stu,val){
      	if(stu){
      		this.setArray('text',key,false)
      		this.textList[key].idItem = ''
      	}else{
      		this.setArray('text',key,true)
      		this.textList[key].idItem = val.id
      	}
      	this.textAllStatu = true
      	this.checkedText = false
      },
      setArray(val,key,statu){
      	if(val=='pic'){
      		this.$set(this.checkShow,key,statu)
      	    this.$set(this.checkList,key,statu)
      	}else if(val=='video'){
      		this.$set(this.checkVideoShow,key,statu)
      	    this.$set(this.checkVideoList,key,statu)
      	}else if(val =='text'){
      		this.$set(this.checkTextShow,key,statu)
      	    this.$set(this.checkTextList,key,statu)
      	}
      },
      setcheckAll(val,text,list){
      	  if(val){
    	     	for(var i =0;i<list.length;i++){
    	     		this.setArray(text,i,true)
    	     	}
    	      }else{
    	     	for(var i =0;i<list.length;i++){
    	     		this.setArray(text,i,false)
    	     	}
    	      }
      },
      //当前页
      handlePic(val) {
      	this.pageNumPic = val
      	this.getpicList()
      },
       handleVideo(val) {
      	this.pageNumVideo = val
      	this.getVideo()
      },
      handleText(val){
      	this.pageNumText = val
      	this.getText()
      }
    }
  }
</script>

<style lang="less">
  .picture-head {
    margin-top: 10px;
  }
  .pictureManage-content{
  	width: 85%;
  	min-height: 100vh;
  	margin:auto;
  	padding: 0 20px 0 20px;
  	margin-top: 30px;
  	box-shadow: -1px 5px 20px #e0e1e0;
  }
  .picture-box {
    margin-top: 10px;
    .picture-check {
      .check-item {
        width: 100px;
        display: inline-block;
        text-align: center;
      }
    }
    .pictrue-page{
     	margin-bottom: 20px;
    }
  }
  .list-text{
  	width: 100%;
  	height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #text_ico{
  	width: 80px;
  	height: 80px;
  }
  .picture-list{
  	width: 100%;
  	margin-bottom: 20px;
  	&:after{
  		content: '';
  		clear: both;
  		display:block;
  	}
  	.el-upload-list{
  		display: none;
  	}
  	.picture-list-item{
  		overflow: hidden;
  		float: left;
  		margin-right: 3%;
  		margin-top: 10px;
  		position: relative;
  		width: 22%;
  		height: 300px;
  		border:10px solid #cccccc;
  		.el-upload{
  		width: 100%;
  		height: 270px;
  		display: flex ;
  		justify-content: center ;
  		align-items: center ;
  		.avatar-uploader-icon{
  			font-size: 40px;
  			display: flex;
  			justify-content: center ;
  		    align-items: center ;
  		}
  	   }
  	   .mask-list{
  	   	 width: 100%;
  	   	 height: 100%;
  	   	 position: absolute;
  	   	 top: 0;
  	   	 z-index: 10;
  	   }
  	   .picture-list-item-hoverTop{
  	   	height: 20%;
  	   	width: 100%;
  	   	background: rgba(0,0,0,0.5);
  	   	position: absolute;
  	   	top: 0;
  	    font-size: 18px;
  	    font-weight: 200;
  	    color: white;
  	    display: flex;
  	    align-items: center;
  	    span{
  	    	   padding-left: 20px;
  	    }
  	   }
  	   .picture-list-item-hoverFoot{
  	   	height: 20%;
  	   	width: 100%;
  	   	background: rgba(0,0,0,0.5);
  	   	position: absolute;
  	   	bottom: 0;
  	   	display: flex;
  	   	justify-content: center;
  	   	align-items: center;
  	   	span{
  	   		display: inline-block;
  	   		width: 25px;
  	   		height: 25px;
  	   		background: #bfbfbf;
  	   		margin-right: 10px;
  	   		display: flex;
  	   		align-items: center;
  	   		justify-content: center;
  	   		border-radius: 4px;
  	   		font-size: 16px;
  	   		color: white;
  	   		cursor: pointer;
  	   	}
  	   }
  	   .picture-warning{
  		font-size: 13px;
  		color: red;
  		padding-left: 5px;
  	   }
  	   img{
  	   	width: 100%;
  	   	height: 100%;
  	   }
  	   .picture-list-item-check{
  	   	position: absolute;
  	   	top: 0px;
  	   	right: 0px;
  	   	z-index: 10;
  	   	.el-checkbox__inner{
  	   		background-color:#1afa29  !important;
  	   		border-color: #1afa29 !important;
  	   		width: 40px !important;
  	   		height: 40px !important;
  	   		border-radius: 50%;
  	   		display: flex;
  	   		justify-content: center;
  	   		align-items: center;
  	   		&:after{
  	   			position: static;
  	   			border: 3px white solid;
  	   			border-color: white !important;
  	   			height: 15px;
  	   			width: 7px;
  	   			border-left: 0;
  	   			border-top: 0;
  	   		}
  	   	}
  	   }
  	}
  	.update{
  		border: 0;
  	}
  	.itemHover{
  		display: block;
  	}
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .topBar{
  	animation: aa .5s ease;
  }
  @keyframes aa{
  	from{transform: translateY(-50px);}
  	to{transform: translateY(0);}
  }
  .footBar{
  	z-index: 20;
  	animation: bb .5s ease;
  }
  @keyframes bb{
  	from{transform: translateY(50px);}
  	to{transform: translateY(0);}
  }
  .head-mask{
  	height: 62px;
  	background: #4170f2;
  }
</style>
