import { defineClientAppEnhance } from "@vuepress/client"
import {ProWave,ProButton} from "../components";

export default defineClientAppEnhance(({app}) => {
    app.component('ProWave',ProWave);
    app.component('ProButton',ProButton)
});
