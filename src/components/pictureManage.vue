<template>
  <div class="pictureManage">
    <div class="picture-head">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">图片素材</el-menu-item>
        <el-menu-item index="2">视频素材</el-menu-item>
      </el-menu>
      <div class="line"></div>
      </el-menu>
    </div>
    <div class="picture-box">
      <div class="picture-check" v-show="listLabel==1">
        <span class="check-item"><el-checkbox v-model="checked" :indeterminate="picAllStatu"  @change="picAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel('pic')">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==1">
        <div class="picture-list-item update" >
          <el-upload class="avatar-uploader" :action="host.hostUrl+'/common/upload'"  :on-success="imgSuccess">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
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
        	  	<!--<span class="el-icon-edit" @click="editItem"></span>-->
        	  	<span class="el-icon-delete" @click="delItem(x,'pic')"></span>
        	  </div>
        </div>
      </div>
      <div class="picture-check" v-show="listLabel==2">
        <span class="check-item"><el-checkbox v-model="checkVideo":indeterminate="videoAllStatu"  @change="videoAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel('video')">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==2">
        <div class="picture-list-item update" >
          <el-upload class="avatar-uploader" :action="host.hostUrl+'/common/upload'" :on-success="videoSuccess" >
          	<i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传视频支持MP4,wma等格式，不超过10M</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in videoList"  :key="i">
        	  <video :src="x.filePath" controls="controls" @click="videoChoose(i,checkVideoShow[i],x)" style="width: 100%;height: 100%;">
			您的浏览器不支持 video 标签。
		  </video>
        	  <div class="picture-list-item-check">
        	    <el-checkbox v-model="checkVideoList[i]" v-show="checkVideoShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop"  v-show="itemShow==i" :class="{topBar:itemShow==i}"><span>{{x.name}}</span></div>
        	  <div class="picture-list-item-hoverFoot" v-show="itemShow==i" :class="{footBar:itemShow==i}">
        	  	<span class="el-icon-view"  @click="lookItem(x)"></span>
        	  	<!--<span class="el-icon-edit" @click="editItem"></span>-->
        	  	<span class="el-icon-delete" @click="delItem(x,'video')"></span>
        	  </div>
        </div>
      </div>
       
      <div class="pictrue-page"v-show="listLabel==1">
      	<el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="10">
        </el-pagination>
      </div>
       <div class="pictrue-page"v-show="listLabel==2">
      	<el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
	import host from './config/host'
  export default {
    name: 'pictureManage',
    data() {
      return {
        checked: '',
        checkVideo:'',
        imageUrl: '',
        itemShow:null,
        checkShow:[],
        checkList:[],
        listLabel:'1',
        currentPage:1,
        checkVideoShow:[],
        checkVideoList:[],
        picAllStatu:false,
        videoAllStatu:false,
        picList:[],
        videoList:[],
        host:host,
      }
    },
    watch:{
    	
    },
    created(){
    	   this.getpicList()
    	   this.getVideo()
    },
    methods: {
    	  getpicList(){
    	  	this.$http.get(this.$API.getMaterials+'?materialsType=1',(res)=>{
    	  		console.log(res)
    	  		if(res.data.code==200){
    	  			this.picList = res.data.data
    	  			this.checkShow = []
    	  			this.checkList = []
    	  			this.checked = ''
    	  		}
    	  	})
    	  },
    	  getVideo(){
    	  	this.$http.get(this.$API.getMaterials+'?materialsType=2',(res)=>{
    	  		console.log(res)
    	  		if(res.data.code==200){
    	  			this.videoList = res.data.data
    	  			this.checkVideoShow=[]
        			this.checkVideoList=[]
        			this.checkVideo = ''
    	  		}
    	  	})
    	  },
    	  
    	  videoSuccess(file,fileList){
    	  	   if(!this.videoUpload(fileList))return
        	   this.$http.post(this.$API.materialsUpload,{
        	   	filePath:fileList.response,
        	   	materialsType:2
        	   },(res)=>{
	        	   	if(res.data.data){
	        	   		this.getVideo()
	        	   	}
        	   })
    	  },
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
    	//批量删除
    	  allDel(val){
    	  	if(val==='pic'){
    	  		this.setDel(this.checked,val)
    	  	}else{
    	  		this.setDel(this.checkVideo,val)
    	  	}
    	  },
    	  setDel(stu,text){
    	  	let a 
    	  	let id =[]
    	    if(text=='pic'){
    	    	   a = this.picList
    	    }else{
    	    	   a = this.videoList
    	    }
    	  	if(stu){
    	  			for(var i =0;i<a.length;i++){
    	  				id.push(a[i].id)
    	  			}
    	  		}else{
    	  			for(var i =0;i<a.length;i++){
    	  				if(a[i].idItem){
    	  					id.push(a[i].idItem)
    	  				}
    	  			}
    	  		}
    	    console.log(id)
		this.$http.delete(this.$API.materialsAllDel+'?materialsIds='+id,{},(res)=>{
					if(res.data.data){
						if(text=='pic'){
							this.getpicList()
						}else{
							this.getVideo()
						}
					}
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
        	  this.$http.delete(this.$API.materialsAllDel+'?materialsIds='+res.id,{},(res)=>{
        	  	 console.log(res)
        	  	 if(res.data.data){
        	  	 	if(val=='pic'){
        	  	 		this.getpicList()
        	  	 	}else{
        	  	 		this.getVideo()
        	  	 	}
        	  	 	this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
        	  	 }
        	  })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    	  },
    	 
    	  //修改
    	  editItem(){
    	  	this.$prompt('', '修改文件名', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    	  },
    	  //导航
      handleSelect(key) {
        this.listLabel = key
      },
      imgSuccess(res, file) {
        console.log(this.imgUpload(file))
        if(!this.imgUpload(file))return
       
        if(file.status=='success'){
        	   this.$http.post(this.$API.materialsUpload,{
        	   	filePath:file.response,
        	   	materialsType:1
        	   },(res)=>{
        	   	if(res.data.data){
        	   		this.getpicList()
        	   	}
        	   })
        }
      },
      //图片上传
      imgUpload(file) {
      	console.log(file.raw.type)
        const imgType = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png'||file.raw.type === 'image/gif';
        const isLt = file.size / 1024 / 1024 < 10;
        if (!imgType) {
          this.$message.error('上传头像图片只能是 jpg,png,gif 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过 10MB!');
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
          this.$message.error('上传头像图片只能是 MP4,WMA 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过 10MB!');
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
      	console.log(this.picList)
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
      
      setArray(val,key,statu){
      	if(val=='pic'){
      		this.$set(this.checkShow,key,statu)
      	    this.$set(this.checkList,key,statu)
      	}else if(val=='video'){
      		this.$set(this.checkVideoShow,key,statu)
      	    this.$set(this.checkVideoList,key,statu)
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
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="less">
  .picture-head {
    margin-top: 10px;
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
  		display: flex;
  		justify-content: center;
  		align-items: center;
  		.avatar-uploader-icon{
  			font-size: 40px;
  		}
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
  	   		background-color:#1afa29;
  	   		border-color: #1afa29;
  	   		width: 40px !important;
  	   		height: 40px !important;
  	   		border-radius: 50%;
  	   		display: flex;
  	   		justify-content: center;
  	   		align-items: center;
  	   		&:after{
  	   			position: static;
  	   			border: 3px white solid;
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
  	animation: bb .5s ease;
  }
  @keyframes bb{
  	from{transform: translateY(50px);}
  	to{transform: translateY(0);}
  }
</style>
