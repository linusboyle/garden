import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
        provider: 'giscus',
        options: {
        // from data-repo
        repo: 'linusboyle/garden',
        // from data-repo-id
        repoId: 'R_kgDONrreng',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDONrrens4CvDhR',
        // from data-lang
        lang: 'zh-CN',
        inputPosition: 'top',
        }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/linusboyle",
      RSS: "/index.xml"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
        components: [
            {
                Component: Component.Search(),
                grow: true,
            },
            { Component: Component.Darkmode() },
            { Component: Component.ReaderMode() },
        ],
    }),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "文章",
        limit: 7,
        showTags: false,
        filter: (f) =>
          f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
        linkToMore: "tags/post" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph({
        localGraph : {showTags: false},
        globalGraph : {showTags: false},
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
      Component.Breadcrumbs(),
      Component.ArticleTitle(),
      Component.ContentMeta({ showReadingTime : false }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [],
}
