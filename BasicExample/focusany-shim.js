"use strict";
/// <reference path="focusany.d.ts" />
const FocusAnyShim = {
    init() {
        if (window["focusany"]) {
            return;
        }
        let hooks = {
            onLog: (label, data) => {
                console.log(`FocusAny Log: ${label}`, data || "");
            }
        };
        const focusanySupport = {
            onLog(callback) {
                hooks.onLog = callback;
            },
            onPluginReady(callback) {
                const callbackWrapper = () => {
                    callback({
                        actionName: "",
                        actionMatch: null,
                        actionMatchFiles: [],
                        requestId: "",
                        reenter: false,
                        isView: false,
                    });
                };
                if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", callbackWrapper);
                }
                else {
                    callbackWrapper();
                }
            },
            copyText(text) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text);
                    return true;
                }
                else {
                    console.error("FocusAny Shim: copyText() requires clipboard permission in web environment");
                    return false;
                }
            },
            isMacOs() {
                return navigator.platform.toLowerCase().includes("mac");
            },
            isWindows() {
                return navigator.platform.toLowerCase().includes("win");
            },
            isLinux() {
                return navigator.platform.toLowerCase().includes("linux");
            },
            showNotification(body, clickActionName) {
                focusanySupport.showToast(body, {
                    duration: 5000,
                    status: "info",
                });
            },
            showToast(body, options) {
                options = options || {};
                const duration = typeof options.duration === "number" && options.duration >= 0 ? options.duration : 3000;
                const status = ["info", "success", "error"].includes(options.status) ? options.status : "info";
                // 创建SVG图标函数
                const createSvgIcon = (type) => {
                    const svgBase = 'xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"';
                    switch (type) {
                        case "info":
                            return `<svg ${svgBase}><circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.15)" stroke="currentColor" stroke-width="1"/><path d="M8 4a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 4zM8 11a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/></svg>`;
                        case "success":
                            return `<svg ${svgBase}><circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.15)" stroke="currentColor" stroke-width="1"/><path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/></svg>`;
                        case "error":
                            return `<svg ${svgBase}><circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.15)" stroke="currentColor" stroke-width="1"/><path d="M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
                        default:
                            return `<svg ${svgBase}><circle cx="8" cy="8" r="6" fill="rgba(255,255,255,0.15)"/></svg>`;
                    }
                };
                const statusStyles = {
                    info: { background: "#1890ff", color: "#ffffff", icon: createSvgIcon("info") },
                    success: { background: "#52c41a", color: "#ffffff", icon: createSvgIcon("success") },
                    error: { background: "#ff4d4f", color: "#ffffff", icon: createSvgIcon("error") },
                };
                const currentStyle = statusStyles[status];
                let container = document.getElementById("focusany-shim-toast-container");
                if (!container) {
                    container = document.createElement("div");
                    container.id = "focusany-shim-toast-container";
                    container.style.cssText = `
                        position: fixed !important;
                        top: 20px !important;
                        right: 20px !important;
                        z-index: 999999 !important;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                        pointer-events: none !important;
                        max-width: 350px !important;
                        width: auto !important;
                    `;
                    document.body.appendChild(container);
                }
                // 创建通知元素
                const notification = document.createElement("div");
                notification.style.cssText = `
                    background: ${currentStyle.background} !important;
                    color: ${currentStyle.color} !important;
                    padding: 12px 30px 12px 16px !important;
                    margin-bottom: 10px !important;
                    border-radius: 6px !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                    font-size: 14px !important;
                    line-height: 1.4 !important;
                    width: 100% !important;
                    max-width: 320px !important;
                    word-wrap: break-word !important;
                    opacity: 0 !important;
                    transform: translateX(350px) !important;
                    transition: all 0.3s ease !important;
                    pointer-events: auto !important;
                    cursor:default !important;
                    border: none !important;
                    outline: none !important;
                    text-decoration: none !important;
                    box-sizing: border-box !important;
                    display: block !important;
                    position: relative !important;
                    min-height: 20px !important;
                `;
                // 创建内容容器
                const content = document.createElement("div");
                content.style.cssText = `
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                `;
                // 添加状态图标
                const iconSpan = document.createElement("span");
                iconSpan.innerHTML = currentStyle.icon;
                iconSpan.style.cssText = `
                    font-size: 16px !important;
                    line-height: 1 !important;
                    flex-shrink: 0 !important;
                    padding: 4px 6px !important;
                    border-radius: 4px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                `;
                // 添加文本内容
                const textSpan = document.createElement("span");
                textSpan.textContent = body;
                textSpan.style.cssText = `
                    flex: 1 !important;
                `;
                content.appendChild(iconSpan);
                content.appendChild(textSpan);
                notification.appendChild(content);
                const closeButton = document.createElement("span");
                closeButton.textContent = "×";
                closeButton.style.cssText = `
                    position: absolute !important;
                    top: 50% !important;
                    right: 8px !important;
                    transform: translateY(-50%) !important;
                    font-size: 16px !important;
                    font-weight: bold !important;
                    cursor: pointer !important;
                    color: rgba(255, 255, 255, 0.8) !important;
                    line-height: 1 !important;
                    width: 20px !important;
                    height: 20px !important;
                    text-align: center !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    border-radius: 50% !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    transition: all 0.2s ease !important;
                    backdrop-filter: blur(4px) !important;
                `;
                closeButton.addEventListener("mouseenter", () => {
                    closeButton.style.color = "#ffffff !important";
                    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.2) !important";
                    closeButton.style.transform = "translateY(-50%) scale(1.1) !important";
                });
                closeButton.addEventListener("mouseleave", () => {
                    closeButton.style.color = "rgba(255, 255, 255, 0.8) !important";
                    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.1) !important";
                    closeButton.style.transform = "translateY(-50%) scale(1) !important";
                });
                closeButton.addEventListener("click", e => {
                    e.stopPropagation();
                    removeNotification();
                });
                notification.appendChild(closeButton);
                container.appendChild(notification);
                setTimeout(() => {
                    notification.style.setProperty("opacity", "1", "important");
                    notification.style.setProperty("transform", "translateX(0)", "important");
                }, 10);
                const removeNotification = () => {
                    notification.style.setProperty("opacity", "0", "important");
                    notification.style.setProperty("transform", "translateX(350px)", "important");
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                        // 如果容器为空，移除容器
                        if (container && container.children.length === 0) {
                            if (container.parentNode) {
                                container.parentNode.removeChild(container);
                            }
                        }
                    }, 300);
                };
                // 使用配置的 duration 时间自动移除
                if (duration > 0) {
                    setTimeout(removeNotification, duration);
                }
            },
            // use localStorage with prefix db:xxx to store data
            db: {
                put(doc) {
                    const key = `db:${doc._id}`;
                    try {
                        localStorage.setItem(key, JSON.stringify(doc));
                        return {
                            ok: true,
                            id: doc._id,
                            rev: doc._rev || focusanySupport.util.randomString(16),
                        };
                    }
                    catch (e) {
                        console.error("FocusAny Shim: db.put() failed:", e);
                        return { ok: false, id: doc._id, rev: "" };
                    }
                },
                get(id) {
                    const key = `db:${id}`;
                    const value = localStorage.getItem(key);
                    if (value) {
                        try {
                            return JSON.parse(value);
                        }
                        catch (e) {
                            console.error("FocusAny Shim: db.get() failed:", e);
                            return null;
                        }
                    }
                    return null;
                },
                remove(doc) {
                    const id = typeof doc === "string" ? doc : doc._id;
                    const key = `db:${id}`;
                    try {
                        localStorage.removeItem(key);
                        return { ok: true, id, rev: "" };
                    }
                    catch (e) {
                        console.error("FocusAny Shim: db.remove() failed:", e);
                        return { ok: false, id, rev: "" };
                    }
                },
                bulkDocs(docs) {
                    const results = [];
                    for (const doc of docs) {
                        const result = this.put(doc);
                        results.push(result);
                    }
                    return results;
                },
                allDocs(key) {
                    const results = [];
                    const prefix = key ? `db:${key}` : "db:";
                    for (const item of Object.keys(localStorage)) {
                        if (item.startsWith(prefix)) {
                            const value = localStorage.getItem(item);
                            if (value) {
                                try {
                                    results.push(JSON.parse(value));
                                }
                                catch (e) {
                                    console.error("FocusAny Shim: db.allDocs() failed:", e);
                                }
                            }
                        }
                    }
                    return results;
                },
                postAttachment(docId, attachment, type) {
                    const key = `dbAttachment:${docId}`;
                    try {
                        const existing = localStorage.getItem(key);
                        const attachments = existing ? JSON.parse(existing) : {};
                        attachments[type] = focusanySupport.util.bufferToBase64(attachment);
                        localStorage.setItem(key, JSON.stringify(attachments));
                        return { ok: true, id: docId, rev: "" };
                    }
                    catch (e) {
                        console.error("FocusAny Shim: db.postAttachment() failed:", e);
                        return { ok: false, id: docId, rev: "" };
                    }
                },
                getAttachment(docId) {
                    const key = `dbAttachment:${docId}`;
                    const value = localStorage.getItem(key);
                    if (value) {
                        try {
                            const attachments = JSON.parse(value);
                            const firstKey = Object.keys(attachments)[0];
                            if (firstKey) {
                                return focusanySupport.util.base64ToBuffer(attachments[firstKey]);
                            }
                        }
                        catch (e) {
                            console.error("FocusAny Shim: db.getAttachment() failed:", e);
                        }
                    }
                    return null;
                },
                getAttachmentType(docId) {
                    const key = `dbAttachment:${docId}`;
                    const value = localStorage.getItem(key);
                    if (value) {
                        try {
                            const attachments = JSON.parse(value);
                            const firstKey = Object.keys(attachments)[0];
                            return firstKey || null;
                        }
                        catch (e) {
                            console.error("FocusAny Shim: db.getAttachmentType() failed:", e);
                        }
                    }
                    return null;
                },
            },
            dbStorage: {
                setItem(key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                },
                getItem(key) {
                    const value = localStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                removeItem(key) {
                    localStorage.removeItem(key);
                },
            },
            util: {
                randomString(length) {
                    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    let result = "";
                    for (let i = 0; i < length; i++) {
                        result += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return result;
                },
                bufferToBase64(buffer) {
                    return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
                },
                base64ToBuffer(base64) {
                    const binary = atob(base64);
                    const bytes = new Uint8Array(binary.length);
                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }
                    return bytes;
                },
                datetimeString() {
                    return new Date().toISOString();
                },
                base64Encode(data) {
                    return btoa(JSON.stringify(data));
                },
                base64Decode(data) {
                    return JSON.parse(atob(data));
                },
                md5(data) {
                    console.error("FocusAny Shim: util.md5() is not supported in web environment, use crypto.subtle instead");
                    return "";
                },
                save(filename, data, option) {
                    // 使用浏览器下载功能
                    try {
                        const blob = new Blob([data], { type: "application/octet-stream" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        return true;
                    }
                    catch (e) {
                        console.error("FocusAny Shim: util.save() failed:", e);
                        return false;
                    }
                },
            },
            // Additional unimplemented methods with mock data
            onPluginExit(callback) {
                // Mock: do nothing
            },
            onPluginEvent(event, callback) {
                // Mock: do nothing
            },
            offPluginEvent(event, callback) {
                // Mock: do nothing
            },
            offPluginEventAll(event) {
                // Mock: do nothing
            },
            onMoreMenuClick(callback) {
                // Mock: do nothing
            },
            registerHotkey(key, callback) {
                // Mock: do nothing
            },
            unregisterHotkeyAll() {
                // Mock: do nothing
            },
            isMainWindowShown() {
                return true; // Mock: always shown
            },
            hideMainWindow() {
                // Mock: do nothing
            },
            showMainWindow() {
                // Mock: do nothing
            },
            isFastPanelWindowShown() {
                return false; // Mock: not shown
            },
            showFastPanelWindow() {
                // Mock: do nothing
            },
            hideFastPanelWindow() {
                // Mock: do nothing
            },
            setExpendHeight(height) {
                // Mock: do nothing
            },
            setSubInput(onChange, placeholder, isFocus, isVisible) {
                // Mock: do nothing
            },
            removeSubInput() {
                // Mock: do nothing
            },
            setSubInputValue(value) {
                // Mock: do nothing
            },
            subInputBlur() {
                // Mock: do nothing
            },
            getPluginRoot() {
                return "/mock/plugin/root"; // Mock path
            },
            getPluginConfig() {
                return {
                    name: "mock-plugin",
                    title: "Mock Plugin",
                    version: "1.0.0",
                    logo: ""
                };
            },
            getPluginInfo() {
                return {
                    nodeIntegration: false,
                    preloadBase: "",
                    preload: "",
                    main: "",
                    mainView: "",
                    width: 800,
                    height: 600,
                    autoDetach: false,
                    singleton: false,
                    zoom: 1
                };
            },
            getPluginEnv() {
                return "dev";
            },
            getQuery(requestId) {
                return {
                    keywords: "",
                    currentFiles: [],
                    currentImage: "",
                    currentText: ""
                };
            },
            createBrowserWindow(url, options, callback) {
                // Mock: open in new tab
                window.open(url, "_blank");
                if (callback)
                    callback();
                return {
                    close: () => {
                    }
                };
            },
            outPlugin() {
                // Mock: do nothing
            },
            isDarkColors() {
                return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            },
            showUserLogin() {
                // Mock: do nothing
            },
            getUser() {
                return {
                    isLogin: false,
                    avatar: "",
                    nickname: "Mock User",
                    vipFlag: "",
                    deviceCode: "mock-device",
                    openId: ""
                };
            },
            getUserAccessToken() {
                return Promise.resolve({
                    token: "mock-token",
                    expireAt: Date.now() + 3600000
                });
            },
            listGoods(query) {
                return Promise.resolve([]);
            },
            openGoodsPayment(options) {
                return Promise.resolve({ paySuccess: false });
            },
            queryGoodsOrders(options) {
                return Promise.resolve({
                    page: 1,
                    total: 0,
                    records: []
                });
            },
            apiPost(url, body, option) {
                return Promise.resolve({
                    code: 200,
                    msg: "Mock response",
                    data: null
                });
            },
            setAction(action) {
                // Mock: do nothing
            },
            removeAction(name) {
                // Mock: do nothing
            },
            getActions(names) {
                return [];
            },
            redirect(keywordsOrAction, query) {
                // Mock: do nothing
            },
            showMessageBox(message, options) {
                return confirm(message); // Mock: use browser confirm
            },
            showOpenDialog(options) {
                // Mock: return empty array
                return [];
            },
            showSaveDialog(options) {
                // Mock: return null
                return undefined;
            },
            screenCapture(callback) {
                // Mock: do nothing
            },
            getNativeId() {
                return "mock-native-id";
            },
            getAppVersion() {
                return "1.0.0";
            },
            getPath(name) {
                return `/mock/${name}`;
            },
            getFileIcon(path) {
                return ""; // Mock: empty icon
            },
            copyFile(file) {
                return false; // Mock: not supported
            },
            copyImage(image) {
                return false; // Mock: not supported
            },
            getClipboardText() {
                return ""; // Mock: empty
            },
            getClipboardImage() {
                return ""; // Mock: empty
            },
            getClipboardFiles() {
                return [];
            },
            listClipboardItems(option) {
                return Promise.resolve([]);
            },
            deleteClipboardItem(timestamp) {
                return Promise.resolve();
            },
            clearClipboardItems() {
                return Promise.resolve();
            },
            shellOpenPath(fullPath) {
                // Mock: do nothing
            },
            shellShowItemInFolder(fullPath) {
                // Mock: do nothing
            },
            shellOpenExternal(url) {
                window.open(url, "_blank");
            },
            shellBeep() {
                // Mock: do nothing
            },
            simulate: {
                keyboardTap(key, modifiers) {
                    return Promise.resolve();
                },
                typeString(text) {
                    return Promise.resolve();
                },
                mouseToggle(type, button) {
                    return Promise.resolve();
                },
                mouseMove(x, y) {
                    return Promise.resolve();
                },
                mouseClick(button, double) {
                    return Promise.resolve();
                },
            },
            getCursorScreenPoint() {
                return { x: 0, y: 0 }; // Mock: center
            },
            getDisplayNearestPoint(point) {
                return {
                    id: 1,
                    bounds: { x: 0, y: 0, width: 1920, height: 1080 },
                    workArea: { x: 0, y: 0, width: 1920, height: 1040 },
                    scaleFactor: 1
                };
            },
            getPlatformArch() {
                return "x86"; // Mock
            },
            sendBackendEvent(event, data, option) {
                return Promise.resolve(null);
            },
            registerCallPage(type, callback, option) {
                // Mock: do nothing
            },
            callPage(type, data, option) {
                return Promise.resolve(null);
            },
            setRemoteWebRuntime(info) {
                return Promise.resolve(undefined);
            },
            llmListModels() {
                return Promise.resolve([
                    {
                        providerId: "openai",
                        providerLogo: "https://cdn.openai.com/chatgpt/images/chatgpt-logo.png",
                        providerTitle: "OpenAI",
                        modelId: "gpt-4",
                        modelName: "GPT-4"
                    },
                    {
                        providerId: "anthropic",
                        providerLogo: "https://www.anthropic.com/images/anthropic-logo.png",
                        providerTitle: "Anthropic",
                        modelId: "claude-3-opus",
                        modelName: "Claude 3 Opus"
                    },
                ]);
            },
            llmChat(callInfo) {
                return Promise.resolve({
                    code: 200,
                    msg: "Mock response",
                    data: { message: "Mock LLM response" }
                });
            },
            logInfo(label, data) {
                console.log(`FocusAny Log Info: ${label}`, data || "");
            },
            logError(label, data) {
                console.error(`FocusAny Log Error: ${label}`, data || "");
            },
            logPath() {
                return Promise.resolve("/mock/log/path");
            },
            logShow() {
                // Mock: do nothing
            },
            addLaunch(keyword, name, hotkey) {
                return Promise.resolve();
            },
            removeLaunch(keyword) {
                // Mock: do nothing
            },
            activateLatestWindow() {
                return Promise.resolve();
            },
            file: {
                exists(path) {
                    return Promise.resolve(false);
                },
                read(path) {
                    return Promise.resolve("");
                },
                write(path, data) {
                    return Promise.resolve();
                },
                remove(path) {
                    return Promise.resolve();
                },
                ext(path) {
                    return Promise.resolve("");
                },
                writeTemp(ext, data, option) {
                    return Promise.resolve(`/mock/temp/file.${ext}`);
                },
            },
            fad: {
                read(type, path) {
                    return Promise.resolve(null);
                },
                write(type, path, data) {
                    return Promise.resolve();
                },
            },
            view: {
                setHeight(height) {
                    // Mock: do nothing
                },
                getHeight() {
                    return Promise.resolve(400);
                },
            },
            detach: {
                setTitle(title) {
                    // Mock: do nothing
                },
                setOperates(operates) {
                    // Mock: do nothing
                },
                setPosition(position) {
                    // Mock: do nothing
                },
                setAlwaysOnTop(alwaysOnTop) {
                    // Mock: do nothing
                },
                setSize(width, height) {
                    // Mock: do nothing
                },
            },
        };
        // 创建一个递归的 Proxy 来处理任意深度的属性访问
        function createErrorProxy(path = "focusany", supportObj) {
            return new Proxy(() => {
            }, {
                get(target, prop) {
                    const currentPath = `${path}.${String(prop)}`;
                    // 如果是根级别且在支持对象中存在，直接返回
                    if (path === "focusany" && supportObj && prop in supportObj) {
                        const result = supportObj[prop];
                        // console.log('FocusAny Shim: Accessing supported property:', {currentPath, result});
                        return new Proxy(result, {
                            get(t, p) {
                                // console.log('FocusAny Shim: Accessing supported sub-property:', {currentPath: `${currentPath}.${String(p)}`});
                                const value = t[p];
                                if (typeof value === "function") {
                                    return function (...args) {
                                        return value.apply(t, args);
                                    };
                                }
                                return value;
                            },
                            apply(t, thisArg, args) {
                                console.log('FocusAny Shim: Calling supported function:', {
                                    t,
                                    currentPath,
                                    thisArg,
                                    args
                                });
                                const ret = t.apply(thisArg, args);
                                const pcs = currentPath.split(".");
                                const name = pcs[pcs.length - 1];
                                hooks.onLog && hooks.onLog(name, args.map(a => {
                                    if (a instanceof Function)
                                        return 'function(){}';
                                    return a;
                                }));
                                if (ret instanceof Promise) {
                                    return ret.then((data) => {
                                        hooks.onLog && hooks.onLog(`${name}.result`, data);
                                        return data;
                                    });
                                }
                                else {
                                    hooks.onLog && hooks.onLog(`${name}.result`, ret);
                                }
                                return ret;
                            }
                        });
                    }
                    // 对于其他属性，返回一个新的 Proxy（不支持任何属性）
                    return createErrorProxy(currentPath, null);
                },
                apply(target, thisArg, argumentsList) {
                    console.error(`FocusAny Shim: ${path}() is not supported in web environment`);
                },
            });
        }
        // 创建 focusany 对象
        const focusany = createErrorProxy("focusany", focusanySupport);
        // @ts-ignore
        window["focusany"] = focusany;
    },
};
// 自动初始化：在浏览器环境中自动调用 init()
if (typeof window !== "undefined") {
    FocusAnyShim.init();
}
