import {ref} from "vue";


export const useFrame = (data: {}) => {
    const iframe = ref<HTMLIFrameElement | null>(null);
    const iframeReady = ref(false)

    const onIframeLoad = () => {
        iframeReady.value = true
    }

    const callIframe = (method: string, ...args: any[]) => {
        return new Promise((resolve, reject) => {
            const callIt = () => {
                if (!iframeReady.value) {
                    setTimeout(callIt, 100)
                    return
                }
                // @ts-ignore
                iframe.value?.contentWindow[method](resolve, reject, ...args)
            }
            callIt()
        })
    }

    return {
        iframe,
        onIframeLoad,
        callIframe,
    }
}
