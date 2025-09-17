<script setup lang="ts">
import {onMounted, ref} from 'vue';

const web = ref<any>(null);
const webUrl = ref<string>('')
const webScript = ref<string>('');
const webCss = ref<string>('');
onMounted(() => {
    web.value.addEventListener('dom-ready', () => {
        console.log('DomReady', {url: webUrl.value, script: webScript.value});
        if (webUrl.value) {
            web.value.loadURL(webUrl.value)
            webUrl.value = ''
        } else if (webScript.value || webCss.value) {
            if (webCss.value) {
                fetch(webCss.value).then(response => response.text()).then(css => {
                    console.log('Injecting CSS', css);
                    web.value.insertCSS(css);
                });
                webCss.value = '';
            }
            if (webScript.value) {
                fetch(webScript.value).then(response => response.text()).then(script => {
                    console.log('Injecting JS', script);
                    web.value.executeJavaScript(script);
                });
                webScript.value = ''
            }
        }
    });
    webUrl.value = 'https://example.com/';
    webScript.value = 'inject.js';
    webCss.value = 'inject.css';
});
if (window.focusany) {
    focusany.onMoreMenuClick(data => {
        switch (data.name) {
            case 'debug':
                web.value.openDevTools({
                    mode: 'detach',
                    activate: true,
                    title: 'Debug Web Offline Example',
                });
                break
        }
    })
    focusany.setRemoteWebRuntime({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        urlMap: {
            'https://example.com/': 'page.html',
        },
        types: [
            'js',
            'css',
            'png',
            'webp',
            'zip',
            'woff2',
        ],
        domains: [
            'example.com',
        ],
        blocks: [
            '/.*/'
        ]
    })
}
</script>

<template>
    <div style="height:100vh;width:100vw;overflow:hidden;">
        <webview ref="web"
                 src="about:blank"
                 allowpopups
                 disablewebsecurity
                 partition="<WebRemoteExample:RemoteWeb>"
                 useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
                 webpreferences="nodeIntegration=no,contextIsolation=no,sandbox=no,webSecurity=no,allowRunningInsecureContent=yes,allowDisplayingInsecureContent=yes"
                 class="webview"></webview>
    </div>
</template>


<style>
.webview {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
