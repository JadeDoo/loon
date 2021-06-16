/*
 * @Author: JadeDoo 
 * @Date: 2021-06-15 21:16:15 
 * @Last Modified by: JadeDoo
 * @Last Modified time: 2021-06-16 20:35:33
 */


/**
 * 封装QuantumultX、Surge、Request中的方法
 *
 *
 */
function iosrule() {
    // 判断是否为圈X、surge、request
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuantumultX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuantumultX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuantumultX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuantumultX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuantumultX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuantumultX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuantumultX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuantumultX, isSurge, notify, write, read, get, post, end }
};

const $iosrule = iosrule();
console.log($iosrule);