function Uploader(t){if(!(this instanceof Uploader))return new Uploader(t);isString(t)&&(t={trigger:t});var e={trigger:null,name:null,action:null,data:null,accept:null,change:null,error:null,multiple:!0,success:null};t&&$.extend(e,t);var n=$(e.trigger);e.action=e.action||n.data("action")||"/upload",e.name=e.name||n.attr("name")||n.data("name")||"file",e.data=e.data||parse(n.data("data")),e.accept=e.accept||n.data("accept"),e.success=e.success||n.data("success"),this.settings=e,this.setup(),this.bind()}function isString(t){return"[object String]"===Object.prototype.toString.call(t)}function createInputs(t){if(!t)return[];var e,n=[];for(var s in t)e=document.createElement("input"),e.type="hidden",e.name=s,e.value=t[s],n.push(e);return n}function parse(t){if(!t)return{};for(var e={},n=t.split("&"),s=function(t){return decodeURIComponent(t.replace(/\+/g," "))},i=0;i<n.length;i++){var o=n[i].split("="),a=s(o[0]),r=s(o[1]);e[a]=r}return e}function findzIndex(t){for(var e=t.parentsUntil("body"),n=0,s=0;s<e.length;s++){var i=e.eq(s);"static"!==i.css("position")&&(n=parseInt(i.css("zIndex"),10)||n)}return n}function newIframe(){var t="iframe-uploader-"+iframeCount,e=$('<iframe name="'+t+'" />').hide();return iframeCount+=1,e}function MultipleUploader(t){if(!(this instanceof MultipleUploader))return new MultipleUploader(t);isString(t)&&(t={trigger:t});var e=$(t.trigger),n=[];e.each(function(e,s){t.trigger=s,n.push(new Uploader(t))}),this._uploaders=n}!function(t){if(window.Piplin={},Piplin.project_id=Piplin.project_id||null,Piplin.statuses={FINISHED:0,PENDING:1,RUNNING:2,FAILED:3,NOT_RUNNED:4,TASK_DRAFT:-1,TASK_COMPLETED:0,TASK_PENDING:1,TASK_RUNNING:2,TASK_FAILED:3,TASK_ERRORS:4,TASK_CANCELLED:5,TASK_ABORTED:6,SVRLOG_COMPLETED:0,SVRLOG_PENDING:1,SVRLOG_RUNNING:2,SVRLOG_FAILED:3,SVRLOG_CANCELLED:4},Piplin.events={MODEL_CREATED:"Piplin\\Bus\\Events\\ModelCreatedEvent",MODEL_CHANGED:"Piplin\\Bus\\Events\\ModelChangedEvent",MODEL_TRASHED:"Piplin\\Bus\\Events\\ModelTrashedEvent",SVRLOG_CHANGED:"Piplin\\Bus\\Events\\ServerLogChangedEvent",OUTPUT_CHANGED:"Piplin\\Bus\\Events\\ServerOutputChangedEvent"},t.ajaxPrefilter(function(e,n,s){s.setRequestHeader("X-CSRF-Token",t('meta[name="token"]').attr("content"))}),t("form").submit(function(){t(this).find(":submit").prop("disabled",!0)}),null==window.location.href.match(/login|password/)){var e=t('meta[name="locale"]').attr("content");Lang.setLocale(e),moment.locale(e),t('[data-toggle="tooltip"]').tooltip(),Piplin.select2_options={width:"100%",minimumResultsForSearch:1/0},t(".select2").select2(Piplin.select2_options),new Clipboard(".clipboard").on("success",function(t){Piplin.toast(trans("app.copied"))}),Piplin.listener=io.connect(t('meta[name="socket_url"]').attr("content"),{query:"jwt="+t('meta[name="jwt"]').attr("content")}),Piplin.connection_error=!1,Piplin.listener.on("connect_error",function(e){Piplin.connection_error||t("#socket_offline").show(),Piplin.connection_error=!0}),Piplin.listener.on("connect",function(){t("#socket_offline").hide(),Piplin.connection_error=!1}),Piplin.listener.on("reconnect",function(){t("#socket_offline").hide(),Piplin.connection_error=!1}),Piplin.loadLivestamp=function(){t("abbr.timeago").each(function(){var e=t(this);e.livestamp(e.data("timeago")).tooltip()})},Piplin.formatProjectStatus=function(t){var e={};return e.icon_class="help",e.label_class="default",e.label=trans("projects.not_deployed"),t===Piplin.statuses.FINISHED?(e.icon_class="check",e.label_class="success",e.label=trans("projects.finished")):t===Piplin.statuses.RUNNING?(e.icon_class="load piplin-spin",e.label_class="warning",e.label=trans("projects.running")):t===Piplin.statuses.FAILED?(e.icon_class="close",e.label_class="danger",e.label=trans("projects.failed")):t===Piplin.statuses.PENDING&&(e.icon_class="clock",e.label_class="info",e.label=trans("projects.pending")),e},Piplin.formatDeploymentStatus=function(t){var e={};return e.icon_class="clock",e.label_class="info",e.label=trans("tasks.pending"),e.done=!1,e.success=!1,t===Piplin.statuses.TASK_COMPLETED?(e.icon_class="check",e.label_class="success",e.label=trans("tasks.completed"),e.done=!0,e.success=!0):t===Piplin.statuses.TASK_RUNNING?(e.icon_class="load piplin-spin",e.label_class="warning",e.label=trans("tasks.running")):t===Piplin.statuses.TASK_FAILED?(e.icon_class="close",e.label_class="danger",e.label=trans("tasks.failed"),e.done=!0):t===Piplin.statuses.TASK_ERRORS?(e.icon_class="close",e.label_class="success",e.label=trans("tasks.completed_with_errors"),e.done=!0,e.success=!0):t===Piplin.statuses.TASK_CANCELLED?(e.icon_class="warning",e.label_class="danger",e.label=trans("tasks.cancelled"),e.done=!0):t===Piplin.statuses.TASK_DRAFT&&(e.icon_class="edit",e.label_class="danger",e.label=trans("tasks.draft")),e},Piplin.toast=function(t,e,n){if(e=e||"",n=n||"not_in_progress",Config.get("piplin.toastr")||"not_in_progress"!=n)return"not_in_progress"==n?(toastr.options.positionClass="toast-top-center",toastr.options.progressBar=!1,toastr.options.preventDuplicates=!0,toastr.options.closeDuration=1e3,toastr.options.timeOut=3e3,toastr.options.extendedTimeOut=1e3):(toastr.options.closeButton=!0,toastr.options.progressBar=!0,toastr.options.preventDuplicates=!0,toastr.options.closeMethod="fadeOut",toastr.options.closeDuration=3e3,toastr.options.closeEasing="swing",toastr.options.positionClass="toast-bottom-right",toastr.options.timeOut=5e3,toastr.options.extendedTimeOut=7e3),"error"==n?toastr.error(t,e):"warning"==n?toastr.warning(t,e):"info"==n?(toastr.options.closeButton=!1,toastr.options.progressBar=!1,toastr.info(t,e)):toastr.success(t,e)}}}(jQuery),function(t){function e(){t.ajax({type:"GET",url:"/timeline"}).done(function(e){t("#timeline").html(e),Piplin.loadLivestamp()})}function n(e){e.model.time=moment(e.model.started_at).fromNow(),e.model.url="/task/"+e.model.id,t("#task_info_"+e.model.id).remove();var n=_.template(t("#task-list-template").html()),s=n(e.model);e.model.status===Piplin.statuses.TASK_RUNNING&&t(".running_menu").append(s);var i=t(".running_menu li.todo_item").length,o=t(".pending_menu li.todo_item").length,a=i+o;a>0?(t("#todo_menu span.label").html(a).addClass("label-success"),t("#todo_menu .dropdown-toggle i.ion").addClass("text-danger")):(t("#todo_menu span.label").html("").removeClass("label-success"),t("#todo_menu .dropdown-toggle i.ion").removeClass("text-danger"));var r=_.template(t("#todo-item-empty-template").html());i>0?(t(".running_header i").addClass("piplin-spin"),t(".running_menu li.item_empty").remove()):(t(".running_header i").removeClass("piplin-spin"),t(".running_menu li.item_empty").remove(),t(".running_menu").append(r({empty_text:trans("dashboard.running_empty")})));var l=Lang.choice("dashboard.pending",o,{count:o}),p=Lang.choice("dashboard.running",i,{count:i});t(".running_header span").text(p),t(".pending_header span").text(l)}Piplin.loadLivestamp(),Piplin.listener.on("task:"+Piplin.events.MODEL_CHANGED,function(s){n(s),t("#timeline").length>0&&e();var i=t("#task_"+s.model.id);if(i.length>0){t("td.committer",i).text(s.model.committer),s.model.commit_url&&t("td.commit",i).html('<a href="'+s.model.commit_url+'" target="_blank">'+s.model.short_commit+"</a>("+s.model.branch+")");var o=t("td.status span",i),a=Piplin.formatDeploymentStatus(parseInt(s.model.status));a.done&&(t("button#deploy_project:disabled").removeAttr("disabled"),t("td a.btn-cancel",i).remove(),a.success&&t("button.btn-rollback").removeClass("hide")),o.attr("class","text-"+a.label_class),t("i",o).attr("class","piplin piplin-"+a.icon_class),t("span",o).text(a.label)}else{var r=trans("tasks.deploy_title",{id:s.model.id});s.model.status===Piplin.statuses.TASK_COMPLETED?Piplin.toast(r+" - "+trans("tasks.completed"),s.model.project_name,"success"):s.model.status===Piplin.statuses.TASK_FAILED?Piplin.toast(r+" - "+trans("tasks.failed"),s.model.project_name,"error"):s.model.status===Piplin.statuses.TASK_ERRORS&&Piplin.toast(r+" - "+trans("tasks.completed_with_errors"),s.model.project_name,"warning")}}),Piplin.listener.on("project:"+Piplin.events.MODEL_CHANGED,function(e){var n=t("#project_"+e.model.id);if(n.length>0){var s=t("td.status span",n),i=Piplin.formatProjectStatus(parseInt(e.model.status));t("td.name",n).text(e.model.name),t("td.time",n).text(moment(e.model.last_run).fromNow()),s.attr("class","text-"+i.label_class),t("i",s).attr("class","piplin piplin-"+i.icon_class),t("span",s).text(i.label)}}),Piplin.listener.on("project:"+Piplin.events.MODEL_TRASHED,function(t){parseInt(t.model.id)===parseInt(Piplin.project_id)&&(window.location.href="/")}),Piplin.listener.on("task:"+Piplin.events.MODEL_CREATED,function(e){var n=parseInt(t('meta[name="user_id"]').attr("content"));e.model.user_id==n&&Piplin.toast(trans("tasks.create_success"),"","info").on("click",function(){window.location.href="/task/"+e.model.id})})}(jQuery);var iframeCount=0;Uploader.prototype.setup=function(){this.form=$('<form method="post" enctype="multipart/form-data"target="" action="'+this.settings.action+'" />'),this.iframe=newIframe(),this.form.attr("target",this.iframe.attr("name"));var t=this.settings.data;this.form.append(createInputs(t)),window.FormData?this.form.append(createInputs({_uploader_:"formdata"})):this.form.append(createInputs({_uploader_:"iframe"}));var e=document.createElement("input");e.type="file",e.name=this.settings.name,this.settings.accept&&(e.accept=this.settings.accept),this.settings.multiple&&(e.multiple=!0,e.setAttribute("multiple","multiple")),this.input=$(e);var n=$(this.settings.trigger);return this.input.attr("hidefocus",!0).css({position:"absolute",top:0,right:0,opacity:0,outline:0,cursor:"pointer",height:n.outerHeight(),fontSize:Math.max(64,5*n.outerHeight())}),this.form.append(this.input),this.form.css({position:"absolute",top:n.offset().top,left:n.offset().left,overflow:"hidden",width:n.outerWidth(),height:n.outerHeight(),zIndex:findzIndex(n)+10}).appendTo("body"),this},Uploader.prototype.bind=function(){var t=this,e=$(t.settings.trigger);e.mouseenter(function(){t.form.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(),height:e.outerHeight()})}),t.bindInput()},Uploader.prototype.bindInput=function(){var t=this;t.input.change(function(e){t._files=this.files||[{name:e.target.value}];var n=t.input.val();if(t.settings.change)t.settings.change.call(t,t._files);else if(n)return t.submit()})},Uploader.prototype.submit=function(){var t=this;if(window.FormData&&t._files){var e=new FormData(t.form.get(0));e.append(t.settings.name,t._files);var n;if(t.settings.progress){var s=t._files;n=function(){var e=$.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var n=0,i=e.loaded||e.position,o=e.total;e.lengthComputable&&(n=Math.ceil(i/o*100)),t.settings.progress(e,i,o,n,s)},!1),e}}return $.ajax({url:t.settings.action,type:"post",processData:!1,contentType:!1,data:e,xhr:n,context:this,success:t.settings.success,error:t.settings.error}),this}return t.iframe=newIframe(),t.form.attr("target",t.iframe.attr("name")),$("body").append(t.iframe),t.iframe.one("load",function(){$('<iframe src="javascript:false;"></iframe>').appendTo(t.form).remove();var e;try{e=$(this).contents().find("body").html()}catch(t){e="cross-domain"}$(this).remove(),e?t.settings.success&&t.settings.success(e):t.settings.error&&t.settings.error(t.input.val())}),t.form.submit(),this},Uploader.prototype.refreshInput=function(){var t=this.input.clone();this.input.before(t),this.input.off("change"),this.input.remove(),this.input=t,this.bindInput()},Uploader.prototype.change=function(t){return t?(this.settings.change=t,this):this},Uploader.prototype.success=function(t){var e=this;return this.settings.success=function(n){e.refreshInput(),t&&t(n)},this},Uploader.prototype.error=function(t){var e=this;return this.settings.error=function(n){t&&(e.refreshInput(),t(n))},this},Uploader.prototype.enable=function(){this.input.prop("disabled",!1),this.input.css("cursor","pointer")},Uploader.prototype.disable=function(){this.input.prop("disabled",!0),this.input.css("cursor","not-allowed")},MultipleUploader.prototype.submit=function(){return $.each(this._uploaders,function(t,e){e.submit()}),this},MultipleUploader.prototype.change=function(t){return $.each(this._uploaders,function(e,n){n.change(t)}),this},MultipleUploader.prototype.success=function(t){return $.each(this._uploaders,function(e,n){n.success(t)}),this},MultipleUploader.prototype.error=function(t){return $.each(this._uploaders,function(e,n){n.error(t)}),this},MultipleUploader.prototype.enable=function(){return $.each(this._uploaders,function(t,e){e.enable()}),this},MultipleUploader.prototype.disable=function(){return $.each(this._uploaders,function(t,e){e.disable()}),this},MultipleUploader.Uploader=Uploader;