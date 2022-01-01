import { defineClientAppEnhance } from "@vuepress/client"
import { ProButton } from "../components";

export default defineClientAppEnhance(({app}) => {
    app.component('ProButton',ProButton)
});
