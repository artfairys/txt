<template>
	<div id="Upload">
		<h2>目前处于测试中</h2>
		<div class="layui-upload">
			<button type="button" class="layui-btn" id="uploadPic">上传图片</button>
			<div class="layui-upload-list">
				<img class="img-responsive " id="previewImg">
				<p id="errorText"></p>
			</div>
			<div style="width: auto;">
				<div class="layui-progress layui-progress-big" lay-showpercent="yes"
					lay-filter="demo">
					<div class="layui-progress-bar" lay-percent="">
						<span class="layui-progress-text"></span>
					</div>
				</div>
			</div>
			
		</div>
		<div class="row" v-if="fileURL!=''"> 
			<img class="img-thumbnail img-responsive img-circle"
			:src="API.SERVERBASE+fileURL"/>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Upload',
		data(){
			return{
				fileURL:""
			}
		},
		provide(){
			var v =this
			layui.use(['upload', 'element', 'layer'], function() {
				var $ = layui.jquery,
					upload = layui.upload,
					element = layui.element,
					layer = layui.layer;
			
				//常规使用 - 普通图片上传
				var uploadInst = upload.render({
					elem: '#uploadPic',
					url:  v.API.API_FILE_UPLOAD_V2, //上传接口
					headers:{
						token:localStorage.getItem("token")
					},
					before: function(obj) {
						//预读本地文件示例，不支持ie8
						obj.preview(function(index, file, result) {
							//console.log("file",file)
							$('#previewImg').attr('src', result); //图片链接（base64）
						});
			
						element.progress('demo', '0%'); //进度条复位
						layer.msg('上传中', {
							icon: 16,
							time: 0
						});
					},
					// 请求成功的回调（并非指上传成功/写入文件成功）
					done: function(res) {
						
						//如果上传失败
						if (res.code > -1) {
							return layer.msg('上传失败');
						}
						//上传成功的一些操作
						//……
						$('#errorText').html(''); //置空上传失败的状态
						
						//console.log("done",res)
						v.fileURL ="/upload/" +res.fileName
					},
					error: function() {
							//演示失败状态，并实现重传
							var errorText = $('#errorText');
							errorText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
							errorText.find('.demo-reload').on('click', function() {
								uploadInst.upload();
							});
						},
						//进度条
					progress: function(n, elem, e) {
						//可配合 layui 进度条元素使用
						//上传进度
						element.progress('demo', n + '%'); 
						if (n == 100) {
							layer.msg('上传完毕', {
								icon: 1
							});
						}
					}
				});
			
			});
		},
		methods:{
			
		}
	}
</script>

<style>
	
</style>
