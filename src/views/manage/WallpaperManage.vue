<template>
	<div id="WallpaperManage">
		<div class="row">
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>UUID名：</label>
				<el-input v-model="conditionWallpaper.name" clearable placeholder="UUID"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>最小size/MB：</label>
				<el-input v-model="conditionWallpaper.startSize" clearable placeholder="最小size/MB"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>最大size/MB：</label>
				<el-input v-model="conditionWallpaper.endSize" clearable placeholder="最大size/MB"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-1 ">
				<label class="">是否审核：</label>
				<el-select v-model="conditionWallpaper.enabled" placeholder="请选择" clearable>
					<el-option label="启用" value='true'></el-option>
					<el-option label="未启用" value='false'></el-option>
				</el-select>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-btn" style="margin-top:24px;">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="getWallpaper">查询</el-button>
				<el-button type="primary"  v-on:click="groupByMd5">查询重复壁纸</el-button>
				<el-button type="warning" @click="batchUpdateEnabled">批量审核/下架</el-button>
				<el-button type="danger" @click="batchDelete">批量删除</el-button>
			</div>
		</div>
		<!--   -->
		<div class="row row-table" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
				<strong>当前页总数：{{wallpaper.list.length}}；<span v-if="checkedTotal && checkedTotal>0">
					已选中<font color="red">{{checkedTotal}}</font>条
				</span>
				</strong>
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr>
							<th>
								<input type="checkbox" ref="AllCheckbox" v-model="checked" @change="checkbokChange()"/>
								
							</th>
							<th>略缩图</th>
							<th>uuid名</th>
							<th>md5值</th>
							<th>大小/MB</th>
							<th>宽 * 高</th>
							<th>上传时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(wall,i) in wallpaper.list">
							<td>
								<input @click="isChecked" :id="wall.id" ref="checkbox" type="checkbox" />
							</td>
							<td>
								<img class="img-responsive img-thumbnail" :src="API.UPLOADURL+wall.resizeUrl" />
							</td>
							<td>{{wall.name}}</td>
							<td>{{wall.md5}}</td>
							<td><b>{{wall.size}}</b></td>
							<td><b>{{wall.width}} * {{wall.height}}</b></td>
							<td>{{wall.createTime}}</td>
							<td>
								
								<el-button v-if="wall.enabled" type="warning" size="small" @click="update(wall)">下架</el-button>
								<el-button v-else type="success" size="small" @click="update(wall)">审核</el-button>
								<el-button class="pull-right" type="danger" size="small" @click="delWallpaper(wall)">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="pull-right">
					<!-- :pager-count="6" 超过某页码数隐藏按钮 -->
					<el-pagination :pager-count="9" background layout="total,prev, pager, next"
					:page-size="conditionWallpaper.pageSize"
						:total="wallpaper.count" @current-change="currentPageChange">
					</el-pagination>
				</div>
		
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"WallpaperManage",
		data() {
			return{
				conditionWallpaper:{
					pageSize:15,
					page:1,//当前页
					enable:null,
					name:null,
					startSize:null,
					endSize:null
				},
				wallpaper:{},
				// 全选/全部选 checkbox的checkd
				checked:false,
				checkedTotal:0
				
			}
		},
		created() {
			this.getWallpaper()
		},
		methods:{
			// 获取所有选中的id
			getCheckedIds(){
				let ids = []
				for(let i = 0,l=this.$refs.checkbox.length;i<l;i++){
					if(this.$refs.checkbox[i].checked){
						ids.push(this.$refs.checkbox[i].id)
					}
				}
				return ids
			},
			// 单个复选框点击事件
			isChecked(){
				let total = this.getCheckedIds().length
				this.checkedTotal = total
				if(total<=0){
					this.$refs.AllCheckbox.checked = false
				}
			},
			// 获取md5值相同的壁纸
			groupByMd5(){
				this.$aget(this.AAPI.API_ADMIN_WALLPAPER_GROUPBYMD5).then(res=>{
					if(res.code==0){
						this.wallpaper['list'] = res.data
					}
				})
			},
			// 批量审核/下架
			batchUpdateEnabled(){
				let ids = this.getCheckedIds()
				if(ids.length<=0){
					this.$message.warning("你没有勾选壁纸")
					return
				}
				this.$apost(this.AAPI.API_ADMIN_WALLPAPER_UPDATE_ENABLE_BATCH,ids).then(res=>{
					if(res.code==0){
						this.getWallpaper();
						this.cancelCheckd()
					}
					this.$message({
						type:res.type,
						message:res.msg
					})
				})
				
			},
			// 将所有复选框取消选择
			cancelCheckd(){
				for(let i = 0,l=this.$refs.checkbox.length;i<l;i++){
					if(this.$refs.checkbox[i].checked){
						this.$refs.checkbox[i].checked = false
					}
				}
				this.$refs.AllCheckbox.checked = false
				this.checkedTotal = 0
			},
			// 批量删除
			batchDelete(){
				let ids = this.getCheckedIds()
				
				if(ids.length<=0){
					this.$message.warning("你没有勾选壁纸")
					return
				}
				this.$confirm('此操作将永久(数据库数据以及服务器文件), 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					this.$apost(this.AAPI.API_ADMIN_WALLPAPER_DELETE_BATCH,ids).then(res=>{
						if(res.code==0){
							this.getWallpaper();
							this.cancelCheckd()
						}
						this.$message({
							type:res.type,
							message:res.msg
						})
					})
				})
				
			},
			// 全选事件 change事件
			checkbokChange(){
				for(let i = 0,l=this.$refs.checkbox.length;i<l;i++){
					this.$refs.checkbox[i].checked = this.checked
				}
				this.$nextTick(function(){
					this.checkedTotal = this.getCheckedIds().length
				})
			},
			// 删除
			delWallpaper(wall){
				this.$confirm('此操作将永久(数据库数据以及服务器文件), 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					// 确认删除
					this.$apost(this.AAPI.API_ADMIN_WALLPAPER_DELETE,{
						id:wall.id,
						name:wall.name,
						resizeName:wall.resizeName
					}).then(res=>{
						if(res.code==0){
							this.getWallpaper();
							this.cancelCheckd()
						}
						this.$message({
							type:res.type,
							message:res.msg
						})
					})
					
					
				}).catch(() => {/* 取消回调 **/});
			},
			//修改
			update(wall){
				this.$apost(this.AAPI.API_ADMIN_WALLPAPER_UPDATE,{
					id:wall.id,
					enabled:!wall.enabled
				}).then(res=>{
					if(res.code==0){
						this.getWallpaper()
					}
					this.$message({
						type:res.type,
						message:res.msg
					})
				})
			},
			currentPageChange(val){
				this.conditionWallpaper.page = val
				this.$nextTick(function(){
					this.getWallpaper()
				})
			},
			getWallpaper(){
				this.$apost(this.AAPI.API_ADMIN_WALLPAPER_LIST,this.conditionWallpaper).then(res=>{
					if(res && res.code==0){
						this.wallpaper = res.data
					}
					
				})
			},
			reset(){
				this.conditionWallpaper.enabled = null
				this.conditionWallpaper.name = null
				this.conditionWallpaper.startSize = null
				this.conditionWallpaper.endSize = null
			}
		}
	}
</script>

<style>
	#WallpaperManage .row-table img{
		max-width: 120px;
	}
</style>
