import { defineUserConfig } from "vuepress"
import type { DefaultThemeOptions } from "vuepress"
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path"
export default defineUserConfig<DefaultThemeOptions>({
    title:"测试",
    description:"测试一下",
    plugins:[
        [
            '@vuepress/plugin-search',
            {
                locales:{
                    '/':{
                        placeholder:'搜索'
                    },
                    '/en/':{
                        placeholder: "Search"
                    }
                }
            }
        ]
    ],
    pagePatterns:['**/*.md','!.vuepress','!**/node_modules','!node_modules'],
    bundlerConfig:{
        viteOptions:{
            plugins:[vueJsx()],
            resolve:{
                alias:{
                    '@/components':resolve(__dirname,'./packages/components')
                }
            }
        }
    }
})
