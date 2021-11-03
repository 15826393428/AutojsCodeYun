"ui";
var qiqi = storages.create("qiqi");

ui.layout(
    <ScrollView>
    <vertical >
         <appbar>
            <toolbar title="CK提取"/>
        </appbar>
     
        <text  w="auto" h="auto" text="CK还原器" textSize="35sp" color="blue" layout_gravity="center_horizontal" marginTop="50px"/>
        <spinner id="提取软件" marginTop="10px" entries="抖音|火山"/>
        <input hint="这里填写CK账号" id="ck" marginTop="0px"/>
         <horizontal h="auto" w="*" gravity="center" marginTop="40px">
    <button id="huanyuan" w="auto" h="auto" text="还原数据" textSize="20sp" layout_gravity="center_horizontal" marginTop="40px" />
    
     </horizontal>
     <text  w="auto" h="auto" text="软件使用说明：" textSize="15sp" color="blue" layout_gravity="center_left" marginTop="0px"/>
        <text  w="auto" h="auto" text="1、提取数据前请确保已登录账号" textSize="15sp" layout_gravity="center_left" marginTop="30px"/>
        <text  w="auto" h="auto" text="2、提取和还原前请清楚软件数据" textSize="15sp" layout_gravity="center_left" marginTop="30px"/>
        <text  w="auto" h="auto" text="3、本软件需要授予root权限" textSize="15sp" layout_gravity="center_left" marginTop="30px"/>
 <text  w="auto" h="auto" text="5、本软件仅供学习与交流使用，请勿用于非法用途，请在下载后24小时内删除，作者不承担任何责任，最终解释权归作者所有" textSize="15sp" color="red" layout_gravity="center_left" marginTop="30px"/>
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

var cookie = "PHPSESSID=dm54ka7m2vgoll1e03amnkifkvn1qnmv;phpdisk_info=VmNVYFI3BT0GPAJnWzNbCAVhVl1ZMVE%2BBjYBYQM1AjAENwMxVTEFPgc1UgsBbQZsUzEDMw0xVmQCYAYyVTVRYVYxVWJSYgU6BjECZ1s4W2cFNlZsWTdRNQZmAWIDYAJmBDMDMFU%2BBW8HM1IyAVIGbVM7AzINZFYxAjEGYVVjUWVWZVVn"

ui.huanyuan.click(function(){
    threads.start(还原);
    });

function 还原() {
     if(ui.抖音.checked){
            apn = "com.ss.android.ugc.aweme"
            an = "抖音ck"
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
    files.removeDir("/sdcard/qiqi")
var ck = ui.ck.getText() + "";
try {
    if(!isNaN(ck)){
        throw error;
    }
    解密(ck)
    if (!isNaN(fileid)){
        toast("还原中，请勿进行其他操作")
        获取链接(fileid)
        下载(downurl);
        var arr = files.listDir("/sdcard/qiqi/");
        for(i=0;i<=arr.length;i++){
            if (arr[i].endsWith(".zip")){
                var zip = arr[i];
                break;
            }
        }
        var zipsrc = "/sdcard/qiqi/" + zip
        log(zipsrc)
        new ZipFile(zipsrc).extractAll("/sdcard/qiqi/");
           if (files.exists("/sdcard/qiqi/ck")){
            log("解析成功")
            toast("还原中，请勿进行其他操作")
           }else{
            toast("网络错误请重新尝试")
           }
           还原命令 = "cp -r /sdcard/qiqi/ck/* /data/data/"+apn+"/"
           shell(还原命令,true)
           查询所有者 = "ls -la /data/data/"+apn
           所有者 = shell(查询所有者,true).result.split("  ")[1]. split(" ")[2]
            log(所有者)
        命令 = "chown -R "+所有者+":"+所有者+" /data/data/"+apn
        log(命令)
        shell(命令,true)
        //  files.removeDir("/sdcard/qiqi")
           alert("还原成功")
    }else{
    throw error;
    }
} catch (error) {
    alert("还原出错，请核对ck账号")
    threads.shutDownAll();
}
}

    function 获取链接(fileid){
        var ur = "http://up.woozooo.com/doupload.php";   
                    var res = http.post(ur, {
                    "task": "22" ,
                     "file_id": fileid,
                    },{"headers":{"Cookie":cookie
                }});
                    var html = res.body.json();
                    log(html.info.is_newd+"/"+html.info.f_id)
                    url = html.info.is_newd+"/"+html.info.f_id
                    var ss = http.get(url.replace(/com\//, "com/tp/"), {
                        headers: {
                            'Accept-Language': 'zh-CN,en-US;q=0.9',
                            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 10; zh-cn; SKW-A0 Build/SKYW2007160CN00MQ3) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.141 Mobile Safari/537.36 XiaoMi/MiuiBrowser/12.7.20',
                            'Cookie': 'UM_distinctid=173f21ed671190-029620c4ec2677-531b1c52-51a6b-173f21ed672182; m_ad2=6; m_adb1=1'
                        }
                    }).body.string();
                
                    var link_1 = ss.match(/\'http.*?\'/);
                    var link_2 = ss.match(/\'\?.*?\'/);
                    downurl = link_1 == null || link_2 == null ? 0 : link_1[0].concat(link_2[0]).replace(/\'/g, "")
                    log(downurl)
                    return (link_1 == null || link_2 == null ? 0 : link_1[0].concat(link_2[0]).replace(/\'/g, ""))
        }

        function 解密(s){
            var mds= new Array();
            reg=/.{6}/g;
            rs=s.match(reg);
            rs.push(s.substring(rs.join('').length));
            // log(rs)
            for(i=0;i<rs.length;i++){
                mds[i] = rs[i][5]
            }
            fileid = mds.join("")
            log(fileid)
            return fileid;
        }

        function 下载(downurl){
            var res = http.get(downurl, {
                headers: {
                    'Accept-Language': 'zh-CN,en-US;q=0.9',
                    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 10; zh-cn; SKW-A0 Build/SKYW2007160CN00MQ3) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.141 Mobile Safari/537.36 XiaoMi/MiuiBrowser/12.7.20',
                    'Cookie': 'UM_distinctid=173f21ed671190-029620c4ec2677-531b1c52-51a6b-173f21ed672182; m_ad2=6; m_adb1=1'
                }
            })
            if(res.statusCode != 200){
                toast("服务器错误");
            }
            log(res)
            files.create("/sdcard/qiqi/")
            toast("ck数据号正常，还原中")
            files.writeBytes("/sdcard/qiqi/ck.zip", res.body.bytes());
            
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
            Bmob.prototype.findObject = function (className, item, zhi) {
                return this.makeRequest('GET', '/classes/' + className + '?where={"' + item + '":"' + zhi + '"}').body.json();
            }
            return Bmob;
        })();