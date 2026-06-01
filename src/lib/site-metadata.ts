import type { Metadata } from "next";

export const SITE_TITLE =
  "Clavis — дизайн интерьера в Москве | квартиры, офисы, коммерция";

export const SITE_DESCRIPTION =
  "Студия дизайна интерьера Clavis в Москве: проектирование и реализация квартир, апартаментов, офисов и коммерческих пространств — от брифа и концепции до авторского надзора.";

export const siteMetadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Clavis",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ru_RU",
    type: "website",
  },
};
