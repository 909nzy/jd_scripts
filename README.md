# jd_scripts
#!name=京东抢券全家桶
#!desc=自动配置 MitM + 脚本 + 定时任务

[MITM]
hostname = m.jd.com, api.m.jd.com

[Script]
http-response ^https?://(m\.jd\.com|api\.m\.jd\.com) requires-body=1,script-path=https://your-domain.com/JD_Coupon_Sniffer.js
cron "0 59 9 * * *" script-path=https://your-domain.com/JD_Coupon_Attack.js
