// 京东抢券接口记录脚本
// 用于抓取点击“抢券”按钮时的 URL、Headers、Body

if ($request) {
  const log = {
    url: $request.url,
    method: $request.method,
    headers: $request.headers,
    body: $request.body
  };
  console.log("===== 京东抢券请求信息开始 =====");
  console.log(JSON.stringify(log, null, 2));
  console.log("===== 京东抢券请求信息结束 =====");
}
$done({});
