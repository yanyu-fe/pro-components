import { defineClientAppEnhance } from "@vuepress/client"
import { ProButton,ProWaterMark } from "../components";

export default defineClientAppEnhance(({app}) => {
    app.component('ProButton',ProButton)
    app.component('ProWaterMark',ProWaterMark)
});
