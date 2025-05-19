// 名称: JD_Coupon_Sniffer
// 功能: 自动捕获京东领券接口

const TARGET_HOSTS = ["m.jd.com", "api.m.jd.com"];
const KEYWORDS = ["miaosha", "coupon", "seckill"];

$httpClient.post = $httpClient.get = async (request) => {
  const url = request.url;
  if (!TARGET_HOSTS.some(host => url.includes(host))) return;

  const isTarget = KEYWORDS.some(keyword => 
    url.toLowerCase().includes(keyword) || 
    (request.body && request.body.toLowerCase().includes(keyword))
  );

  if (isTarget) {
    const logData = `
    [接口地址] ${url}
    [请求方法] ${request.method}
    [请求头] ${JSON.stringify(request.headers)}
    [请求体] ${request.body || "空"}
    `;
    
    $persistentStore.write(logData, "jd_coupon_request");
    $notification.post("接口捕获成功", url.split("?")[0], "");
  }
  return $done({});
};