const path = require('path')
module.exports = {
    base:'/',
    title: 'ty-el-ui',
    description: 'Just playing around',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Github', link: 'https://github.com/Firenzia/sakura-ui/' },
      ],
      sidebar: [
          {
              title: '开发指南',
              collapsable: false,
              children: [
                // 'guide/install.md',
                // 'guide/get-started.md'
              ]
            },
            {
              title: '组件',
              collapsable: false,
              children: [
                'components/RenderTableList.md',
                // 'components/form/',
                // 'components/navigation/',
                // 'components/notice/',
                // 'components/other/'
              ]
            },
        ]
      },
    scss:{ //配置 scss 根目录
      // includePaths: [path.join(__dirname, '../../style')]
    }
  }