import { defineClientAppEnhance } from "@vuepress/client"
import {ProWave} from "../components";

export default defineClientAppEnhance(({app}) => {
    app.component('ProWave',ProWave);
});
