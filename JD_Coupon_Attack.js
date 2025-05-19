// 名称: JD_Coupon_Attack
// 功能: 定时执行抢券请求

const API_URL = "https://api.m.jd.com/client.action";
const COOKIE = "pt_key=xxx; pt_pin=yyy;"; // 必须替换
const COUPON_KEY = "coupon_123456";        // 必须替换
const EID = "eid_xxxxxx";                  // 必须替换
const FP = "fp_xxxxxx";                    // 必须替换

async function attack() {
  try {
    const response = await $httpClient.post({
      url: API_URL,
      headers: {
        "Cookie": COOKIE,
        "User-Agent": "JD4iPhone/14.4.1 (iPhone; iOS 16.6; Scale/3.00)",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: {
        functionId: "miaosha_apply",
        body: JSON.stringify({
          couponKey: COUPON_KEY,
          eid: EID,
          fp: FP,
          t: Date.now()
        })
      }
    });

    parseResult(response.data);
  } catch (e) {
    $notification.post("请求失败", e.message, "");
  }
}

function parseResult(data) {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return $notification.post("响应解析错误", data, "");
    }
  }

  if (data.code === 0) {
    $notification.post("🎉 抢券成功", `券ID: ${COUPON_KEY}`, "");
  } else {
    $notification.post("❌ 失败", data.message || "未知错误", "");
  }
}

// 设置抢券时间（示例：10:00:00准时触发）
const targetTime = new Date("2024-03-20T10:00:00+08:00");
$timer.schedule(targetTime, attack);

// 失败重试（间隔300ms，最多3次）
let retryCount = 0;
function retry() {
  if (retryCount < 3) {
    retryCount++;
    $timer.schedule(Date.now() + 300, attack);
  }
}